package com.service.csMgt;

import java.util.List;

import com.vo.common.SearchVO;
import com.vo.csMgt.CsInfoVO;
import com.vo.orderInfo.OrderInfoVO;

/**
 * 고객정보 Service
 * 생성자 : 김소연 
 * 생성일 : 2021.12.22
 */
public interface CsInfoService {

	//고객정보 검색글카운트
	int getcsInfoCount(SearchVO vo);
	
	//고객정보 가져오기
	List<CsInfoVO> getCsInfo(SearchVO searchVO);

	//csNo에 맞는 고객정보 가져오기
	CsInfoVO getDetailCsInfo(String csNo);

	//구매이력가져오기
	List<OrderInfoVO> getOrderHistory(SearchVO vo);

	//고객 구매이력 카운트
	int getOdHistoryCount(SearchVO vo);

}
