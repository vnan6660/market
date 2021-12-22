package com.service.userBook;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.userBook.NewBookDao;
import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.common.SearchVO;


/**
 * 신간도서 ServiceImpl
 * 생성자 : 김혜경 
 * 생성일 : 2021.12.22
 */
@Service
public class NewBookServiceImpl implements NewBookService {

	@Autowired
	private NewBookDao newBookDao;

	//신간도서 이미지 리스트 개수 가져오기
	@Override
	public int getNbListCount(SearchVO svo) {
		return newBookDao.getNbListCount(svo);
	}

	//신간도서 이미지 리스트 가져오기
	@Override
	public List<GoodsListVO> getNbList(SearchVO searchVO) {
		return newBookDao.getNbList(searchVO);
	}

	
	





}
