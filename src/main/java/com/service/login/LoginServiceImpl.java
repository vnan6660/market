package com.service.login;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.login.LoginDao;
import com.vo.login.JoinVO;
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

	/**
	 * 회원가입 수행
	 * 생성자 : 김혜경
	 * 생성일 : 2021.12.06
	 */
//	@Override
//	public void doJoin(JoinVO vo) {
//		loginDao.doJoin(vo);
//	}
	@Override
	public void doJoin(Map<String, Object> param) {
		loginDao.doJoin(param);
	}
	
	/**
	 * 회원가입 id 중복체크
	 * 생성자 : 김혜경
	 * 생성일 : 2021.12.07
	 */
//	@Override
//	public int idCheck(JoinVO vo) {
//		int result = loginDao.idCheck(vo); //loginDao로 넘겨라
//		return result;
//	}
	@Override
	public int idCheck(String csId) {
		int result = loginDao.idCheck(csId); //loginDao로 넘겨라
		return result;
	}
	
	/**
	*회원가입 이메일 중복확인
	*생성자 : 김혜경
	*생성일 : 2021.12.07
	*/
	@Override
	public int emailChk(JoinVO vo) {
		int result = loginDao.emailChk(vo); //loginDao로 넘겨라
		return result;
	}

	

	

	
}
