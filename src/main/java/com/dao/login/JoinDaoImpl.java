package com.dao.login;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vo.login.JoinVO;

/**
 * 회원가입 DaoImpl
 * 생성자 : 김혜경
 * 생성일 : 2021.12.13
 */
@Repository
public class JoinDaoImpl implements JoinDao {

	@Autowired
	SqlSession sqlSession;

	//회원가입 수행
	@Override
	public void doJoin(Map<String, Object> param) {
		sqlSession.insert("doJoin", param);
	}
	
	//회원가입 id 중복체크
	@Override
	public int idCheck(String csId) {
		//LIST선택이 아니니깐 SelectOne으로
		//idCheck라는 이름으로 loginMapper에 넘긴다.
		int result = sqlSession.selectOne("idCheck", csId);
		return result;
	}
	
	//이메일 id 중복체크
	@Override
	public int emailChk(JoinVO vo) {
		//LIST선택이 아니니깐 SelectOne으로
		//emailChk라는 이름으로 loginMapper에 넘긴다.
		int result = sqlSession.selectOne("emailChk", vo);
		return result;
	}

	

	

	

	

}
