package com.dao.menuMgt;

import java.util.List;

import com.vo.MenuMgtVO;

public interface MenuMgtDao {

	void setMenuInfo(MenuMgtVO vo);

	List<MenuMgtVO> selectMenuList();

}
