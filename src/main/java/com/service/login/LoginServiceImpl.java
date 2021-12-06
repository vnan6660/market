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

	@Override
	public String getLogin(LoginVO vo) {
		int loginCnt = loginDao.selectLoginCnt(vo);
		
		//세션 구현하면 사용할 예정
		//LoginVO  loginInfo = loginDao.selectLogin(vo);
		
		String rtMsg = loginCnt > 0 ? "1" : "0";
		
		return rtMsg;
	}

	//회원가입 수행
	@Override
	public void doJoin(Map<String, Object> paramMap) {
		JoinVO vo = new JoinVO();
		vo.setCsGrade("csNomal");
		vo.setCsId((String) paramMap.get("csId"));
		vo.setCsPs((String) paramMap.get("csPs"));
		vo.setCsNm((String) paramMap.get("csNm"));
		vo.setCsPhoneOne((String) paramMap.get("csPhoneOne"));
		vo.setCsPhoneTwo((String) paramMap.get("csPhoneTwo"));
		vo.setCsPhoneThree((String) paramMap.get("csPhoneThree"));
		vo.setCsEmailOne((String) paramMap.get("csEmailOne"));
		vo.setCsEmailTwo((String) paramMap.get("csEmailTwo"));
		vo.setCsAddrOne((String) paramMap.get("csAddrOne"));
		vo.setCsAddrTwo((String) paramMap.get("csAddrTwo"));
		loginDao.doJoin(vo);
	}


}
