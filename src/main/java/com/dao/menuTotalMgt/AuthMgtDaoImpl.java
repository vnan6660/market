package com.dao.menuTotalMgt;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vo.menuTotalMgt.MenuMgtVO;

@Repository
public class AuthMgtDaoImpl implements AuthMgtDao {
	@Autowired
	SqlSession sqlSession;

	@Override
	public List<MenuMgtVO> selectAuthMgtList(String authSelect) {
		return sqlSession.selectList("selectAuthMgtList", authSelect);
	}
}
