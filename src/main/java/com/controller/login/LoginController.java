package com.controller.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.login.LoginService;
import com.vo.login.LoginVO;

/**
 * 로그인 Controller
 * 생성자 : 김소연
 * 생성일 : 2021.11.29
 *
 */
@Controller
public class LoginController {
	
	@Autowired
	private LoginService loginService;
	
	/* 로그인 페이지 가기 */
	@RequestMapping("/login")
	public String authMgt() {
		return "/login/login";
	}
	
	@PostMapping("/get/login")
	@ResponseBody
	public String getLogin(@RequestBody LoginVO vo) {
		
		String returnval = loginService.getLogin(vo);
		
		return returnval;
	}
}
