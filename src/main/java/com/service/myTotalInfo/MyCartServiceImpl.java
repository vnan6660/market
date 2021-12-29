package com.service.myTotalInfo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.myTotalInfo.MyCartDao;
import com.vo.cart.CartListVO;
import com.vo.cart.CartVO;

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


}
