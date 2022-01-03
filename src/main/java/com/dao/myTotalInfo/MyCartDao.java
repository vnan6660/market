package com.dao.myTotalInfo;

import java.util.List;
import java.util.Map;

import com.vo.cart.CartListVO;
import com.vo.cart.CartVO;
import com.vo.cart.PayVO;
import com.vo.login.JoinVO;

public interface MyCartDao {


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

	//고객정보가져오기
	List<JoinVO> getCsInfo(String csNo);

	//[장바구니 구매] 1. ORDER_INFO
	public void insOdrInfo(List<Map<String, Object>> payVoList);

}
