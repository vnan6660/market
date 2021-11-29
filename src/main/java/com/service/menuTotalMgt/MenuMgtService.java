package com.service.menuTotalMgt;

import java.util.List;

import com.vo.menuTotalMgt.MenuMgtVO;

/**
 * 메뉴관리 Service
 * 생성자 : 김소연 
 * 생성일 : 2021.11.27
 */
public interface MenuMgtService {
	// 메뉴관리 메뉴리스트 불러오기
	List<MenuMgtVO> getMenuList();

	// 메뉴관리 상위코드 불러오기
	List<MenuMgtVO> getUpCd();

	// 메뉴관리 하나의 메뉴정보 가져오기
	List<MenuMgtVO> getMenuMgt(String menuId);

	// 메뉴관리 입력
	void setMenuMgt(MenuMgtVO vo);

	// 메뉴관리 업데이트
	void updateMenuMgt(MenuMgtVO vo);

	// 메뉴관리 삭제
	void deleteMenuMgt(String menuId);

}
