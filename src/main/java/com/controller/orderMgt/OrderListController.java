package com.controller.orderMgt;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.orderMgt.OrderListService;
import com.vo.common.SearchVO;
import com.vo.orderMgt.OrderWrapVO;

/**
 * 주문목록 Controller 
 * 생성자 : 김소연	 
 * 생성일 : 2022.01.17
 */
@Controller
public class OrderListController {
	
	@Autowired
	private OrderListService orderListService;
	
	//주문목록페이지 가기
	@GetMapping(value = "/orderList/orderListPage")
	public String orderListPage(Model model){
		
		//현재년도 첫번째 일자
		String startDt = LocalDate.now().with(TemporalAdjusters.firstDayOfYear()).format(DateTimeFormatter.ISO_DATE);
		
		//현재 일자
		String endDt = LocalDate.now().format(DateTimeFormatter.ISO_DATE);
		
		SearchVO svo = SearchVO.builder().startDt(startDt).endDt(endDt).selectOptValThree("odDt").build();
		
		//검색글 카운트
		int listcount = orderListService.getOrderListCount(svo);
		
		SearchVO searchVO = SearchVO.builder().startDt(startDt).endDt(endDt).selectOptValThree("odDt").page(1).listcount(listcount).build();
		
		//주문목록가져오기
		List<OrderWrapVO> list = orderListService.getOrderList(searchVO);
		  
		model.addAttribute("list", list);
		model.addAttribute("listcount", listcount);
		model.addAttribute("maxPage", searchVO.getMaxpage());
		model.addAttribute("page", searchVO.getPage());
		model.addAttribute("startpage", searchVO.getStartpage());
		model.addAttribute("endpage", searchVO.getEndpage());
		
		return "/orderMgt/orderList";
		
	}
	
	//주문목록 검색 리스트 가져와서 주문목록 페이지 가기
	@GetMapping("/orderList/searchOrderList")
	@ResponseBody
	public HashMap<String, Object> searchMyOrderList(SearchVO vo) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		
		//검색글 카운트
		int listcount = orderListService.getOrderListCount(vo);
		SearchVO searchVO = SearchVO.builder().startDt(vo.getStartDt()).endDt(vo.getEndDt()).selectOptValOne(vo.getSelectOptValOne()).selectOptValTwo(vo.getSelectOptValTwo()).selectOptValThree(vo.getSelectOptValThree()).searchVal(vo.getSearchVal()).page(vo.getPage()).listcount(listcount).build();
		 //주문목록 가져오기
		List<OrderWrapVO> reList = orderListService.getOrderList(searchVO);
		
		resultMap.put("reList", reList);
		resultMap.put("reListcount", listcount);
		resultMap.put("maxPage", searchVO.getMaxpage());
		resultMap.put("page", searchVO.getPage());
		resultMap.put("startpage", searchVO.getStartpage());
		resultMap.put("endpage", searchVO.getEndpage());

		return resultMap;
	}
	
	//주문상태 변경하기
	@GetMapping("/orderList/odStateChange")
	@ResponseBody
	public void odStateChange(@RequestParam(value = "checkList[]",required = false) ArrayList<String> checkList,@RequestParam(value = "nowOdState",required = false) String nowOdState) {
		
		Map<String,Object> searchMap = new HashMap<String, Object>();
		searchMap.put("checkList", checkList);
		searchMap.put("nowOdState", nowOdState);
		
		orderListService.updateOdState(searchMap);
	}
}
