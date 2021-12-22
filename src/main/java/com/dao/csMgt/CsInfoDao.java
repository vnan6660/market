package com.dao.csMgt;

import java.util.List;

import com.vo.common.SearchVO;
import com.vo.csMgt.CsInfoVO;

/**
 * 고객정보 Dao
 * 생성자 : 김소연 
 * 생성일 : 2021.12.09
 */
public interface CsInfoDao {

	/* 고객정보 검색글카운트 */
	int selectCsInfoCount(SearchVO vo);
	
	/* 고객정보 가져오기 */
	List<CsInfoVO> selectCsInfo(SearchVO searchVO);

	/* csNo에 맞는 고객정보 가져오기 */
	CsInfoVO selectDetailCsInfo(String csNo);
}
