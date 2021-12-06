package com.service.menuTotalMgt;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.menuTotalMgt.AuthMgtDao;
import com.vo.menuTotalMgt.MenuMgtVO;

@Service
public class AuthMgtServiceImpl implements AuthMgtService {

	@Autowired
	AuthMgtDao authMgtDao;
	@Override
	public List<MenuMgtVO> getAuthMgtList(String authSelect) {
		return authMgtDao.selectAuthMgtList(authSelect);
	}

}
