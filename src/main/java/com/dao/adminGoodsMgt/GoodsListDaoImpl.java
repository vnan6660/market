package com.dao.adminGoodsMgt;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.adminGoodsMgt.GoodsRegVO;
import com.vo.common.CmmnVO;
import com.vo.common.SearchVO;

/**
 * 물품목록 DaoImpl
 * 생성자 : 김소연 
 * 생성일 : 2021.12.16
 */

@Repository
public class GoodsListDaoImpl implements GoodsListDao {

	@Autowired
	SqlSession sqlSession;
	
	//물품목록리스트 가져오기
	@Override
	public List<GoodsListVO> selectGoodsList(SearchVO searchVO) {
		return sqlSession.selectList("selectGoodsList",searchVO);
	}

	/* 상품 구분에 해당하는 상품 분류 가지고 오기 */
	@Override
	public List<CmmnVO> selectGoodsSeparate(String goodsGroup) {
		
		return sqlSession.selectList("selectGoodsSeparate", goodsGroup);
	}

	//상품이미지,상세설명의 파일을 포함한 상품등록하기
	@Override
	public void insertGoodsReg(GoodsRegVO vo) {
		sqlSession.insert("insertGoodsReg", vo);
	}
	
	//하나의 물품정보 가져오기
	@Override
	public GoodsListVO selectDetailGoods(String gdNo) {
		return sqlSession.selectOne("selectDetailGoods",gdNo);
	}

	//물품상세 수정 하기
	@Override
	public void updateGoods(GoodsRegVO vo) {
		sqlSession.selectOne("updateGoods",vo);
	}

	//물품 삭제 하기
	@Override
	public void deleteGoods(ArrayList<String> delNoList) {
		sqlSession.delete("deleteGoods",delNoList);
	}

	//물품 개시 하기(체크된 것은 true)
	@Override
	public void showGoodsTrue(ArrayList<String> showNoList) {
		sqlSession.update("showGoodsTrue",showNoList);
	}

	//물품 개시 하기(체크되지 않은것은 false)
	@Override
	public void showGoodsFalse(ArrayList<String> showNoList) {
		sqlSession.update("showGoodsFalse",showNoList);
	}

	//검색글카운트
	@Override
	public int selectGoodsListCount(SearchVO vo) {
		return sqlSession.selectOne("selectGoodsListCount", vo);
	}

}
