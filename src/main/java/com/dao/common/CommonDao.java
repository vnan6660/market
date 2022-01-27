package com.dao.common;

import java.util.List;
import java.util.Map;

import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.common.CmmnVO;
import com.vo.common.OrderVO;

/**
 * 공통 Dao
 * 생성자 : 김소연 
 * 생성일 : 2021.12.17
 */
public interface CommonDao {

	//공통코드 가져오기
	List<CmmnVO> selectCmmnCd();

	//주문량,판매금액 불러오기
	OrderVO selectOrderAmtQty(Map<String, Object> param);

	//베스트 셀러 불러오기
	List<GoodsListVO> selectBestSeller();


}
