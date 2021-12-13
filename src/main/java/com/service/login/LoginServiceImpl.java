package com.service.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.login.LoginDao;
import com.vo.login.LoginVO;

/**
 * 로그인 ServiceImpl 생성자 : 김소연 생성일 : 2021.11.30
 */
@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	private LoginDao loginDao;

	/* 로그인하는 아이디 비밀번호체크*/
	@Override
	public String getLoginCnt(LoginVO vo) {
		int loginCnt = loginDao.selectLoginCnt(vo);
		String rtMsg = loginCnt > 0 ? "1" : "0";
		
		return rtMsg;
	}

	/* 로그인 정보 가져오기 */
	@Override
	public LoginVO getLogin(LoginVO vo) {
		return loginDao.selectLogin(vo);
	}
	
}
