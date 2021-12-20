package com.controller.userBook.bestBook;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 베스트도서 Controller
 * 생성자 : 김혜경
 * 생성일 : 2021.12.20
 */
@Controller
public class BestBookController {

//	@Autowired
//	private LoginService loginService;

//	@Autowired
//	private HttpServletRequest request;

	//베스트도서 페이지 연결
	@RequestMapping("/bestBook/bestBookPage")
	public String bestBookPage() {

		return "/userBook/bestBook/bestBookList";
	}

	
}
