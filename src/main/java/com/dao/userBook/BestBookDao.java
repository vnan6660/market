package com.dao.userBook;

import java.util.List;

import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.common.SearchVO;

public interface BestBookDao {

	//베스트 도서 이미지 리스트 가져오기
	List<GoodsListVO> getBestBook();

	//선택된 베스트 도서 정보 가져오기
	GoodsListVO getBestDtl(String gdNo);


}
