package com.dao.orderMgt;

import java.util.List;
import java.util.Map;

import com.vo.common.SearchVO;
import com.vo.orderMgt.OrderWrapVO;

/**
 * 주문목록 Dao 
 * 생성자 : 김소연	 
 * 생성일 : 2022.01.17
 */
public interface OrderListDao {

	//주문목록가져오기
	List<OrderWrapVO> selectMyOrderList(SearchVO searchVO);

	//검색글 카운트
	int selectOrderListCount(SearchVO svo);

	//주문상태 변경하기
	Object updateOdState(Map<String, Object> searchMap);

	//배송날쩌 업데이트하기
	void updateTrDate(String checkedOdNo);

	//주문목록상세내역가져오기
	OrderWrapVO selectOrderDetail(Map<String, Object> modleMap);

}
