package com.dao.orderMgt;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vo.common.SearchVO;
import com.vo.orderMgt.OrderWrapVO;

/**
 * 주문목록 DaoImpl
 * 생성자 : 김소연	 
 * 생성일 : 2022.01.17
 */
@Repository
public class OrderListDaoImpl implements OrderListDao {

	@Autowired
	SqlSession sqlSession;
	
	@Override
	public List<OrderWrapVO> selectMyOrderList(SearchVO searchVO) {
		return sqlSession.selectList("selectMyOrderList", searchVO);
	}

	//검색글 카운트
	@Override
	public int selectOrderListCount(SearchVO svo) {
		return sqlSession.selectOne("selectOrderListCount", svo);
	}

}
