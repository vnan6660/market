package com.dao.userBook;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.common.SearchVO;

@Repository
public class NewBookDaoImpl implements NewBookDao{

	@Autowired
	SqlSession sqlSession;

	//목록 페이지//
	//신간도서 이미지 리스트 개수 가져오기
	@Override
	public int getNbListCount(SearchVO svo) {
		return sqlSession.selectOne("getNbListCount",svo);
	}

	//신간도서 이미지 리스트 가져오기
	@Override
	public List<GoodsListVO> getNbList(SearchVO searchVO) {
		return sqlSession.selectList("getNbList",searchVO);
	}
	

	
	

}
