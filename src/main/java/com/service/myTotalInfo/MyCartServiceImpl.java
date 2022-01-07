package com.service.myTotalInfo;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.myTotalInfo.MyCartDao;
import com.vo.cart.CartListVO;
import com.vo.cart.CartVO;
import com.vo.login.JoinVO;
/**
 * 장바구니 ServiceImpl
 * 생성자 : 김소연 
 * 생성일 : 2021.12.27
 */
@Service
public class MyCartServiceImpl implements MyCartService{

	@Autowired
	private MyCartDao myCartDao;
	
	//장바구니에 담긴 상품개수 확인
	@Override
	public int cartCount(String gdNo, String csNo) {
		return myCartDao.cartCount(gdNo,csNo);
	}

	//장바구니에 물건이 없으면 insert
	@Override
	public void insertCart(CartVO cartVo) {
		myCartDao.insertCart(cartVo);
	}
	
	//장바구니에 물건이 있으면 update
	@Override
	public void updateCart(CartVO cartVo) {
		myCartDao.updateCart(cartVo);
		
	}

	//장바구니 목록 가져오기
	@Override
	public List<CartListVO> getCartList(String csNo) {
		return myCartDao.getCartList(csNo);
	}

	//장바구니 목록 삭제
	@Override
	public void delCart(CartListVO cartlistVo) {
		myCartDao.delCart(cartlistVo);
	}

	//고객정보 가져오기
	@Override
	public List<JoinVO> getCsInfo(String csNo) {
		return myCartDao.getCsInfo(csNo);
	}

	//장바구니 구매
	@Override
	public void setOdrInfo(Map<String, Object> insertMap) {
		myCartDao.insOdrInfo(insertMap);
	}



}
