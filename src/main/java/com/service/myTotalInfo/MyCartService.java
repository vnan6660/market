package com.service.myTotalInfo;

import java.util.List;

import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.cart.CartVO;

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
	List<GoodsListVO> getCartList(String csNo);

	
	

}
