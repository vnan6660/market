package com.service.myTotalInfo;

import java.util.Map;

import com.vo.csMgt.CsInfoVO;

/**
 * 마이페이지 Controller
 * 생성자 : 김혜경
 * 생성일 : 2021.12.10
 *
 */
public interface MyInfoService {

	CsInfoVO myInfoPage(String csId);

	int pwChk(Map<String, Object> param);

	void doUpdateInfo(CsInfoVO vo);

	int infoEmailChk(CsInfoVO vo);

	

}
