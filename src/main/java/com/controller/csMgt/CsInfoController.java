package com.controller.csMgt;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.csMgt.CsInfoService;
import com.vo.common.SearchVO;
import com.vo.csMgt.CsInfoVO;

/**
 * 고객정보 Controller 생성자 : 김소연 생성일 : 2021.12.22
 */
@Controller
public class CsInfoController {

	@Autowired
	private CsInfoService csInfoService;

	/* 고객정보페이지 가기 */
	@RequestMapping("/csInfo/csInfoPage")
	public String csInfoPage(Model model) {

		// 아직 객체만 만들어놓고 js에서 값넘기지 않았음(검색정보X,페이지만)
		SearchVO vo = new SearchVO();
		/* 고객정보 검색글카운트 */
		int listCount = csInfoService.getcsInfoCount(vo);
		SearchVO searchVO = SearchVO.builder().page(1).listcount(listCount).build();
		
		/* 고객정보 가져오기 */
		List<CsInfoVO> csInfoList = csInfoService.getCsInfo(searchVO);
		model.addAttribute("csInfoList", csInfoList);
		model.addAttribute("maxPage", searchVO.getMaxpage());
		model.addAttribute("page", searchVO.getPage());
		model.addAttribute("startpage", searchVO.getStartpage());
		model.addAttribute("endpage", searchVO.getEndpage());

		return "/csMgt/csInfo";
	}

	/* 고객디테일페이지 가기 */
	@GetMapping("/csInfo/detailCsInfo/{csNo}")
	public String detailCsInfo(@PathVariable String csNo, Model model) {
		/* csNo에 맞는 고객정보 가져오기 */
		CsInfoVO csOne = csInfoService.getDetailCsInfo(csNo);

		model.addAttribute("csOne", csOne);
		return "/csMgt/csDetail";
	}
	
	/*고객 목록 검색 */
	@GetMapping("/csInfo/searchCsInfoList")
	@ResponseBody
	public Map<String, Object> searchCsInfoList(SearchVO vo) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();

		int listcount = csInfoService.getcsInfoCount(vo);

		SearchVO searchVO = SearchVO.builder().startDt(vo.getStartDt()).endDt(vo.getEndDt()).selectOptValOne(vo.getSelectOptValOne()).selectOptValTwo(vo.getSelectOptValTwo()).selectOptValThree(vo.getSelectOptValThree()).searchVal(vo.getSearchVal()).page(vo.getPage()).listcount(listcount).build();

		List<CsInfoVO> csInfoList = csInfoService.getCsInfo(searchVO);

		resultMap.put("csInfoList", csInfoList);
		resultMap.put("maxPage", searchVO.getMaxpage());
		resultMap.put("page", searchVO.getPage());
		resultMap.put("startpage", searchVO.getStartpage());
		resultMap.put("endpage", searchVO.getEndpage());

		return resultMap;
	}
}
