package com.dao.login;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vo.login.LoginVO;

/**
 * 로그인 DaoImpl
 * 생성자 : 김소연
 * 생성일 : 2021.11.30
 */
@Repository
public class LoginDaoImpl implements LoginDao {

	@Autowired
	SqlSession sqlSession;

	/* 로그인하는 아이디 비밀번호체크*/
	@Override
	public int selectLoginCnt(LoginVO vo) {
		return sqlSession.selectOne("selectLoginCnt", vo);
	}

	/* 로그인 정보 가져오기 */
	@Override
	public LoginVO selectLogin(LoginVO vo) {
		return sqlSession.selectOne("selectLogin", vo);
	}
	
}
