package com.service.login;

import java.util.Map;

import com.vo.login.LoginVO;

/**
 * 로그인 Service
 * 생성자 : 김소연 
 * 생성일 : 2021.11.30
 */
public interface LoginService {

	String getLogin(LoginVO vo);

	//회원가입 수행
	public void doJoin(Map<String, Object> paramMap);


}
