package com.service.userBook;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.userBook.BestBookDao;
import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.common.SearchVO;


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
	public List<GoodsListVO> getBestBook(SearchVO searchVO) {
		return bestBookDao.getBestBook(searchVO);
	}

	//검색한 결과의 수를 가져오기
	@Override
	public int getBbListCount(SearchVO vo) {
		return bestBookDao.getBbListCount(vo);
	}
	
	//상세페이지에 해당하는 책의 정보 가져오기
	@Override
	public GoodsListVO getBestDtl(String gdNo) {
		return bestBookDao.getBestDtl(gdNo);
	}




}
