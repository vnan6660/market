package com.dao.myTotalInfo;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vo.common.SearchVO;
import com.vo.orderInfo.OrderInfoVO;

/**
 * 주문정보 DaoImpl 
 * 생성자 : 김소연	 
 * 생성일 : 2022.01.13
 */
@Repository
public class MyOrderDaoImpl implements MyOrderDao {

	@Autowired
	SqlSession sqlSession;
	
	//주문정보가져오기
	@Override
	public List<OrderInfoVO> selectMyOrderInfo(SearchVO searchVO) {
		return sqlSession.selectList("selectMyOrderInfo",searchVO);
	}

	//검색글 카운트
	@Override
	public int selectMyorderListCount(SearchVO svo) {
		return sqlSession.selectOne("selectMyOrderListCount",svo);
	}

	//주문상세내역가져오기
	@Override
	public OrderInfoVO selectMyOrderDetail(Map<String, Object> param) {
		return sqlSession.selectOne("selectMyOrderDetail",param);
	}

}
