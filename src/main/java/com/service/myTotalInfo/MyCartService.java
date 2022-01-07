package com.service.myTotalInfo;

import java.util.List;
import java.util.Map;

import com.vo.cart.CartListVO;
import com.vo.cart.CartVO;
import com.vo.login.JoinVO;

/**
 * 장바구니 Controller 
 * 생성자 : 김혜경 
 * 생성일 : 2021.12.27
 */
public interface MyCartService {
	
	//장바구니에 담긴 상품개수 확인
	int cartCount(String gdNo, String csNo);

	//장바구니에 물건이 없으면 insert
	void insertCart(CartVO cartVo);

	//장바구니에 물건이 있으면 update
	void updateCart(CartVO cartVo);

	//장바구니 목록 가져오기
	List<CartListVO> getCartList(String csNo);

	//장바구니 목록 삭제
	void delCart(CartListVO cartlistVo);

	//고객정보 가져오기
	List<JoinVO> getCsInfo(String csNo);

	//[장바구니 구매] 1. ORDER_INFO
	void insOdrInfo(List<Map<String, Object>> payVoList);

	
	

}
