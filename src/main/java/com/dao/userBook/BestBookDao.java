package com.dao.userBook;

import java.util.List;

import com.vo.adminGoodsMgt.GoodsListVO;

public interface BestBookDao {

	//베스트 도서 이미지 리스트 가져오기
	List<GoodsListVO> getBestBook();


}
