package com.dao.myTotalInfo;

import java.util.Map;

import com.vo.csMgt.CsInfoVO;

public interface MyInfoDao {

	CsInfoVO myInfoPage(String csId);

	int pwChk(Map<String, Object> param);
	
	void doUpdateInfo(CsInfoVO vo);

}
