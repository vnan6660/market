package com.dao.adminGoodsMgt;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vo.adminGoodsMgt.GoodsListVO;

@Repository
public class GoodsListDaoImpl implements GoodsListDao {

	@Autowired
	SqlSession sqlSession;
	
	@Override
	public List<GoodsListVO> selectImg() {
		return sqlSession.selectList("selectImg");
	}

}
