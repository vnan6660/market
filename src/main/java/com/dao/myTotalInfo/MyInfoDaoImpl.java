package com.dao.myTotalInfo;

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


	

}
