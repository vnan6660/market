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

	@Autowired
	private JoinService joinService;

	//회원가입 joinPage
	// @RequestMapping: ("/login/joinPage")URL로 요청이 들어오면 controller에서 이 URL요청을 특정
	// 메서드와 매핑하기위해 사용하는것이 @RequestMapping이다.
	@RequestMapping(value = "/login/joinPage")
	public String joinPage() { // joinPage() 메서드는
		return "/login/join"; // /login/join를 리턴해준다
	}

	//회원가입 수행 
//	@ResponseBody
//	- 반환
//	- java객체를 Json 으로 바꿔서 다시 HTTP BODY(XML or JSON)에 담는 역할
//	@RequestBody
//	- 요청
//	- 요청값을 java객체로 전달받을 수 있다.
//	- Ajax에서 파라미터를 컨트롤러에 보내면 컨트롤러에선 @RequestBody를 사용하여 파라미터를 받는다.
//	@PostMapping("/login/getJoin")
//	@ResponseBody 
//	public int doJoin(@RequestBody JoinVO vo) { // joinPage() 메서드는
//		int resultId = loginService.idCheck(vo);
//		if(resultId == 0) { //신규회원이면
//			loginService.doJoin(vo); //회원가입 계속 진행
//		}
//		return resultId;
//	}

	@PostMapping(value = "/login/doJoin")
	public String doJoin(@RequestParam Map<String, Object> param){ // joinPage() 메서드는
		
		System.out.println(param);
		/*----------------------------------------------------*/
		String csId = (String)param.get("csId");
		int resultId = joinService.idCheck(csId);
		if (resultId == 0) { // 신규회원이면
			joinService.doJoin(param); // 회원가입 계속 진행
		}
		return "redirect:/login/loginPage";
	}

//	@ResponseBody
//	- 반환
//	- java객체를 Json 으로 바꿔서 다시 HTTP BODY(XML or JSON)에 담는 역할
//	@RequestBody
//	- 요청
//	- 요청값을 java객체로 전달받을 수 있다.
//	- Ajax에서 파라미터를 컨트롤러에 보내면 컨트롤러에선 @RequestBody를 사용하여 파라미터를 받는다.
//	@PostMapping("/login/idCheck")
//	@ResponseBody
//	// id중복체크하려고 int형으로 설정했다. DB에 COUNT(*)써서 ID가 있으면 1, 없으면0으로 반환하려고
//	public int idCheck(@RequestBody JoinVO vo) { // idCheck() 메서드는 (int형)
//		int result = loginService.idCheck(vo); // loginService.idCheck(vo)의 값을 result에 담아라
//		return result; // result를 반환해라
//	}
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

}
