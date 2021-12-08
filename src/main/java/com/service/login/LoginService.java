package com.service.login;

import com.vo.login.JoinVO;
import com.vo.login.LoginVO;

/**
 * 로그인 Service
 * 생성자 : 김소연 
 * 생성일 : 2021.11.30
 */
public interface LoginService {

	String getLogin(LoginVO vo);

	/**
	 * 회원가입 수행
	 * 생성자 : 김혜경
	 * 생성일 : 2021.12.06
	 */
	public void doJoin(JoinVO vo);

	/**
	 * 회원가입 id 중복체크
	 * 생성자 : 김혜경
	 * 생성일 : 2021.12.07
	 */
	int idCheck(JoinVO vo);

	/**
	*회원가입 이메일 중복확인
	*생성자 : 김혜경
	*생성일 : 2021.12.07
	*/
	int emailChk(JoinVO vo);


}
