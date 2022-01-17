package com.service.orderMgt;

import java.util.List;

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
	
}
