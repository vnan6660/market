package com.dao.adminGoodsMgt;

import java.util.List;

import com.vo.adminGoodsMgt.GoodsRegVO;
import com.vo.common.CmmnVO;

public interface GoodsRegDao {

	/* 상품 구분에 해당하는 상품 분류 가지고 오기 */
	List<CmmnVO> selectGoodsSeparate(String goodsGroup);

	//상품이미지,상세설명의 파일을 포함한 상품등록하기
	void insertGoodsReg(GoodsRegVO vo);

}
