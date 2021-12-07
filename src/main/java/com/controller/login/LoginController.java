package com.controller.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.login.LoginService;
import com.vo.login.JoinVO;
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
	// ("/login/joinPage")URL로 요청이 들어오면 controller에서 이 URL요청을 특정 메서드와 매핑하기위해 사용하는것이 @RequestMapping이다.
	@RequestMapping("/login/joinPage") 
	public String joinPage() { // joinPage() 메서드는
		return "/login/join"; // /login/join를 리턴해준다
	}
	
	/**
	 * 회원가입 수행
	 * 생성자 : 김혜경
	 * 생성일 : 2021.12.06
	 */
	@PostMapping("/login/getJoin")
	@ResponseBody
	public String doJoin(@RequestBody JoinVO vo) { // joinPage() 메서드는
		int result = loginService.idCheck(vo);
		
		System.out.println("중복은1 신규회원이면0 = "+ result);
		
		if(result == 1) { //id가 이미 있으면
			return "/login/join"; //회원가입페이지로 이동
		}else if(result == 0) { //신규회원이면
			loginService.doJoin(vo); //회원가입 계속 진행
		}
		return "redirect:/";
	}
	
	/**
	 * 회원가입 id 중복체크
	 * 생성자 : 김혜경
	 * 생성일 : 2021.12.07
	 */
	@PostMapping("/login/idCheck")
	@ResponseBody
	public int idCheck(@RequestBody JoinVO vo) { // joinPage() 메서드는
		int result = loginService.idCheck(vo);
		return result;
	}
}
