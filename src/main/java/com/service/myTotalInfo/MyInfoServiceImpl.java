package com.service.myTotalInfo;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.myTotalInfo.MyInfoDao;
import com.vo.csMgt.CsInfoVO;

/**
 * 마이페이지 ServiceImpl
 * 생성자 : 김혜경
 * 생성일 : 2021.12.10
 *
 */
@Service
public class MyInfoServiceImpl implements MyInfoService{

	@Autowired
	private MyInfoDao myInfoDao;
	
	//내정보 가져오기
	@Override
	public CsInfoVO myInfoPage(String csId) {
		return myInfoDao.myInfoPage(csId);
	}

	//비밀번호 확인페이지에서 세션의 비밀번호와 입력한 비밀번호가 같은지 체크
	@Override
	public int pwChk(Map<String, Object> param) {
		int result = myInfoDao.pwChk(param);
		return result;
	}
	
	//회원정보 수정 버튼을 눌렀을 때 회원정보 update
	@Override
	public void doUpdateInfo(CsInfoVO vo) {
		myInfoDao.doUpdateInfo(vo);		
	}

	//회원정보 수정 이메일 중복확인
	@Override
	public int infoEmailChk(CsInfoVO vo) {
		int result = myInfoDao.infoEmailChk(vo);
		return result;
	}


	

	




}
