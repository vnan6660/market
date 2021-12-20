package com.controller.login;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.login.JoinService;
import com.vo.login.JoinVO;

/**
 * 회원가입 Controller 
 * 생성자 : 김혜경
 * 생성일 : 2021.12.13
 */
@Controller
public class JoinController {
//	@RequestMapping
//	-URL로 요청이 들어오면 controller에서 이 URL요청을 특정메서드와 매핑하기위해 사용하는것
//	@ResponseBody
//	- 반환
//	- java객체를 Json 으로 바꿔서 다시 HTTP BODY(XML or JSON)에 담는 역할
//	@RequestBody
//	- 요청
//	- 요청값을 java객체로 전달받을 수 있다.
//	- Ajax에서 파라미터를 컨트롤러에 보내면 컨트롤러에선 @RequestBody를 사용하여 파라미터를 받는다.
	
	@Autowired
	private JoinService joinService;
	
	//회원가입 joinPage
	@RequestMapping(value = "/login/joinPage")
	public String joinPage() { // joinPage() 메서드는
		return "/login/join"; // /login/join를 리턴해준다
	}

	//회원가입 수행 
	@PostMapping(value = "/login/doJoin")
	public String doJoin(@RequestParam Map<String, Object> param){ // joinPage() 메서드는
		String csId = (String)param.get("csId");
		int resultId = joinService.idCheck(csId);
		if (resultId == 0) { // 신규회원이면
			joinService.doJoin(param); // 회원가입 계속 진행
		}
		return "redirect:/login/welcomePage"; //회원가입 후 회원가입 환영페이지로 이동
	}

	//회원가입 id 중복체크
	@PostMapping("/login/idCheck")
	@ResponseBody
	public int idCheck(@RequestBody JoinVO vo) { 
		// idCheck() 메서드는 (int형)
		String csId = vo.getCsId();
		int result = joinService.idCheck(csId); // loginService.idCheck(vo)의 값을 result에 담아라
		return result; // result를 반환해라
	}

	//회원가입 이메일 중복확인 
	@ResponseBody
	@PostMapping("/login/emailChk")
	public int emailChk(@RequestBody JoinVO vo) {
		int result = joinService.emailChk(vo);
		return result;
	}
	
	//회원가입 welcome페이지
	@RequestMapping(value = "/login/welcomePage")
	public String welcomePage() {
		return "/login/welcome"; // /login/join를 리턴해준다
	}

}
