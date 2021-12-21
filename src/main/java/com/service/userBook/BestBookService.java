package com.service.userBook;

import java.util.List;

import com.vo.adminGoodsMgt.GoodsListVO;

/**
 * 회원가입 Service
 * 생성자 : 김혜경 
 * 생성일 : 2021.12.13
 */
public interface BestBookService {
	
	//베스트 도서 이미지 리스트 가져오기
	List<GoodsListVO> getBestBook();

	//선택된 베스트 도서 정보 가져오기
	GoodsListVO getBestDtl(String gdNo);

	

	

	


}