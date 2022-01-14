package com.service.myTotalInfo;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.myTotalInfo.MyOrderDao;
import com.vo.common.SearchVO;
import com.vo.orderInfo.OrderInfoVO;
/**
 * 주문정보 ServiceImpl 
 * 생성자 : 김소연	 
 * 생성일 : 2022.01.13
 */
@Service
public class MyOrderServiceImpl implements MyOrderService {

	@Autowired
	private MyOrderDao myOrderDao;
	
	//주문정보가져오기
	@Override
	public List<OrderInfoVO> getMyOrderInfo(SearchVO searchVO) {
		return myOrderDao.selectMyOrderInfo(searchVO);
	}

	//검색글 카운트
	@Override
	public int getMyOrderListCount(SearchVO svo) {
		return myOrderDao.selectMyorderListCount(svo);
	}

	//주문상세내역가져오기
	@Override
	public OrderInfoVO getMyOrderDetail(Map<String, Object> param) {
		return myOrderDao.selectMyOrderDetail(param);
	}

}
