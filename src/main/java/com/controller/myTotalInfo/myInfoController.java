package com.controller.myTotalInfo;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.myTotalInfo.MyInfoService;
import com.vo.csMgt.CsInfoVO;

/**
 * 마이페이지 Controller 생성자 : 김혜경 생성일 : 2021.12.10
 *
 */
@Controller
public class myInfoController {

	@Autowired
	private MyInfoService myInfoService;

	@Autowired
	private HttpServletRequest request;

	// 마이페이지 이동
	@GetMapping("/myInfo/myInfoPage")
	public String myInfoPage(Model model) { // myInfoPage() 메서드는

		HttpSession session = request.getSession();
		String csId = (String) session.getAttribute("userId");

		CsInfoVO csInfoVO = myInfoService.myInfoPage(csId);
		model.addAttribute("csInfo", csInfoVO);

		return "/myTotalInfo/myInfo"; // 실제주소인 /myTotalInfo/myInfo를 리턴해준다
	}

	// 비밀번호 확인페이지로 이동
	@GetMapping("/myInfo/pwChkPage")
	public String pwChkPage(Model model) { // myInfoPage() 메서드는

		HttpSession session = request.getSession();
		String csId = (String) session.getAttribute("userId");

		CsInfoVO csInfoVO = myInfoService.myInfoPage(csId);
		model.addAttribute("csInfo", csInfoVO);

		return "/myTotalInfo/pwChk"; // 실제주소인 /myTotalInfo/pwChk를 리턴해준다
	}

	// 비밀번호 확인페이지에서 세션의 비밀번호와 입력한 비밀번호가 같은지 체크
	@PostMapping("/myInfo/pwChk")
	@ResponseBody
	public int pwChk(@RequestBody Map<String, Object> param) { // myInfoPage() 메서드는
		HttpSession session = request.getSession(); // 세션
		String csPs = (String) session.getAttribute("userPs"); // 세션의 비밀번호 정보를 가져오세요
		// String psConfirm = myInfoService.pwChk(csPs);//비밀번호

		int result = 0;

		if (param.get("pwChkInput").equals(csPs)) {
			result = 1;
		}
		
		System.out.println(result);

		return result;
	}
}
