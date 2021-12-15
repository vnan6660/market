package com.dao.myTotalInfo;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vo.csMgt.CsInfoVO;

@Repository
public class MyInfoDaoImpl implements MyInfoDao{

	@Autowired
	SqlSession sqlSession;

	@Override
	public CsInfoVO myInfoPage(String csId) {
		return sqlSession.selectOne("myInfoPage", csId);
	}
	
	@Override
	public int pwChk(Map<String, Object> param) {
		int result = sqlSession.selectOne("pwChk",param);
		return result;
	}

	@Override
	public void doUpdateInfo(CsInfoVO vo) {
		sqlSession.update("doUpdateInfo", vo);
	}

}
