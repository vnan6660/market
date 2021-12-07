package com.service.menuTotalMgt;

import java.util.List;

import com.vo.menuTotalMgt.MenuMgtVO;

/**
 * 권한관리 Service
 * 생성자 : 김소연
 * 생성일 : 2021.12.06
 *
 */
public interface AuthMgtService {
	
	/* selectBox에 맞는 권한목록 불러오기 */
	List<MenuMgtVO> getAuthMgtList(String authSelect);

	/*권한 수정*/
	void updateAuthMgtList(MenuMgtVO vo);

}
