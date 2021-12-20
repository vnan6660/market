package com.dao.login;

import java.util.Map;

import com.vo.login.JoinVO;

/**
 * 회원가입 Dao
 * 생성자 : 김혜경
 * 생성일 : 2021.12.13
 */
public interface JoinDao {

	//회원가입 수행
	void doJoin(Map<String, Object> param);
	
	//회원가입id 중복체크
	int idCheck(String csId);
	
	//회원가입 이메일 중복확인
	int emailChk(JoinVO vo);

	

	

	

	

}
