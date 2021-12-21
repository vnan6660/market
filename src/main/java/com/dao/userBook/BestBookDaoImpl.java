package com.dao.userBook;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vo.adminGoodsMgt.GoodsListVO;

@Repository
public class BestBookDaoImpl implements BestBookDao{

	@Autowired
	SqlSession sqlSession;

	//베스트 도서 이미지 리스트 가져오기
	@Override
	public List<GoodsListVO> getBestBook() {
		return sqlSession.selectList("getBestBook");
	}



}
