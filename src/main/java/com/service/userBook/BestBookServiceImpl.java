package com.service.userBook;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.userBook.BestBookDao;
import com.vo.adminGoodsMgt.GoodsListVO;


/**
 * 베스트도서 ServiceImpl
 * 생성자 : 김혜경 
 * 생성일 : 2021.12.13
 */
@Service
public class BestBookServiceImpl implements BestBookService {

	@Autowired
	private BestBookDao bestBookDao;

	//베스트 도서 이미지 리스트 가져오기
	@Override
	public List<GoodsListVO> getBestBook() {
		return bestBookDao.getBestBook();
	}

	
	

	
	
}
