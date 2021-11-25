package com.dao.menuMgt;

import java.util.List;

import com.vo.MenuMgtVO;

public interface MenuMgtDao {

	void setMenuInfo(MenuMgtVO vo);
	
	void updateMenuInfo(MenuMgtVO vo);

	List<MenuMgtVO> selectMenuList();

	List<MenuMgtVO> selectMenuInfo(String menuId);

	void deleteMenuInfo(String menuId);

	List<MenuMgtVO> selectUpCd();

}
