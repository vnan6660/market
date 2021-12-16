package com.dao.adminGoodsMgt;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vo.common.CmmnVO;

@Repository
public class GoodsRegDaoImpl implements GoodsRegDao {
	
	@Autowired
	SqlSession sqlSession;

	/* 상품 구분에 해당하는 상품 분류 가지고 오기 */
	@Override
	public List<CmmnVO> selectGoodsSeparate(String goodsGroup) {
		
		return sqlSession.selectList("selectGoodsSeparate", goodsGroup);
	}

}