package com.controller.myTotalInfo;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.login.LoginService;
import com.service.myTotalInfo.MyCartService;
import com.vo.cart.CartVO;
import com.vo.login.LoginVO;

/**
 * 장바구니 Controller 
 * 생성자 : 김혜경 
 * 생성일 : 2021.12.27
 */
@Controller
public class myCartController {

	@Autowired
	private LoginService loginService;
	
	@Autowired
	private MyCartService myCartService;

	@Autowired
	private HttpServletRequest request;
	
	//장바구니 이동
	@RequestMapping("/myCart/myCartPage")
	public String myCartPage(Model model) { // myCartPage() 메서드는
		return "/myTotalInfo/myCart"; // 실제주소인 /myTotalInfo/myCart를 리턴해준다
	}

	//장바구니에 추가
	@ResponseBody
	@PostMapping("/myCart/addCart")
	public void addCart(CartVO cartVo, LoginVO vo) {
		
		/* 로그인 정보 가져오기 */
		HttpSession session = request.getSession(true);
		String csNo = (String) session.getAttribute("userNo");
		System.out.println("csNo: "+csNo);
		cartVo.setCsNo(csNo);//cartVo의 csNo에 세션의 csNo를 넣음
		
		//장바구니에 담긴 상품개수 확인
		int cartCount = myCartService.cartCount(cartVo.getGdNo(),csNo);
		
		if(cartCount == 0) {//장바구니에 물건이 없으면 insert
			myCartService.insertCart(cartVo);
		}else {//장바구니에 물건이 있으면 update
			myCartService.updateCart(cartVo);
		}
		
		
	}
	
	
	
	
}
