package com.dao.login;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vo.login.JoinVO;
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

	@Override
	public int selectLoginCnt(LoginVO vo) {
		return sqlSession.selectOne("selectLoginCnt", vo);
	}

	@Override
	public LoginVO selectLogin(LoginVO vo) {
		return sqlSession.selectOne("selectLogin", vo);
	}

	/**
	 * 회원가입 수행
	 * 생성자 : 김혜경
	 * 생성일 : 2021.12.06
	 */
	@Override
	public void doJoin(JoinVO vo) {
		sqlSession.insert("doJoin", vo);
	}

	/**
	 * 회원가입 id 중복체크
	 * 생성자 : 김혜경
	 * 생성일 : 2021.12.07
	 */
	@Override
	public int idCheck(JoinVO vo) {
		int result = sqlSession.selectOne("idCheck", vo);
		return result;
	}


	

}
