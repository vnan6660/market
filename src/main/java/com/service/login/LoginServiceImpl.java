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

	@Override
	public String getLogin(LoginVO vo) {
		int loginCnt = loginDao.selectLoginCnt(vo);
		
		//세션 구현하면 사용할 예정
		//LoginVO  loginInfo = loginDao.selectLogin(vo);
		
		String rtMsg = loginCnt > 0 ? "1" : "0";
		
		return rtMsg;
	}


}
