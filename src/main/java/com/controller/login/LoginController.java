package com.controller.login;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.login.LoginService;
import com.vo.login.LoginVO;

/**
 * 로그인 Controller 생성자 : 김소연
 * 생성일 : 2021.11.29
 */
@Controller
public class LoginController {

	@Autowired
	private LoginService loginService;

	@Autowired
	private HttpServletRequest request;

	/* 로그인 페이지 가기 */
	@RequestMapping("/login/loginPage")
	public String loginPage() {

		return "/login/login";
	}

	/* 로그인하는 아이디 비밀번호체크후 로그인 수행 */
	@PostMapping("/login/getLogin")
	@ResponseBody
	public String getLogin(@RequestBody LoginVO vo) {

		/* 로그인하는 아이디 비밀번호체크 있으면 1 없으면 0 */
		String returnCnt = loginService.getLoginCnt(vo);

		/* 로그인 아이디 비밀번호체크 후 있으면 실행 */
		if (returnCnt == "1") {
			/* 로그인 정보 가져오기 */
			LoginVO loginInfo = loginService.getLogin(vo);

			HttpSession session = request.getSession(true);
			session.setAttribute("userId", loginInfo.getCsId());
			session.setAttribute("userGrade", loginInfo.getCsGrade());
			session.setAttribute("userNm", loginInfo.getCsNm());
		}

		return returnCnt;
	}

	/* 로그아웃 실행 */
	@GetMapping("/login/getLogout")
	@ResponseBody
	public void getLogout() {
		HttpSession session = request.getSession(true);
		/* 세션정보지우기 */
		session.invalidate();
	}
}
