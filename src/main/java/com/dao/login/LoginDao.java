package com.dao.login;

import java.util.Map;

import com.vo.login.JoinVO;
import com.vo.login.LoginVO;

/**
 * 로그인 Dao
 * 생성자 : 김소연
 * 생성일 : 2021.11.30
 */
public interface LoginDao {

	/* 로그인하는 아이디 비밀번호체크*/
	int selectLoginCnt(LoginVO vo);
	
	/* 로그인 정보 가져오기 */
	LoginVO selectLogin(LoginVO vo);
	
	/**
	 * 회원가입 수행
	 * 생성자 : 김혜경
	 * 생성일 : 2021.12.06
	 */
//	void doJoin(JoinVO vo);
	void doJoin(Map<String, Object> param);
	
	/**
	 * 회원가입 id 중복체크
	 * 생성자 : 김혜경
	 * 생성일 : 2021.12.07
	 */
//	int idCheck(JoinVO vo);
	int idCheck(String csId);
	
	/**
	*회원가입 이메일 중복확인
	*생성자 : 김혜경
	*생성일 : 2021.12.07
	*/
	int emailChk(JoinVO vo);

	

	

	

}
