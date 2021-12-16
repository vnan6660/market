package com.service.myTotalInfo;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.myTotalInfo.MyInfoDao;
import com.vo.csMgt.CsInfoVO;

@Service
public class MyInfoServiceImpl implements MyInfoService{

	@Autowired
	private MyInfoDao myInfoDao;
	
	@Override
	public CsInfoVO myInfoPage(String csId) {
		return myInfoDao.myInfoPage(csId);
	}

	@Override
	public int pwChk(Map<String, Object> param) {
		int result = myInfoDao.pwChk(param);
		return result;
	}
	
	@Override
	public void doUpdateInfo(CsInfoVO vo) {
		myInfoDao.doUpdateInfo(vo);		
	}

	@Override
	public int infoEmailChk(CsInfoVO vo) {
		int result = myInfoDao.infoEmailChk(vo);
		return result;
	}


	

	




}
