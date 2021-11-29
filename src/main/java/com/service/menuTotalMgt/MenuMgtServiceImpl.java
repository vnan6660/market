package com.service.menuTotalMgt;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.menuTotalMgt.MenuMgtDao;
import com.vo.menuTotalMgt.MenuMgtVO;

/**
 * 메뉴관리 ServiceImpl
 * 생성자 : 김소연 
 * 생성일 : 2021.11.27
 */
@Service
public class MenuMgtServiceImpl implements MenuMgtService {

	@Autowired
	private MenuMgtDao menuMgtDao;

	// 메뉴관리 메뉴리스트 불러오기
	@Override
	public List<MenuMgtVO> getMenuList() {
		return menuMgtDao.selectMenuList();
	}

	// 메뉴관리 상위코드 불러오기
	@Override
	public List<MenuMgtVO> getUpCd() {
		return menuMgtDao.selectUpCd();
	}

	// 메뉴관리 하나의 메뉴정보 가져오기
	@Override
	public List<MenuMgtVO> getMenuMgt(String menuId) {
		return menuMgtDao.selectMenuMgt(menuId);
	}

	// 메뉴관리 입력
	@Override
	public void setMenuMgt(MenuMgtVO vo) {
		menuMgtDao.setMenuMgt(vo);
	}

	// 메뉴관리 업데이트
	@Override
	public void updateMenuMgt(MenuMgtVO vo) {
		menuMgtDao.updateMenuMgt(vo);
	}

	// 메뉴관리 삭제
	@Override
	public void deleteMenuMgt(String menuId) {
		menuMgtDao.deleteMenuMgt(menuId);
	}

}
