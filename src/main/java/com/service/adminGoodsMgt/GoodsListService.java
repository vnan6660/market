package com.service.adminGoodsMgt;

import java.util.ArrayList;
import java.util.List;

import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.adminGoodsMgt.GoodsRegVO;
import com.vo.common.CmmnVO;
import com.vo.common.SearchVO;

/**
 * 물품목록 Service
 * 생성자 : 김소연 
 * 생성일 : 2021.12.16
 */

public interface GoodsListService {

	//물품목록리스트 가져오기
	List<GoodsListVO> getGoodsList(SearchVO searchVO);
	
	// 상품 구분에 해당하는 상품 분류 가지고 오기
	List<CmmnVO> getGoodsSeparate(String goodsGroup);
		
	//상품이미지,상세설명의 파일을 포함한 상품등록하기
	void setGoodsReg(GoodsRegVO vo);

	//하나의 물품정보 가져오기
	GoodsListVO getDetailGoods(String gdNo);

	//물품상세 수정 하기
	void updateGoods(GoodsRegVO vo);

	//물품 삭제 하기
	void deleteGoods(ArrayList<String> delNoList);

	//물품 개시 하기
	void showGoods(ArrayList<String> showNoList);

	//검색글카운트
	int getGoodsListCount(SearchVO vo);

}
