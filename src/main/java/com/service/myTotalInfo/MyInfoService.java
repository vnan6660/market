package com.service.myTotalInfo;

import com.vo.csMgt.CsInfoVO;

/**
 * 마이페이지 Controller
 * 생성자 : 김혜경
 * 생성일 : 2021.12.10
 *
 */
public interface MyInfoService {

	CsInfoVO myInfoPage(String csId);

	void doUpdateInfo(CsInfoVO vo);



}
