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

	// 주문상태 변경하기
	@Override
	public void updateOdState(Map<String, Object> searchMap) {
		// 체크박스에 체크된 checkList안의 갯수
		List<?> checkList = (List<?>) searchMap.get("checkList");
		for (int i = 0; i < checkList.size(); i++) {
			String checkedOdNo = (String) checkList.get(i);

			// TRANFER_INFO테이블에 checkedOdNo가 있는지 중복체크
			int hasodNo = orderListDao.hasOdNo(checkedOdNo);

			//발송완료버튼눌렀을때만 실행
			if("transferStart".equals(searchMap.get("nowOdState"))) {
				// 주문상태 변경하기
				if (hasodNo == 0) {
					// 중복되지않을때 실행
					orderListDao.insertTrDate(checkedOdNo);
				} 
			}
			
			searchMap.put("checkedOdNo", checkedOdNo);
			orderListDao.updateOdState(searchMap);
		}
	}

	//주문목록상세내역가져오기
	@Override
	public OrderWrapVO getOrderDetail(Map<String, Object> modleMap) {
		return orderListDao.selectOrderDetail(modleMap);
	}

}
