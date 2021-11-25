package com.service.menuMgt;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.menuMgt.MenuMgtDao;
import com.vo.MenuMgtVO;

@Service
public class MenuMgtServiceImpl implements MenuMgtService {

	@Autowired
	private MenuMgtDao menuMgtDao;

	@Override
	public void setMenuInfo(MenuMgtVO vo) {
		menuMgtDao.setMenuInfo(vo);
	}

	@Override
	public void updateMenuInfo(MenuMgtVO vo) {
		menuMgtDao.updateMenuInfo(vo);
	}

	@Override
	public List<MenuMgtVO> getMenuList() {
		return menuMgtDao.selectMenuList();
	}

	@Override
	public List<MenuMgtVO> getMenuInfo(String menuId) {
		return menuMgtDao.selectMenuInfo(menuId);
	}

	@Override
	public void deleteMenuInfo(String menuId) {
		menuMgtDao.deleteMenuInfo(menuId);
	}

	@Override
	public List<MenuMgtVO> getUpCd() {
		return menuMgtDao.selectUpCd();
	}

}
