package com.service.csMgt;

import java.util.List;

import com.vo.common.SearchVO;
import com.vo.csMgt.CsInfoVO;

/**
 * 고객정보 Service
 * 생성자 : 김소연 
 * 생성일 : 2021.12.09
 */
public interface CsInfoService {

	/* 고객정보 검색글카운트 */
	int getcsInfoCount(SearchVO vo);
	
	/* 고객정보 가져오기 */
	List<CsInfoVO> getCsInfo(SearchVO searchVO);

	/* csNo에 맞는 고객정보 가져오기 */
	CsInfoVO getDetailCsInfo(String csNo);

}
