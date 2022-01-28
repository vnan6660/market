package com.dao.common;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.common.CmmnVO;
import com.vo.common.OrderVO;

/**
 * 공통 DaoImpl
 * 생성자 : 김소연 
 * 생성일 : 2021.12.17
 */
@Repository
public class CommonDaoImpl implements CommonDao {
	@Autowired
	SqlSession sqlSession;

	//공통코드 가져오기
	@Override
	public List<CmmnVO> selectCmmnCd() {
		return sqlSession.selectList("selectCmmnCd");
	}

	//금주 주문량,판매금액 불러오기
	@Override
	public OrderVO selectOrderAmtQty(Map<String, Object> param) {
		return sqlSession.selectOne("selectOrderAmtQty",param);
	}

	//베스트 셀러 불러오기
	@Override
	public List<GoodsListVO> selectBestSeller() {
		return sqlSession.selectList("selectBestSeller");
	}

	//추천도서 불러오기
	@Override
	public List<GoodsListVO> selectRecomnSeller(String gpCd) {
		return sqlSession.selectList("selectRecomnSeller",gpCd);
	}
}
