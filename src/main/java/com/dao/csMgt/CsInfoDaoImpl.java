package com.dao.csMgt;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vo.common.SearchVO;
import com.vo.csMgt.CsInfoVO;

/**
 * 고객정보 DaoImpl
 * 생성자 : 김소연 
 * 생성일 : 2021.12.09
 */
@Repository
public class CsInfoDaoImpl implements CsInfoDao {

	@Autowired
	private SqlSession sqlSession;

	/* 고객정보 검색글카운트 */
	@Override
	public int selectCsInfoCount(SearchVO vo) {
		return sqlSession.selectOne("selectCsInfoCount", vo);
	}
	
	/* 고객정보 가져오기 */
	@Override
	public List<CsInfoVO> selectCsInfo(SearchVO searchVO) {
		return sqlSession.selectList("selectCsInfo",searchVO);
	}

	/* csNo에 맞는 고객정보 가져오기 */
	@Override
	public CsInfoVO selectDetailCsInfo(String csNo) {
		return sqlSession.selectOne("selectDetailCsInfo", csNo);
	}

}
