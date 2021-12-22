package com.dao.userBook;

import java.util.List;

import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.common.SearchVO;

public interface NewBookDao {


	//목록 페이지//
	//신간도서 이미지 리스트 개수 가져오기
	int getNbListCount(SearchVO svo);

	//신간도서 이미지 리스트 가져오기
	List<GoodsListVO> getNbList(SearchVO searchVO);
	

	
}
