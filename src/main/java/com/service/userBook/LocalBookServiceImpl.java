package com.service.userBook;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.userBook.LocalBookDao;
import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.common.SearchVO;


/**
 * 국내도서 ServiceImpl
 * 생성자 : 김혜경 
 * 생성일 : 2021.12.22
 */
@Service
public class LocalBookServiceImpl implements LocalBookService {

	@Autowired
	private LocalBookDao localBookDao;

	//이미지 리스트 가져오기
	@Override
	public List<GoodsListVO> getLbList(SearchVO searchVO) {
		return localBookDao.getLbList(searchVO);
	}
	
	//검색한 결과의 수를 가져오기
	@Override
	public int getLbListCount(SearchVO svo) {
		return localBookDao.getLbListCount(svo);
	}


	
	





}
