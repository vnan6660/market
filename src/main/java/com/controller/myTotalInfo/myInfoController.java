package com.controller.myTotalInfo;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.service.myTotalInfo.MyInfoService;
import com.vo.csMgt.CsInfoVO;

/**
 * 마이페이지 Controller
 * 생성자 : 김혜경
 * 생성일 : 2021.12.10
 *
 */
@Controller
public class myInfoController {
	
	@Autowired
	private MyInfoService myInfoService;
	
	@Autowired
	private HttpServletRequest request;
	
	/**
	 * 마이페이지 이동
	 * 생성자 : 김혜경
	 * 생성일 : 2021.12.10
	 */
	@GetMapping("/myInfo/myInfoPage") 
	public String myInfoPage(Model model) { // myInfoPage() 메서드는
		
		HttpSession session = request.getSession();
		String csId = (String) session.getAttribute("userId");
		
		System.out.println(csId);
		
		CsInfoVO csInfoVO = myInfoService.myInfoPage(csId);
		model.addAttribute("csInfo", csInfoVO);
		
		
		return "/myTotalInfo/myInfo"; // /myTotalInfo/myInfo를 리턴해준다
	}
	
	
}
