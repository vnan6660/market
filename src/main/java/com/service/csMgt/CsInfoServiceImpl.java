package com.service.csMgt;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.csMgt.CsInfoDao;
import com.vo.common.SearchVO;
import com.vo.csMgt.CsInfoVO;
import com.vo.orderInfo.OrderInfoVO;

/**
 * 고객정보 ServiceImpl
 * 생성자 : 김소연 
 * 생성일 : 2021.12.22
 */
@Service
public class CsInfoServiceImpl implements CsInfoService {

	@Autowired
	private CsInfoDao csInfoDao;

	//고객정보 검색글카운트 
	@Override
	public int getcsInfoCount(SearchVO vo) {
		return csInfoDao.selectCsInfoCount(vo);
	}
	
	//고객정보 가져오기 
	@Override
	public List<CsInfoVO> getCsInfo(SearchVO searchVO) {
		return csInfoDao.selectCsInfo(searchVO);
	}

	//csNo에 맞는 고객정보 가져오기 
	@Override
	public CsInfoVO getDetailCsInfo(String csNo) {
		return csInfoDao.selectDetailCsInfo(csNo);
	}

	//구매이력가져오기
	@Override
	public List<OrderInfoVO> getOrderHistory(SearchVO vo) {
		return csInfoDao.selectOrderHistory(vo);
	}

	//고객 구매이력 카운트
	@Override
	public int getOdHistoryCount(SearchVO vo) {
		return csInfoDao.selectOdHistoryCount(vo);
	}
	
}
