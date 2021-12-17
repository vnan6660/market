package com.dao.common;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vo.common.CmmnVO;

/**
 * 공통 DaoImpl
 * 생성자 : 김소연 
 * 생성일 : 2021.12.17
 */
@Repository
public class CommonDaoImpl implements CommonDao {
	@Autowired
	SqlSession sqlSession;

	//공통코드 가져오기
	@Override
	public List<CmmnVO> selectCmmnCd() {
		return sqlSession.selectList("selectCmmnCd");
	}
}
