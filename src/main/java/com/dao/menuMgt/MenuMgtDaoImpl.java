package com.dao.menuMgt;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vo.MenuMgtVO;

@Repository
public class MenuMgtDaoImpl implements MenuMgtDao {

	@Autowired
	SqlSession sqlSession;
	
	@Override
	public void setMenuInfo(MenuMgtVO vo) {
		sqlSession.insert("setMenuInfo", vo);
		
	}

	@Override
	public List<MenuMgtVO> selectMenuList() {
		return sqlSession.selectList("selectMenuList");
	}

}
