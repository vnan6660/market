package com.dao.common;

import java.util.List;

import com.vo.common.CmmnVO;

/**
 * 공통 Dao
 * 생성자 : 김소연 
 * 생성일 : 2021.12.17
 */
public interface CommonDao {

	//공통코드 가져오기
	List<CmmnVO> selectCmmnCd();

}
