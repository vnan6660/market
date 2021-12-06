package com.service.menuTotalMgt;

import java.util.List;
import java.util.Map;

import com.vo.menuTotalMgt.MenuMgtVO;

public interface AuthMgtService {

	List<MenuMgtVO> getAuthMgtList(String authSelect);

}
