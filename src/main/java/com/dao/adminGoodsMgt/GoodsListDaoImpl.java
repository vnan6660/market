package com.dao.adminGoodsMgt;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vo.adminGoodsMgt.GoodsListVO;

/**
 * 물품목록 DaoImpl
 * 생성자 : 김소연 
 * 생성일 : 2021.12.16
 */

@Repository
public class GoodsListDaoImpl implements GoodsListDao {

	@Autowired
	SqlSession sqlSession;
	
	//물품목록리스트 가져오기
	@Override
	public List<GoodsListVO> selectGoodsList() {
		return sqlSession.selectList("selectGoodsList");
	}

	//하나의 물품정보 가져오기
	@Override
	public GoodsListVO selectDetailGoods(String gdNo) {
		return sqlSession.selectOne("selectDetailGoods",gdNo);
	}

}
