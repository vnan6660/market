package com.dao.myTotalInfo;

import java.util.Map;

import com.vo.csMgt.CsInfoVO;

/**
 * 마이페이지 Dao
 * 생성자 : 김혜경
 * 생성일 : 2021.12.10
 *
 */
public interface MyInfoDao {

	//내정보 가져오기
	CsInfoVO myInfoPage(String csId);

	//비밀번호 확인페이지에서 세션의 비밀번호와 입력한 비밀번호가 같은지 체크
	int pwChk(Map<String, Object> param);
	
	//회원정보 수정 버튼을 눌렀을 때 회원정보 update
	void doUpdateInfo(CsInfoVO vo);

	//회원정보 수정 이메일 중복확인
	int infoEmailChk(CsInfoVO vo);

}
