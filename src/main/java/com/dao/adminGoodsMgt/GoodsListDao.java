package com.dao.adminGoodsMgt;

import java.util.List;

import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.adminGoodsMgt.GoodsRegVO;

/**
 * 물품목록 Dao
 * 생성자 : 김소연 
 * 생성일 : 2021.12.16
 */

public interface GoodsListDao {

	//물품목록리스트 가져오기
	List<GoodsListVO> selectGoodsList();

	//하나의 물품정보 가져오기
	GoodsListVO selectDetailGoods(String gdNo);

	//물품상세 수정 하기
	void updateGoods(GoodsRegVO vo);

}
