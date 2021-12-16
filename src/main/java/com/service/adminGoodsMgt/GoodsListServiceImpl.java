package com.service.adminGoodsMgt;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.adminGoodsMgt.GoodsListDao;
import com.vo.adminGoodsMgt.GoodsListVO;

@Service
public class GoodsListServiceImpl implements GoodsListService {

	@Autowired
	private GoodsListDao goodsListDao;
	
	@Override
	public List<GoodsListVO> getImg() {
		return goodsListDao.selectImg();
	}

}
