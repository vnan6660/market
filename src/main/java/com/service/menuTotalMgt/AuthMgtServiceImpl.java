package com.service.menuTotalMgt;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.menuTotalMgt.AuthMgtDao;
import com.vo.menuTotalMgt.MenuMgtVO;

/**
 * 권한관리 ServiceImpl
 * 생성자 : 김소연
 * 생성일 : 2021.12.06
 *
 */
@Service
public class AuthMgtServiceImpl implements AuthMgtService {

	@Autowired
	AuthMgtDao authMgtDao;
	
	/* selectBox에 맞는 권한목록 불러오기 */
	@Override
	public List<MenuMgtVO> getAuthMgtList(String authSelect) {
		return authMgtDao.selectAuthMgtList(authSelect);
	}

	/*권한 수정*/
	@Override
	public void updateAuthMgtList(MenuMgtVO vo) {
		if (!vo.getOptList().isEmpty()) {
			authMgtDao.updateAuthMgtListTrue(vo);
		}
		authMgtDao.updateAuthMgtListFalse(vo);
	}

}
