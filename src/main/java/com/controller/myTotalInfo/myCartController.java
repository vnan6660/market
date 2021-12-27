package com.controller.myTotalInfo;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.service.myTotalInfo.MyCartService;

/**
 * 장바구니 Controller 
 * 생성자 : 김혜경 
 * 생성일 : 2021.12.27
 */
@Controller
public class myCartController {

	@Autowired
	private MyCartService myCartService;

	@Autowired
	private HttpServletRequest request;

	// 마이페이지 이동
	@RequestMapping("/myCart/myCartPage")
	public String myCartPage(Model model) { // myCartPage() 메서드는

	

		return "/myTotalInfo/myCart"; // 실제주소인 /myTotalInfo/myCart를 리턴해준다
	}


	
}
