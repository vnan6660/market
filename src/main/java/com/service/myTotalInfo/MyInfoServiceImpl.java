package com.service.myTotalInfo;

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



}
