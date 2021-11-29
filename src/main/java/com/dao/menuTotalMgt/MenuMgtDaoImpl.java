package com.dao.menuTotalMgt;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vo.menuTotalMgt.MenuMgtVO;
/**
 * 메뉴관리 DaoImpl
 * 생성자 : 김소연
 * 생성일 : 2021.11.27
 */
@Repository
public class MenuMgtDaoImpl implements MenuMgtDao {

	@Autowired
	SqlSession sqlSession;

	// 메뉴관리 메뉴리스트 불러오기
	@Override
	public List<MenuMgtVO> selectMenuList() {
		return sqlSession.selectList("selectMenuList");
	}
	
	// 메뉴관리 상위코드 불러오기
	@Override
	public List<MenuMgtVO> selectUpCd() {
		return sqlSession.selectList("selectUpCd");
	}
	
	// 메뉴관리 하나의 메뉴정보 가져오기
	@Override
	public List<MenuMgtVO> selectMenuMgt(String menuId) {
		return sqlSession.selectList("selectMenuMgt", menuId);
	}
	
	// 메뉴관리 입력
	@Override
	public void setMenuMgt(MenuMgtVO vo) {
		sqlSession.insert("setMenuMgt", vo);
	}

	// 메뉴관리 업데이트
	@Override
	public void updateMenuMgt(MenuMgtVO vo) {
		sqlSession.update("updateMenuMgt", vo);
	}
	
	// 메뉴관리 삭제
	@Override
	public void deleteMenuMgt(String menuId) {
		sqlSession.delete("deleteMenuMgt", menuId);
	}
	
}
