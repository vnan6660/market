package com.controller.myTotalInfo;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.vo.cart.CartListVO;
import com.vo.cart.CartVO;
import com.vo.cart.PayVO;
import com.vo.login.JoinVO;
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
	private HttpServletRequest request;
	
	//장바구니 이동
	@RequestMapping("/myCart/myCartPage")
	public String myCartPage(Model model) throws IOException { // myCartPage() 메서드는
		
		/* 로그인 정보 가져오기 */
		HttpSession session = request.getSession(true);
		String csNo = (String) session.getAttribute("userNo");
		
		//장바구니 목록 가져오기
		List<CartListVO> list = myCartService.getCartList(csNo);
		//새로운 reList를 만든다 -> 이미지를 변형해야해서 다시 만듦
		List<CartListVO> reList = new ArrayList<CartListVO>();
		
		for (int i = 0; i < list.size(); i++) {
			//CartListVO에 저장하기위해 생성자 생성
			CartListVO vo = new CartListVO();
			
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
			vo.setGdQty(list.get(i).getGdQty());	//상품수량
			
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
			Integer gdQtyInt = Integer.parseInt(cartVo.getGdQty()) + Integer.parseInt(cartVo.getGdQty());//string형태의gdQty를 int로 바꿔서 더함
			String gdQty =  Integer.toString(gdQtyInt);//int로 바꾼 gdQty를 다시 string으로 바꿈
			cartVo.setGdQty(gdQty);
			myCartService.updateCart(cartVo);
		}
	}
	
	//장바구니 목록 삭제
	@ResponseBody
	@PostMapping("/myCart/delCart")
	public String delCart(CartListVO cartlistVo) {
		HttpSession session = request.getSession(true);
		String csNo = (String) session.getAttribute("userNo");
		cartlistVo.setCsNo(csNo);//cartVo의 csNo에 세션의 csNo를 넣음
		
		//삭제[]
		String[] ajaxMsg = request.getParameterValues("valueArr");
		int size = ajaxMsg.length;
		for(int i=0; i<size; i++) {
			cartlistVo.setGdNo(ajaxMsg[i]);
			myCartService.delCart(cartlistVo);
		}
		
		return "redirect:/myCart/myCartPage";
	}
	
	//장바구니 이동
	@RequestMapping("/myCartBuy/myCartBuyPage")
	public String myCartBuyPage(Model model) throws IOException { // myCartPage() 메서드는
		
		/* 로그인 정보 가져오기 */
		HttpSession session = request.getSession(true);
		String csNo = (String) session.getAttribute("userNo");
		
		//장바구니 목록 가져오기
		List<CartListVO> list = myCartService.getCartList(csNo);
		
		//새로운 reList를 만든다 -> 이미지를 변형해야해서 다시 만듦
		List<CartListVO> reList = new ArrayList<CartListVO>();
		
		for (int i = 0; i < list.size(); i++) {
			//CartListVO에 저장하기위해 생성자 생성
			CartListVO vo = new CartListVO();
			
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
			vo.setGdQty(list.get(i).getGdQty());	//상품수량
			
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
		
		//로그인된 고객번호로 이름, 핸드폰번호, 주소, 이메일 가져오기
		List<JoinVO> joinVo = myCartService.getCsInfo(csNo);
		model.addAttribute("csInfo",joinVo);

		return "/myTotalInfo/myCartBuy"; // 실제주소인 /myTotalInfo/myCartBuy를 리턴해준다
	}
	
	
	
	//장바구니 구매
	@ResponseBody
	@PostMapping("/myCart/doPay")
	public void doPay(PayVO payVo) {
		HttpSession session = request.getSession(true);
		String csNo = (String) session.getAttribute("userNo");
		String csNm = (String) session.getAttribute("userNm");
		payVo.setCsNo(csNo);//payVo의 csNo에 세션의 csNo를 넣음
		payVo.setCsNm(csNm);//payVo의 csNm에 세션의 csNm를 넣음
		
		/***** 현재시간 milsec로 바꿈 *****/
		//1. 사용할 zone 아이디 값
        ZoneId zoneid = ZoneId.of("Asia/Seoul");
        //2. 현재 날짜 구하기
        Date date = new Date();        
		DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyyMMdd")
				.withZone(ZoneId.systemDefault());
		String dateToStr = format.format(date.toInstant());
        //3.현재 시간의 값 밀리세컨드 변환
        Long milsec = LocalDateTime.now().atZone(zoneid).toInstant().toEpochMilli();
        String strMilsec = Long.toString(milsec);
        //4.현재날짜+milsec를 주문번호로 사용
        String odNo = dateToStr+strMilsec;
        payVo.setOdNo(odNo);
        
        /***** 장바구니 구매 *****/
        //[장바구니 구매] 1. ORDER_INFO
        List<Map<String, Object>> payVoList = new ArrayList<Map<String, Object>>();
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("odNo", payVo.getOdNo());
        map.put("csNo", payVo.getCsNo());
        
        String gdNo =  payVo.getGdNo();
        String[] splitGdNo = gdNo.split(",");
        for(var i=0 ; i<splitGdNo.length; i++) {
        	System.out.println(splitGdNo[i]);
        	map.put("gdNo", splitGdNo[i]);
        }
        System.out.println("=============================================="); 
        System.out.println(gdNo);
    	System.out.println("=============================================="); 
        
    	//map.put("gdNo", payVo.getGdNo());
        map.put("gdQty", payVo.getGdQty());
        map.put("odAmt", payVo.getOdAmt());
        payVoList.add(map);
        
        for(Map<String, Object> strMap : payVoList){
            System.out.println(strMap.get("odNo"));
            System.out.println(strMap.get("csNo"));
            for(var i=0 ; i<splitGdNo.length; i++) {
            	System.out.println(strMap .get(splitGdNo[i]));
            }
            System.out.println(strMap.get("gdQty"));
            System.out.println(strMap.get("odAmt"));
        	System.out.println("==============================================");
        }
        
        myCartService.insOdrInfo(payVoList);
///////////////////////////////////////////////////////////////////////////
		//장바구니 구매 1.배송정보(TRANSFER_INFO)테이블에 먼저 INSERT
		//배송번호, 배송주소, 수취인 이름, 수취인 전화번호
 		//myCartService.insTrsInfo(cartListVo);
		
		//2.주문정보(ORDER_INFO)테이블에 INSERT
		//List<PayVO> listPayVo =  new ArrayList<PayVO>();
///////////////////////////////////////////////////////////////////////////

	}
	
	
	
	
	
	
	
}
