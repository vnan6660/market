package com.dao.login;

import com.vo.login.LoginVO;

/**
 * 로그인 Dao
 * 생성자 : 김소연
 * 생성일 : 2021.11.30
 */
public interface LoginDao {

	int selectLoginCnt(LoginVO vo);

	LoginVO selectLogin(LoginVO vo);

	

	

}
