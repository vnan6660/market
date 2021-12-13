package com.service.login;

import java.util.Map;

import com.vo.login.JoinVO;

/**
 * 회원가입 Service
 * 생성자 : 김혜경 
 * 생성일 : 2021.12.13
 */
public interface JoinService {

	//회원가입 수행
	public void doJoin(Map<String, Object> param);

	//회원가입 id 중복체크
	public int idCheck(String csId);

	//회원가입 이메일 중복확인
	public int emailChk(JoinVO vo);

	

	


}