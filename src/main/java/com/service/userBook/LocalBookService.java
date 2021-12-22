package com.service.userBook;

import java.util.List;

import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.common.SearchVO;

/**
 * 국내도서 Service
 * 생성자 : 김혜경 
 * 생성일 : 2021.12.13
 */
public interface LocalBookService {
	
	//이미지 리스트 가져오기
	List<GoodsListVO> getLbList(SearchVO searchVO);

	//검색한 결과의 수를 가져오기
	int getLbListCount(SearchVO svo);

	

	


	



}