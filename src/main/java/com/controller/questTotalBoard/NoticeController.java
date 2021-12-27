package com.controller.questTotalBoard;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.support.RequestContextUtils;

import com.service.questTotalBoard.NoticeService;
import com.vo.common.SearchVO;
import com.vo.questTotalBoard.NoticeVO;

/**
 * 공지사항 Controller 생성자 : 김소연 생성일 : 2021.12.02
 *
 */
@Controller
public class NoticeController {

	@Autowired
	private NoticeService noticeService;

	/* 공지사항 페이지 가기(공지사항목록불러오기) */
	@GetMapping("/notice/noticePage")
	public String noticePage(Model model) {

		SearchVO vo = new SearchVO();
		int listcount = noticeService.getListCount(vo);
		SearchVO searchVO = SearchVO.builder().page(1).listcount(listcount).build();
		//SearchVO searchVO = new SearchVO(vo.getSearchVal(), vo.getSelectOptVal(), 1, listcount);

		List<NoticeVO> noticeList = noticeService.getNoticeList(searchVO);
		model.addAttribute("noticeList", noticeList);
		model.addAttribute("maxPage", searchVO.getMaxpage());
		model.addAttribute("page", searchVO.getPage());
		model.addAttribute("startpage", searchVO.getStartpage());
		model.addAttribute("endpage", searchVO.getEndpage());

		return "/questTotalBoard/notice";
	}
	
	//목록페이지 가기
	@PostMapping(value = "/notice/noticePage")
	public String goNoticeListPage(SearchVO searchVO,Model model){
		model.addAttribute("searchVO", searchVO);
		model.addAttribute("goList", "t");
		return "/questTotalBoard/notice";
		
	}

	/* 공지사항글쓰기 페이지 가기 */
	@GetMapping("/notice/writeNotice")
	public String writeNotice() {
		return "/questTotalBoard/noticeWrite";
	}

	/* 공지사항 글 저장 */
	@PostMapping("/notice/writeNotice")
	@ResponseBody
	public void writeNotice(@RequestBody NoticeVO vo) {
		noticeService.writeNotice(vo);
	}

	/* 공지사항상세 페이지 가기(공시사항디테일불러오기) */
	@GetMapping("/notice/detailNotcie/{ntcNo}")
	public String detailNotcie(@PathVariable int ntcNo,Model model,HttpServletRequest request) {
		noticeService.plusVcnt(ntcNo);
		NoticeVO noticeOne = noticeService.getNotcieDetail(ntcNo);
		 model.addAttribute("noticeOne", noticeOne);
		 
		Map<String, ?> flashMap =RequestContextUtils.getInputFlashMap(request);
		  SearchVO  searchVO =new SearchVO();
	      if(flashMap!=null) {
	          
	         searchVO=(SearchVO)flashMap.get("searchVO");
	    }
	      model.addAttribute("searchVO", searchVO);
		return "/questTotalBoard/noticeDetail";
	}
	
	/* 공지사항상세 페이지 가기(공시사항디테일불러오기) */
	@PostMapping("/notice/detailNotcie")
	public String detailNotcieSearch(String ntcNo,SearchVO searchVO,RedirectAttributes redirectAttributes) {
		 redirectAttributes.addFlashAttribute("searchVO", searchVO);
		return "redirect:/notice/detailNotcie/"+ntcNo;
	}

	/* 공지사항 글 삭제 */
	@GetMapping("/notice/deleteNotice")
	@ResponseBody
	public void deleteNotice(@RequestParam int ntcNo) {
		noticeService.deleteNotice(ntcNo);
	}

	/* 공지사항 글 수정 */
	@PostMapping("/notice/updateNotice")
	@ResponseBody
	public void updateNotice(@RequestBody NoticeVO vo) {
		noticeService.updateNotice(vo);
	}

	/* 공지사항 검색 */
	@GetMapping("/notice/searchNotice")
	@ResponseBody
	public Map<String, Object> searchNotice(SearchVO vo) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();

		int listcount = noticeService.getListCount(vo);

		SearchVO searchVO = SearchVO.builder().selectOptValOne(vo.getSelectOptValOne()).searchVal(vo.getSearchVal()).page(vo.getPage()).listcount(listcount).build();
		//SearchVO searchVO = new SearchVO(vo.getSearchVal(), vo.getSelectOptVal(), vo.getPage(), listcount);

		List<NoticeVO> noticeList = noticeService.getNoticeList(searchVO);

		resultMap.put("noticeList", noticeList);
		resultMap.put("maxPage", searchVO.getMaxpage());
		resultMap.put("page", searchVO.getPage());
		resultMap.put("startpage", searchVO.getStartpage());
		resultMap.put("endpage", searchVO.getEndpage());

		return resultMap;
	}
	
}
