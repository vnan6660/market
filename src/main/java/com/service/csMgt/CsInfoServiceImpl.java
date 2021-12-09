package com.service.csMgt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.csMgt.CsInfoDao;

/**
 * 고객정보 ServiceImpl
 * 생성자 : 김소연 
 * 생성일 : 2021.12.09
 */
@Service
public class CsInfoServiceImpl implements CsInfoService {

	@Autowired
	private CsInfoDao csInfoDao;
}
