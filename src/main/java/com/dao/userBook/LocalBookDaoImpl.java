package com.dao.userBook;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.common.SearchVO;

@Repository
public class LocalBookDaoImpl implements LocalBookDao{

	@Autowired
	SqlSession sqlSession;

	//이미지 리스트 가져오기
	@Override
	public List<GoodsListVO> getLbList(SearchVO searchVO) {
		return sqlSession.selectList("getLbList",searchVO);

	}

	//검색한 결과의 수를 가져오기
	@Override
	public int getLbListCount(SearchVO svo) {
		return sqlSession.selectOne("getLbListCount",svo);

	}

	

	
	

}
