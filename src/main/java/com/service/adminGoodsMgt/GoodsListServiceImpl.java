package com.service.adminGoodsMgt;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.adminGoodsMgt.GoodsListDao;
import com.vo.adminGoodsMgt.GoodsListVO;

/**
 * 물품목록 ServiceImpl
 * 생성자 : 김소연 
 * 생성일 : 2021.12.16
 */

@Service
public class GoodsListServiceImpl implements GoodsListService {

	@Autowired
	private GoodsListDao goodsListDao;
	
	//물품목록리스트 가져오기
	@Override
	public List<GoodsListVO> getGoodsList() {
		return goodsListDao.selectGoodsList();
	}

	//하나의 물품정보 가져오기
	@Override
	public GoodsListVO getDetailGoods(String gdNo) {
		return  goodsListDao.selectDetailGoods(gdNo);
	}

}
