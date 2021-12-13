package com.service.login;

import com.vo.login.LoginVO;

/**
 * 로그인 Service
 * 생성자 : 김소연 
 * 생성일 : 2021.11.30
 */
public interface LoginService {

	/* 로그인하는 아이디 비밀번호체크*/
	String getLoginCnt(LoginVO vo);
	
	/* 로그인 정보 가져오기 */
	LoginVO getLogin(LoginVO vo);

}
