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
 * 마이페이지 Controller 
 * 생성자 : 김혜경 
 * 생성일 : 2021.12.10
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

	//비밀번호 확인페이지에서 세션의 비밀번호와 입력한 비밀번호가 같은지 체크
	@PostMapping("/myInfo/pwChk")
	@ResponseBody
	public int pwChk(@RequestBody Map<String, Object> param) {
		int result = 0;
		int a = myInfoService.pwChk(param);
		if (a == 1) {
			result = 1;
		}
		return result;
	}
	
	//회원정보수정 페이지로 이동
	@GetMapping("/myInfo/updateInfoPage")
	public String updateInfoPage(Model model) { // updateInfoPage() 메서드는

		HttpSession session = request.getSession();
		String csId = (String) session.getAttribute("userId");

		CsInfoVO csInfoVO = myInfoService.myInfoPage(csId);
		model.addAttribute("csInfo", csInfoVO);

		return "/myTotalInfo/updateInfo"; // 실제주소인 /myTotalInfo/updateInfo를 리턴해준다
	}
	
	//회원정보 수정 버튼을 눌렀을 때 회원정보 update시켜라
	@ResponseBody
	@PostMapping("/myInfo/doUpdateInfo")
	public String doUpdateInfo(CsInfoVO vo) { // doUpdateInfo() 메서드는
		myInfoService.doUpdateInfo(vo);//id에 맞게 update시키게 파라미터로 넣어줌
		
		return "redirect:/myInfo/myInfoPage"; //마이페이지로 이동
	}
	
	//회원정보 수정 이메일 중복확인 
	@ResponseBody
	@PostMapping("/myInfo/infoEmailChk")
	public int infoEmailChk(@RequestBody  CsInfoVO vo) {
		int result = 0;
		result = myInfoService.infoEmailChk(vo);
		System.out.println("infoEmailChk:"+result);
		return result;
	}
	
}
