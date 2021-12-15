package com.service.adminGoodsMgt;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.adminGoodsMgt.GoodsRegDao;
import com.vo.adminGoodsMgt.GoodsRegVO;
import com.vo.common.CmmnVO;

@Service
public class GoodsRegServiceImpl implements GoodsRegService {

	
	@Autowired
	private GoodsRegDao goodsRegDao;
	
	/* 상품 구분에 해당하는 상품 분류 가지고 오기 */
	@Override
	public List<CmmnVO> getGoodsSeparate(String goodsGroup) {
		
		return goodsRegDao.selectGoodsSeparate(goodsGroup);
	}

	//상품이미지,상세설명의 파일을 포함한 상품등록하기
	@Override
	public void setGoodsReg(GoodsRegVO vo) {
		goodsRegDao.insertGoodsReg(vo);
	}

}
