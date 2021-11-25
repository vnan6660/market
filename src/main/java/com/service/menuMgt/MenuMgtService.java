package com.service.menuMgt;

import java.util.List;

import com.vo.MenuMgtVO;

public interface MenuMgtService {

	void setMenuInfo(MenuMgtVO vo);
	
	void updateMenuInfo(MenuMgtVO vo);

	List<MenuMgtVO> getMenuList();

	List<MenuMgtVO> getMenuInfo(String menuId);

	void deleteMenuInfo(String menuId);

	List<MenuMgtVO> getUpCd();

	

}
