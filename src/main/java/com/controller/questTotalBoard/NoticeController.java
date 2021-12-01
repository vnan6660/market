package com.controller.questTotalBoard;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class NoticeController {
	/* 공지사항 페이지 가기 */
	@RequestMapping("/notice")
	public String notice() {
		return "/questTotalBoard/notice";
	}
	
	/* 공지사항글쓰기 페이지 가기 */
	@GetMapping("/write/notice")
	public String goWriteForm() {
		return "/questTotalBoard/noticeWrite";
	}
	
	/*
	 * @PostMapping("/write/notice") public String writeNotice() { return "/notice";
	 * }
	 */
	
	/* 공지사항상세 페이지 가기 */
	@GetMapping("/detail/notice")
	public String detailNotcie() {
		return "/questTotalBoard/noticeDetail";
	}
}
