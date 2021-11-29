package com.controller.login;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 로그인 Controller
 * 생성자 : 김소연
 * 생성일 : 2021.11.29
 *
 */
@Controller
public class LoginController {
	
	/* 로그인 페이지 가기 */
	@RequestMapping("/login")
	public String authMgt() {
		return "/login/login";
	}
	
}
