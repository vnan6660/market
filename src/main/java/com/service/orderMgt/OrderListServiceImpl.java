package com.service.orderMgt;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.orderMgt.OrderListDao;
import com.vo.common.SearchVO;
import com.vo.orderMgt.OrderWrapVO;
/**
 * 주문목록 ServiceImpl
 * 생성자 : 김소연	 
 * 생성일 : 2022.01.17
 */
@Service
public class OrderListServiceImpl implements OrderListService {

	@Autowired
	private OrderListDao orderListDao;

	// 주문목록가져오기
	@Override
	public List<OrderWrapVO> getOrderList(SearchVO searchVO) {
		return orderListDao.selectMyOrderList(searchVO);
	}

	// 검색글 카운트
	@Override
	public int getOrderListCount(SearchVO svo) {
		return orderListDao.selectOrderListCount(svo);
	}

	// 주문상태,발송날짜 변경하기
	@Override
	public void updateOdState(Map<String, Object> searchMap) {
		// 체크박스에 체크된 checkList안의 갯수
		List<?> checkList = (List<?>) searchMap.get("checkList");
		for (int i = 0; i < checkList.size(); i++) {
			String checkedOdNo = (String) checkList.get(i);
			searchMap.put("checkedOdNo", checkedOdNo);
			
			orderListDao.updateOdState(searchMap);
		}
	}

	// 주문목록상세내역가져오기
	@Override
	public OrderWrapVO getOrderDetail(Map<String, Object> modleMap) {
		return orderListDao.selectOrderDetail(modleMap);
	}

}
