package com.controller.questTotalBoard;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.questTotalBoard.NoticeService;
import com.vo.questTotalBoard.NoticeVO;
import com.vo.questTotalBoard.SearchVO;


/**
 * 공지사항 Controller
 * 생성자 : 김소연
 * 생성일 : 2021.12.02
 *
 */
@Controller
public class NoticeController {
	
	@Autowired
	private NoticeService noticeService;
	
	/* 공지사항 페이지 가기(공지사항목록불러오기) */
	@GetMapping("/notice")
	public String notice(Model model) {
		SearchVO vo = new SearchVO();
		List<NoticeVO> noticeList = noticeService.getNoticeList(vo);
		model.addAttribute("noticeList", noticeList);
		
		return "/questTotalBoard/notice";
	}

	/* 공지사항글쓰기 페이지 가기 */
	@GetMapping("/write/notice")
	public String goWriteForm() {
		return "/questTotalBoard/noticeWrite";
	}

	/* 공지사항 글 저장*/
	@PostMapping("/write/notice")
	@ResponseBody
	public void writeNotice(@RequestBody NoticeVO vo) {
		noticeService.writeNotice(vo);
	}

	/* 공지사항상세 페이지 가기(공시사항디테일불러오기) */
	@GetMapping("/detail/notice/{ntcNo}")
	public String detailNotcie(@PathVariable int ntcNo, Model model) {
		NoticeVO noticeOne = noticeService.getNotcieDetail(ntcNo);
		model.addAttribute("noticeOne", noticeOne);
		return "/questTotalBoard/noticeDetail";
	}
	
	/* 공지사항 글 삭제*/
	@GetMapping("/delete/notice")
	@ResponseBody
	public void deleteNotice(@RequestParam int ntcNo) {
		noticeService.deleteNotice(ntcNo);
	}
	
	/* 공지사항 글 수정*/
	@PostMapping("/update/notice")
	@ResponseBody
	public void updateNotice(@RequestBody NoticeVO vo) {
		noticeService.updateNotice(vo);
	}
	
}
