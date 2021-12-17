package com.service.common;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.common.CommonDao;
import com.vo.common.CmmnVO;


/**
 * 공통 ServiceImpl
 * 생성자 : 김소연 
 * 생성일 : 2021.12.17
 */
@Service
public class CommonServiceImpl implements CommonService {

	@Autowired
	private CommonDao commonDao;

	//공통코드 가져오기
	@Override
	public List<CmmnVO> getCmmnCd() {
		return commonDao.selectCmmnCd();
	}
}
