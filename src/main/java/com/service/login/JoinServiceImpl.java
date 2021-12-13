package com.service.login;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.login.JoinDao;
import com.vo.login.JoinVO;

/**
 * 회원가입 ServiceImpl
 * 생성자 : 김혜경 
 * 생성일 : 2021.12.13
 */
@Service
public class JoinServiceImpl implements JoinService {

	@Autowired
	private JoinDao joinDao;
	
	//회원가입 수행
	@Override
	public void doJoin(Map<String, Object> param) {
		joinDao.doJoin(param);
	}

	//회원가입 id 중복체크
	@Override
    public int idCheck(String csId) {
        int result = joinDao.idCheck(csId); //loginDao로 넘겨라
        return result;
	}

	//회원가입 이메일 중복확인
	@Override
    public int emailChk(JoinVO vo) {
		 int result = joinDao.emailChk(vo); //loginDao로 넘겨라
        return result;
	}
	
}
