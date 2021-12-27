package com.controller.myTotalInfo;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.myTotalInfo.MyCartService;
import com.service.userBook.BestBookService;
import com.vo.adminGoodsMgt.GoodsListVO;
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
	private MyCartService myCartService;

	@Autowired
	private BestBookService bestBookService;
	
	@Autowired
	private HttpServletRequest request;
	
	//장바구니 이동
	@RequestMapping("/myCart/myCartPage")
	public String myCartPage(Model model) throws IOException { // myCartPage() 메서드는
		
		/* 로그인 정보 가져오기 */
		HttpSession session = request.getSession(true);
		String csNo = (String) session.getAttribute("userNo");
		
		//장바구니 목록 가져오기
		List<GoodsListVO> list = myCartService.getCartList(csNo);
		//새로운 reList를 만든다 -> 이미지를 변형해야해서 다시 만듦
		List<GoodsListVO> reList = new ArrayList<GoodsListVO>();
		
		for (int i = 0; i < list.size(); i++) {
			//GoodsListVO에 저장하기위해 생성자 생성
			GoodsListVO vo = new GoodsListVO();
			
			//list의 i행에있는 gdNo를 vo의 gdNo에 값을 넣겠다.(이하동일)
			vo.setGdNo(list.get(i).getGdNo());	//상품번호
			vo.setGdGp(list.get(i).getGdGp());	//상품구분
			vo.setGdGpNm(list.get(i).getGdGpNm());	//상품구분이름
			vo.setGdSp(list.get(i).getGdSp());	//상품분류
			vo.setGdNm(list.get(i).getGdNm());	//상품이름
			vo.setGdCnt(list.get(i).getGdCnt());	//상품재고
			vo.setGdWr(list.get(i).getGdWr());	//상품작가
			vo.setGdPb(list.get(i).getGdPb());	//상품출판사
			vo.setGdPrice(list.get(i).getGdPrice());	//상품가격
			
			//for문을 돌렸을때 이미지가 있다면
			if (list.get(i).getGdImg() != null) {
				//blob으로 저장되어있는 이미지를 string형태로 담아낸다.
				String gdImgStr = new String(Base64.encodeBase64(list.get(i).getGdImg()),"UTF-8");
				//vo에 이미지를 담는다.
				vo.setGdImgStr(gdImgStr);
			}
			
			//새로운 리스트에 가져온 값을 넣어줌
			reList.add(i,vo);
		}
		model.addAttribute("cartList",reList);
		return "/myTotalInfo/myCart"; // 실제주소인 /myTotalInfo/myCart를 리턴해준다
	}

	//장바구니에 추가
	@ResponseBody
	@PostMapping("/myCart/addCart")
	public void addCart(CartVO cartVo, LoginVO vo) {
		
		/* 로그인 정보 가져오기 */
		HttpSession session = request.getSession(true);
		String csNo = (String) session.getAttribute("userNo");
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
