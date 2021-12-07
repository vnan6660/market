package com.dao.menuTotalMgt;

import java.util.List;

import com.vo.menuTotalMgt.MenuMgtVO;

/**
 * 권한관리 ServiceDao
 * 생성자 : 김소연
 * 생성일 : 2021.12.06
 *
 */
public interface AuthMgtDao {

	/* selectBox에 맞는 권한목록 불러오기 */
	List<MenuMgtVO> selectAuthMgtList(String authSelect);

	/* check박스 true업데이트 */
	void updateAuthMgtListTrue(MenuMgtVO vo);

	/* check박스 false업데이트 */
	void updateAuthMgtListFalse(MenuMgtVO vo);

}
