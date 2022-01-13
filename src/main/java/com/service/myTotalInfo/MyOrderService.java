package com.service.myTotalInfo;

import java.util.List;

import com.vo.common.SearchVO;
import com.vo.orderInfo.OrderInfoVO;

/**
 * 주문정보 Service 
 * 생성자 : 김소연	 
 * 생성일 : 2022.01.13
 */
public interface MyOrderService {
	
	//주문정보가져오기
	List<OrderInfoVO> getMyOrderInfo(SearchVO searchVO);
	
	//검색글 카운트
	int getMyOrderListCount(SearchVO svo);

}
