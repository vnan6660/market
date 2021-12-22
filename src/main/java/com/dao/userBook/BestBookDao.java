package com.dao.userBook;

import java.util.List;

import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.common.CmmnVO;
import com.vo.common.SearchVO;

public interface BestBookDao {

	//목록 페이지//
	//베스트 도서 이미지 리스트 가져오기
	List<GoodsListVO> getBestBook(SearchVO searchVO);

	//검색한 결과의 수를 가져오기
	int getBbListCount(SearchVO vo);
	
	
	//상세 페이지//
	//선택된 베스트 도서 정보 가져오기
	GoodsListVO getBestDtl(String gdNo);

	
}
