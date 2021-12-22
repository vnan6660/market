package com.dao.csMgt;

import java.util.List;

import com.vo.common.SearchVO;
import com.vo.csMgt.CsInfoVO;
import com.vo.orderInfo.OrderInfoVO;

/**
 * 고객정보 Dao
 * 생성자 : 김소연 
 * 생성일 : 2021.12.22
 */
public interface CsInfoDao {

	//고객정보 검색글카운트 
	int selectCsInfoCount(SearchVO vo);
	
	//고객정보 가져오기 
	List<CsInfoVO> selectCsInfo(SearchVO searchVO);

	//csNo에 맞는 고객정보 가져오기 
	CsInfoVO selectDetailCsInfo(String csNo);
	
	//구매이력가져오기
	List<OrderInfoVO> selectOrderHistory(SearchVO vo);

	//고객 구매이력 카운트
	int selectOdHistoryCount(SearchVO vo);
}
