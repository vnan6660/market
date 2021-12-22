package com.dao.userBook;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.common.SearchVO;

@Repository
public class BestBookDaoImpl implements BestBookDao{

	@Autowired
	SqlSession sqlSession;
	
	//목록 페이지//
	//베스트 도서 이미지 리스트 가져오기
	@Override
	public List<GoodsListVO> getBestBook(SearchVO searchVO) {
		return sqlSession.selectList("getBestBook",searchVO);
	}

	
	//검색한 결과의 수를 가져오기
	@Override
	public int getBbListCount(SearchVO vo) {
		return sqlSession.selectOne("getBbListCount",vo);
	}
	
	
	
	
	
	//상세 페이지//
	//선택된 베스트 도서 정보 가져오기
	@Override
	public GoodsListVO getBestDtl(String gdNo) {
		return sqlSession.selectOne("getBestDtl", gdNo);
	}

	

}
