package com.dao.userBook;

import java.util.List;

import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.common.SearchVO;

public interface LocalBookDao {


	//이미지 리스트 가져오기
	List<GoodsListVO> getLbList(SearchVO searchVO);

	//검색한 결과의 수를 가져오기
	int getLbListCount(SearchVO svo);
	

	
}
