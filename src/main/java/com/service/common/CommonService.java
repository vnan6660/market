package com.service.common;

import java.util.ArrayList;
import java.util.List;

import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.common.CmmnVO;
import com.vo.common.OrderVO;

/**
 * 공통 Service
 * 생성자 : 김소연 
 * 생성일 : 2021.12.17
 */
public interface CommonService {

	//공통코드 가져오기
	List<CmmnVO> getCmmnCd();

	//금주 주문량,판매금액 불러오기
	List<OrderVO> getThisWeekOrder(ArrayList<String> dateList);

	//이번년도 주문량,판매금액 불러오기
	List<OrderVO> getThisYearOrder();

	//베스트 셀러 불러오기
	List<GoodsListVO> getBestSeller();
}
