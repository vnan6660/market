package com.service.userBook;

import java.util.List;

import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.common.SearchVO;

/**
 * 회원가입 Service
 * 생성자 : 김혜경 
 * 생성일 : 2021.12.13
 */
public interface NewBookService {
	
	//신간도서 이미지 리스트 개수 가져오기
	int getNbListCount(SearchVO svo);

	//신간도서 이미지 리스트 가져오기
	List<GoodsListVO> getNbList(SearchVO searchVO);

	

	



}