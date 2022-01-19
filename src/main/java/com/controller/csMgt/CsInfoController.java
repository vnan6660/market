package com.controller.csMgt;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.support.RequestContextUtils;

import com.service.csMgt.CsInfoService;
import com.vo.common.SearchVO;
import com.vo.csMgt.CsInfoVO;
import com.vo.orderInfo.OrderInfoVO;

/**
 * 고객정보 Controller
 * 생성자 : 김소연
 * 생성일 : 2021.12.22
 */
@Controller
public class CsInfoController {

	@Autowired
	private CsInfoService csInfoService;

	//고객정보페이지 가기 
	@RequestMapping("/csInfo/csInfoPage")
	public String csInfoPage(Model model) {
		//현재년도 첫번째 일자
		String startDt = LocalDate.now().with(TemporalAdjusters.firstDayOfYear()).format(DateTimeFormatter.ISO_DATE);
		 //현재 일자
		 String endDt = LocalDate.now().format(DateTimeFormatter.ISO_DATE);
		 
		 SearchVO vo = SearchVO.builder().startDt(startDt).endDt(endDt).build();
		
		//고객정보 검색글카운트
		int listCount = csInfoService.getcsInfoCount(vo);
		SearchVO searchVO = SearchVO.builder().startDt(startDt).endDt(endDt).page(1).listcount(listCount).build();
		
		//고객정보 가져오기
		List<CsInfoVO> csInfoList = csInfoService.getCsInfo(searchVO);
		model.addAttribute("csInfoList", csInfoList);
		model.addAttribute("maxPage", searchVO.getMaxpage());
		model.addAttribute("page", searchVO.getPage());
		model.addAttribute("startpage", searchVO.getStartpage());
		model.addAttribute("endpage", searchVO.getEndpage());

		return "/csMgt/csInfo";
	}
	
	//목록페이지 가기
	@PostMapping(value = "/csInfo/goCsInfoPage")
	public String goCsInfoPage(SearchVO searchVO,Model model){
		model.addAttribute("searchVO", searchVO);
		model.addAttribute("goList", "t");
		return "/csMgt/csInfo";
		
	}

	//고객디테일페이지 가기
	@GetMapping("/csInfo/detailCsInfo/{csNo}")
	public String detailCsInfo(@PathVariable String csNo, Model model, HttpServletRequest request) {
		//csNo에 맞는 고객정보 가져오기
		CsInfoVO csOne = csInfoService.getDetailCsInfo(csNo);
		
		SearchVO svo = new SearchVO();
		svo.setSelectOptValOne(csNo);
		
		//고객 구매이력 카운트
		int listCount = csInfoService.getOdHistoryCount(svo);
		SearchVO vo = SearchVO.builder().selectOptValOne(csNo).page(1).listcount(listCount).build();
		//구매이력가져오기
		List <OrderInfoVO> odInfoList = csInfoService.getOrderHistory(vo); 
		
		
		Map<String, ?> flashMap = RequestContextUtils.getInputFlashMap(request);
		SearchVO searchVO = new SearchVO();
		if (flashMap != null) {
			searchVO = (SearchVO) flashMap.get("searchVO");
		}
		
		model.addAttribute("searchVO", searchVO);
		
		model.addAttribute("csOne", csOne);
		model.addAttribute("csNo", vo.getSelectOptValOne());
		model.addAttribute("odInfoList", odInfoList);
		model.addAttribute("maxPage", vo.getMaxpage());
		model.addAttribute("page", vo.getPage());
		model.addAttribute("startpage", vo.getStartpage());
		model.addAttribute("endpage", vo.getEndpage());
		return "/csMgt/csDetail";
	}
	
	//고객디테일페이지 가기(목록페이지의 검색값전달)
	@PostMapping("/csInfo/detailCsInfoSearch")
	public String detailCsInfoSearch(String csNo,SearchVO searchVO,RedirectAttributes redirectAttributes){
	  
		redirectAttributes.addFlashAttribute("searchVO", searchVO);
	  
	 	return "redirect:/csInfo/detailCsInfo/"+csNo;
	}
	
	//고객 구매이력 가져오기(페이지)
	@GetMapping("/csInfo/searchOdHistoryList")
	@ResponseBody
	public Map<String, Object> searchOdHistoryList(SearchVO vo) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();

		//고객 구매이력 카운트
		int listCount = csInfoService.getOdHistoryCount(vo);
		SearchVO searchVO = SearchVO.builder().selectOptValOne(vo.getSelectOptValOne()).page(vo.getPage()).listcount(listCount).build();
		
		//구매이력가져오기
		List <OrderInfoVO> odInfoList = csInfoService.getOrderHistory(searchVO); 

		resultMap.put("odInfoList", odInfoList);
		resultMap.put("maxPage", searchVO.getMaxpage());
		resultMap.put("page", searchVO.getPage());
		resultMap.put("startpage", searchVO.getStartpage());
		resultMap.put("endpage", searchVO.getEndpage());

		return resultMap;
	}
	
	//고객 목록 검색
	@GetMapping("/csInfo/searchCsInfoList")
	@ResponseBody
	public Map<String, Object> searchCsInfoList(SearchVO vo) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();

		int listcount = csInfoService.getcsInfoCount(vo);

		SearchVO searchVO = SearchVO.builder().startDt(vo.getStartDt()).endDt(vo.getEndDt()).selectOptValOne(vo.getSelectOptValOne()).selectOptValTwo(vo.getSelectOptValTwo()).searchVal(vo.getSearchVal()).page(vo.getPage()).listcount(listcount).build();

		List<CsInfoVO> csInfoList = csInfoService.getCsInfo(searchVO);

		resultMap.put("csInfoList", csInfoList);
		resultMap.put("maxPage", searchVO.getMaxpage());
		resultMap.put("page", searchVO.getPage());
		resultMap.put("startpage", searchVO.getStartpage());
		resultMap.put("endpage", searchVO.getEndpage());

		return resultMap;
	}
	
}
