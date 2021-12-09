package com.controller.menuTotalMgt;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.menuTotalMgt.MenuMgtService;
import com.vo.menuTotalMgt.MenuMgtVO;

/**
 * 메뉴관리 Controller
 * 생성자 : 김소연 
 * 생성일 : 2021.11.27
 */
@Controller
public class MenuMgtController {

	@Autowired
	private MenuMgtService MenuMgtService;

	// 메뉴관리 메뉴리스트와 상위코드 불러오기
	@RequestMapping("/menuMgt/menuMgtPage")
	public String menuMgtPage(Model model) {
		List<MenuMgtVO> list = MenuMgtService.getMenuList();
		List<MenuMgtVO> option = MenuMgtService.getUpCd();
		model.addAttribute("list", list);
		model.addAttribute("option", option);

		return "/menuTotalMgt/menuMgt";
	}

	// 메뉴관리 하나의 메뉴정보 가져오기
	@GetMapping("/menuMgt/getMenuMgt")
	@ResponseBody
	public List<MenuMgtVO> getMenuMgt(@RequestParam String menuId) {
		List<MenuMgtVO> menuDetail = MenuMgtService.getMenuMgt(menuId);
		return menuDetail;
	}

	// 메뉴관리 입력
	@PostMapping("/menuMgt/setMenuMgt")
	@ResponseBody
	public void setMenuMgt(@RequestBody MenuMgtVO vo) {
		MenuMgtService.setMenuMgt(vo);
	}

	// 메뉴관리 업데이트
	@PostMapping("/menuMgt/updateMenuMgt")
	@ResponseBody
	public void updateMenuMgt(@RequestBody MenuMgtVO vo) {
		MenuMgtService.updateMenuMgt(vo);
	}

	// 메뉴관리 삭제
	@GetMapping("/menuMgt/deleteMenuMgt")
	@ResponseBody
	public void deleteMenuMgt(@RequestParam String menuId) {
		MenuMgtService.deleteMenuMgt(menuId);
	}

	// 메뉴관리 저장하기전 기존코드와 같은코드인지 체크
	@GetMapping("/menuMgt/validationMenuMgt")
	@ResponseBody
	public List<MenuMgtVO> validationMenuMgt() {
		List<MenuMgtVO> list = MenuMgtService.getMenuList();
		return list;
	}
}
