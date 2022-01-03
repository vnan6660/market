package com.dao.myTotalInfo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vo.cart.CartListVO;
import com.vo.cart.CartVO;
import com.vo.cart.PayVO;
import com.vo.login.JoinVO;

@Repository
public class MyCartDaoImpl implements MyCartDao{

	@Autowired
	SqlSession sqlSession;

	@Override
	public int cartCount(String gdNo, String csNo) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("gdNo", gdNo);
		map.put("csNo", csNo);
		return sqlSession.selectOne("cartCount", map);
	}

	//장바구니에 물건이 없으면 insert
	@Override
	public void insertCart(CartVO cartVo) {
		sqlSession.insert("insertCart", cartVo);
	}

	//장바구니에 물건이 있으면 update
	@Override
	public void updateCart(CartVO cartVo) {
		sqlSession.update("updateCart", cartVo);
	}

	//장바구니 목록 가져오기
	@Override
	public List<CartListVO> getCartList(String csNo) {
		return sqlSession.selectList("getCartList", csNo);
	}

	//장바구니 목록 삭제
	@Override
	public void delCart(CartListVO cartlistVo) {
		sqlSession.delete("delCart", cartlistVo);
	}

	//고객정보가져오기
	@Override
	public List<JoinVO> getCsInfo(String csNo) {
		return sqlSession.selectList("getCsInfo", csNo);
	}

	//[장바구니 구매] 1. ORDER_INFO
	@Override
	public void insOdrInfo(List<Map<String, Object>> payVoList) {
		sqlSession.insert("insOdrInfo", payVoList);
	}




}
