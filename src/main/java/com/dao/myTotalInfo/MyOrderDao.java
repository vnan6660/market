package com.dao.myTotalInfo;

import java.util.List;

import com.vo.common.SearchVO;
import com.vo.orderInfo.OrderInfoVO;

/**
 * 주문정보 Dao 
 * 생성자 : 김소연	 
 * 생성일 : 2022.01.13
 */
public interface MyOrderDao {

	//주문정보가져오기
	List<OrderInfoVO> selectMyOrderInfo(SearchVO searchVO);

	//검색글 카운트
	int selectMyorderListCount(SearchVO svo);
	

}
