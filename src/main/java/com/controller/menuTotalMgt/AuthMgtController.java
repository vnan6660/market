package com.controller.menuTotalMgt;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.menuTotalMgt.AuthMgtService;
import com.vo.menuTotalMgt.MenuMgtVO;

/**
 * 권한관리 Controller 생성자 : 김소연 생성일 : 2021.12.06
 *
 */

@Controller
public class AuthMgtController {

	@Autowired
	AuthMgtService authMgtService;

	/* 권한관리 페이지 가기 */
	@RequestMapping("/authMgt/authMgtPage")
	public String authMgt() {
		return "/menuTotalMgt/authMgt";
	}

	/* selectBox에 맞는 권한목록 불러오기 */
	@GetMapping("/authMgt/getAuthMgtList")
	@ResponseBody
	public List<MenuMgtVO> getAuthMgtList(@RequestParam String authSelect) {

		List<MenuMgtVO> list = authMgtService.getAuthMgtList(authSelect);

		return list;
	}

	/* 권한 수정 */
	@PostMapping("/authMgt/updateAuthMgtList")
	@ResponseBody
	public void updateAuthMgtList(@RequestBody MenuMgtVO vo) {
		authMgtService.updateAuthMgtList(vo);
	}
}
