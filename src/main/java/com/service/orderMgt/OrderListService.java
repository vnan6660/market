package com.service.orderMgt;

import java.util.List;
import java.util.Map;

import com.vo.common.SearchVO;
import com.vo.orderMgt.OrderWrapVO;

/**
 * 주문목록 Service 
 * 생성자 : 김소연	 
 * 생성일 : 2022.01.17
 */
public interface OrderListService {

	//주문목록가져오기
	List<OrderWrapVO> getOrderList(SearchVO searchVO);
	
	//검색글 카운트
	int getOrderListCount(SearchVO svo);

	// 주문상태,발송날짜 변경하기
	void updateOdState(Map<String, Object> searchMap);

	//주문목록상세내역가져오기
	OrderWrapVO getOrderDetail(Map<String, Object> modleMap);
	
}
