package com.service.adminGoodsMgt;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.adminGoodsMgt.GoodsListDao;
import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.adminGoodsMgt.GoodsRegVO;
import com.vo.common.CmmnVO;

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

	/* 상품 구분에 해당하는 상품 분류 가지고 오기 */
	@Override
	public List<CmmnVO> getGoodsSeparate(String goodsGroup) {
		return goodsListDao.selectGoodsSeparate(goodsGroup);
	}
	
	//상품이미지,상세설명의 파일을 포함한 상품등록하기
	@Override
	public void setGoodsReg(GoodsRegVO vo) {
		goodsListDao.insertGoodsReg(vo);
		
	}
	
	//하나의 물품정보 가져오기
	@Override
	public GoodsListVO getDetailGoods(String gdNo) {
		return  goodsListDao.selectDetailGoods(gdNo);
	}

	//물품상세 수정 하기
	@Override
	public void updateGoods(GoodsRegVO vo) {
		goodsListDao.updateGoods(vo);
	}

	//물품 삭제 하기
	@Override
	public void deleteGoods(ArrayList<String> delNoList) {
		goodsListDao.deleteGoods(delNoList);
	}

	//물품 개시 하기
	@Override
	public void showGoods(ArrayList<String> showNoList) {
		if (showNoList != null) {
			goodsListDao.showGoodsTrue(showNoList);
		}
		goodsListDao.showGoodsFalse(showNoList);
	}
	
}
