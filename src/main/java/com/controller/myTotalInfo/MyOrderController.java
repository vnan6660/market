package com.controller.myTotalInfo;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.myTotalInfo.MyOrderService;
import com.vo.common.SearchVO;
import com.vo.orderInfo.OrderInfoVO;

/**
 * 주문정보 Controller 
 * 생성자 : 김소연	 
 * 생성일 : 2022.01.13
 */
@Controller
public class MyOrderController {
	
	@Autowired
	private MyOrderService myOrderService;
	
	@Autowired
	private HttpServletRequest request;
	
	//주문정보 페이지 가기
	@GetMapping("/myOrder/myOrderPage")
	public String myOrderPage(Model model) {
		HttpSession session = request.getSession(true);
		String userNo = (String) session.getAttribute("userNo");	
		//현재년도 첫번째 일자
		String startDt = LocalDate.now().with(TemporalAdjusters.firstDayOfYear()).format(DateTimeFormatter.ISO_DATE);
		 
		//현재 일자
		String endDt = LocalDate.now().format(DateTimeFormatter.ISO_DATE);
		
		SearchVO svo = SearchVO.builder().startDt(startDt).endDt(endDt).selectOptValThree(userNo).build();
		 
		//검색글 카운트
		int listcount = myOrderService.getMyOrderListCount(svo);
		SearchVO searchVO = SearchVO.builder().startDt(startDt).endDt(endDt).selectOptValThree(userNo).page(1).listcount(listcount).build();
		//주문정보가져오기
		List<OrderInfoVO> list = myOrderService.getMyOrderInfo(searchVO);
		
		model.addAttribute("list", list);
		model.addAttribute("maxPage", searchVO.getMaxpage());
		model.addAttribute("page", searchVO.getPage());
		model.addAttribute("startpage", searchVO.getStartpage());
		model.addAttribute("endpage", searchVO.getEndpage());

		return "/myTotalInfo/myOrder";
	}
	
		//주문 검색 리스트 가져와서 주문정보 페이지 가기
		@GetMapping("/myOrder/searchMyOrderList")
		@ResponseBody
		public HashMap<String, Object> searchMyOrderList(SearchVO vo) {
			HashMap<String, Object> resultMap = new HashMap<String, Object>();
			
			HttpSession session = request.getSession(true);
			String userNo = (String) session.getAttribute("userNo");
			vo.setSelectOptValThree(userNo);
			//검색글 카운트
			int listcount = myOrderService.getMyOrderListCount(vo);
			SearchVO searchVO = SearchVO.builder().startDt(vo.getStartDt()).endDt(vo.getEndDt()).selectOptValOne(vo.getSelectOptValOne()).selectOptValTwo(vo.getSelectOptValTwo()).selectOptValThree(userNo).searchVal(vo.getSearchVal()).page(vo.getPage()).listcount(listcount).build();
			 //주문정보가져오기
			List<OrderInfoVO> reList = myOrderService.getMyOrderInfo(searchVO);
			
			resultMap.put("reList", reList);
			resultMap.put("maxPage", searchVO.getMaxpage());
			resultMap.put("page", searchVO.getPage());
			resultMap.put("startpage", searchVO.getStartpage());
			resultMap.put("endpage", searchVO.getEndpage());

			return resultMap;
		}

}
