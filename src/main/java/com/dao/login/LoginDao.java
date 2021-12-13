package com.dao.login;

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
	
}
