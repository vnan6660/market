package com.dao.menuTotalMgt;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vo.menuTotalMgt.MenuMgtVO;

/**
 * 권한관리 ServiceDaoImpl
 * 생성자 : 김소연
 * 생성일 : 2021.12.06
 *
 */
@Repository
public class AuthMgtDaoImpl implements AuthMgtDao {
	@Autowired
	SqlSession sqlSession;

	/* selectBox에 맞는 권한목록 불러오기 */
	@Override
	public List<MenuMgtVO> selectAuthMgtList(String authSelect) {
		return sqlSession.selectList("selectAuthMgtList", authSelect);
	}

	/* check박스 true업데이트 */
	@Override
	public void updateAuthMgtListTrue(MenuMgtVO vo) {
		sqlSession.selectList("updateAuthMgtListTrue", vo);
		
	}

	/* check박스 false업데이트 */
	@Override
	public void updateAuthMgtListFalse(MenuMgtVO vo) {
		sqlSession.selectList("updateAuthMgtListFalse", vo);
		
	}
}
