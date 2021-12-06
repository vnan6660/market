package com.dao.menuTotalMgt;

import java.util.List;
import java.util.Map;

import com.vo.menuTotalMgt.MenuMgtVO;

public interface AuthMgtDao {

	List<MenuMgtVO> selectAuthMgtList(String authSelect);

}
