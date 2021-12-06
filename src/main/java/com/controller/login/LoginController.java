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
	@RequestMapping("/login/loginPage")
	public String authMgt() {
		return "/login/login";
	}
	
	@PostMapping("/login/getLogin")
	@ResponseBody
	public String getLogin(@RequestBody LoginVO vo) {
		
		String returnval = loginService.getLogin(vo);
		
		return returnval;
	}
	
	/**
	 * 회원가입 joinPage
	 * 생성자 : 김혜경
	 * 생성일 : 2021.12.06
	 */
	// /login/joinPage URL로 요청이 들어오면 controller에서 이 URL요청을 특정 메서드와 매핑하기위해 사용하는것이 @RequestMapping이다.
	@RequestMapping("/login/joinPage") 
	public String joinPage() { // joinPage() 메서드는
		return "/login/join"; // /login/join를 리턴해준다
	}
}
