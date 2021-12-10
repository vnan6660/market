package com.service.csMgt;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.csMgt.CsInfoDao;
import com.vo.common.SearchVO;
import com.vo.csMgt.CsInfoVO;

/**
 * 고객정보 ServiceImpl
 * 생성자 : 김소연 
 * 생성일 : 2021.12.09
 */
@Service
public class CsInfoServiceImpl implements CsInfoService {

	@Autowired
	private CsInfoDao csInfoDao;

	/* 고객정보 검색글카운트 */
	@Override
	public int getcsInfoCount(SearchVO vo) {
		return csInfoDao.selectCsInfoCount(vo);
	}
	
	/* 고객정보 가져오기 */
	@Override
	public List<CsInfoVO> getCsInfo() {
		return csInfoDao.selectCsInfo();
	}

	/* csNo에 맞는 고객정보 가져오기 */
	@Override
	public CsInfoVO getDetailCsInfo(String csNo) {
		return csInfoDao.selectDetailCsInfo(csNo);
	}
	
}
