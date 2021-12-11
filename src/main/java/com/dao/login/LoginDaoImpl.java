package com.dao.login;

import java.util.Map;

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

	/**
	 * 회원가입 수행
	 * 생성자 : 김혜경
	 * 생성일 : 2021.12.06
	 */
//	@Override
//	public void doJoin(JoinVO vo) {
//		sqlSession.insert("doJoin", vo);
//	}
	@Override
	public void doJoin(Map<String, Object> param) {
		sqlSession.insert("doJoin", param);
	}
	
	/**
	 * 회원가입 id 중복체크
	 * 생성자 : 김혜경
	 * 생성일 : 2021.12.07
	 */
//	@Override
//	public int idCheck(JoinVO vo) {
//		//LIST선택이 아니니깐 SelectOne으로
//		//idCheck라는 이름으로 loginMapper에 넘긴다.
//		int result = sqlSession.selectOne("idCheck", vo);
//		return result;
//	}
	@Override
	public int idCheck(String csId) {
		//LIST선택이 아니니깐 SelectOne으로
		//idCheck라는 이름으로 loginMapper에 넘긴다.
		int result = sqlSession.selectOne("idCheck", csId);
		return result;
	}
	
	@Override
	public int emailChk(JoinVO vo) {
		//LIST선택이 아니니깐 SelectOne으로
		//emailChk라는 이름으로 loginMapper에 넘긴다.
		int result = sqlSession.selectOne("emailChk", vo);
		return result;
	}

	

	

	

}
