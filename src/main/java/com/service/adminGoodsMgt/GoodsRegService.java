package com.service.adminGoodsMgt;

import java.util.List;

import com.vo.common.CmmnVO;

public interface GoodsRegService {

	/* 상품 구분에 해당하는 상품 분류 가지고 오기 */
	List<CmmnVO> getGoodsSeparate(String goodsGroup);

}
