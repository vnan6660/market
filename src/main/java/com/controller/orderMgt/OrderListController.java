package com.controller.orderMgt;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.support.RequestContextUtils;

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
	
	//목록페이지 가기(목록버튼을 눌렀을때 실행됨)
	@PostMapping(value = "/orderList/goOrderListPage")
	public String goOrderListPage(SearchVO searchVO,String dtType,Model model){
		model.addAttribute("searchVO", searchVO);
		model.addAttribute("dtType", dtType);
		model.addAttribute("goList", "t");
		return "/orderMgt/orderList";
		
	}
	
	//주문목록 검색 리스트 가져와서 주문목록 페이지 가기
	@GetMapping("/orderList/searchOrderList")
	@ResponseBody
	public HashMap<String, Object> searchMyOrderList(SearchVO vo) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		
		SearchVO searchVO;
		//검색글 카운트
		int listcount = orderListService.getOrderListCount(vo);
		
		//noLimit란 변수가 넘어올 때 1인경우에는 전체글 조회
		if(vo.getNoLimit()== 1) {
			searchVO = SearchVO.builder().noLimit(1).startDt(vo.getStartDt()).endDt(vo.getEndDt()).endpage(listcount).selectOptValOne(vo.getSelectOptValOne()).selectOptValTwo(vo.getSelectOptValTwo()).selectOptValThree(vo.getSelectOptValThree()).searchVal(vo.getSearchVal()).page(vo.getPage()).listcount(listcount).build();
		}else {
			searchVO = SearchVO.builder().noLimit(0).startDt(vo.getStartDt()).endDt(vo.getEndDt()).selectOptValOne(vo.getSelectOptValOne()).selectOptValTwo(vo.getSelectOptValTwo()).selectOptValThree(vo.getSelectOptValThree()).searchVal(vo.getSearchVal()).page(vo.getPage()).listcount(listcount).build();
		}
		
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
	
	/* 주문목록상세내역 페이지 가기(주문목록상세내역 불러오기) */
	@GetMapping("/orderList/detailOrder/{odState}/{odNo}")
	public String detailOrder(@PathVariable String odState,@PathVariable String odNo, Model model, HttpServletRequest request) {

		Map<String, ?> flashMap = RequestContextUtils.getInputFlashMap(request);
		Map<String, Object> modelMap = new HashMap<String, Object>();
		if (flashMap != null) {
			String[] strArr = flashMap.get("param").toString().split("[,]");
			for (int i = 0; i < strArr.length; i++) {
				String[] strArrTwo = strArr[i].trim().replaceAll("[{]", "").replaceAll("[}]", "").split("[=]");
				if(strArrTwo.length == 1) {
					modelMap.put(strArrTwo[0], ""); 
				}else {
					modelMap.put(strArrTwo[0], strArrTwo[1].trim()); 
				}
			}
		}
		HttpSession session = request.getSession(true);
		
		if(modelMap.isEmpty()) {
			modelMap.put("odNo",odNo);
			modelMap.put("selectOptValThree",odState);
			modelMap.put("startDt",session.getAttribute("startDt"));
			modelMap.put("endDt",session.getAttribute("endDt"));
			modelMap.put("selectOptValOne",session.getAttribute("selectOptValOne"));
			modelMap.put("selectOptValTwo",session.getAttribute("selectOptValTwo"));
			modelMap.put("dtType",session.getAttribute("dtType"));
			modelMap.put("searchVal",session.getAttribute("searchVal"));
			modelMap.put("page",session.getAttribute("page"));
			
		}
		
	    //주문상세내역가져오기 
	    OrderWrapVO orderOne = orderListService.getOrderDetail(modelMap);
	    model.addAttribute("orderOne",orderOne); 
	    model.addAttribute("searchVO", modelMap);
		 
		return "/orderMgt/orderDetail";
	}
	
	//주문상세내역 페이지 가기(목록페이지의 검색값전달)
	@PostMapping("/orderList/detailOrderSearch") 
	public String detailMyOrderSearch(@RequestParam Map<String, Object> param,RedirectAttributes redirectAttributes,HttpServletRequest request){
	  
		redirectAttributes.addFlashAttribute("param", param);
		
		HttpSession session = request.getSession(true);
		session.setAttribute("startDt",(String) param.get("startDt"));
		session.setAttribute("endDt",(String) param.get("endDt"));
		session.setAttribute("selectOptValOne",(String) param.get("selectOptValOne"));
		session.setAttribute("selectOptValTwo",(String) param.get("selectOptValTwo"));
		session.setAttribute("dtType",(String) param.get("dtType"));
		session.setAttribute("searchVal",(String) param.get("searchVal"));
		session.setAttribute("page",(String) param.get("page"));
		 
		String odNo = (String) param.get("odNo");
		String odState = (String) param.get("selectOptValThree");
		
		return "redirect:/orderList/detailOrder/"+ odState +"/"+odNo; 
	 
	}
}
