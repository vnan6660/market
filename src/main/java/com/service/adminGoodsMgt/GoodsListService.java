package com.service.adminGoodsMgt;

import java.util.List;

import com.vo.adminGoodsMgt.GoodsListVO;

/**
 * 물품목록 Service
 * 생성자 : 김소연 
 * 생성일 : 2021.12.16
 */

public interface GoodsListService {

	//물품목록리스트 가져오기
	List<GoodsListVO> getGoodsList();

	//하나의 물품정보 가져오기
	GoodsListVO getDetailGoods(String gdNo);


}
