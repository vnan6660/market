package com.controller.menuTotalMgt;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 권한관리 Controller
 * 생성자 : 김소연
 * 생성일 : 2021.11.27
 *
 */


@Controller
public class AuthMgtController {
	
	/* 권한관리 페이지 가기 */
	@RequestMapping("/authMgt")
	public String authMgt() {
		return "/menuTotalMgt/authMgt";
	}
}
