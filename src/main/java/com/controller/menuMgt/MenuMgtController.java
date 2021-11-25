package com.controller.menuMgt;

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

import com.service.menuMgt.MenuMgtService;
import com.vo.MenuMgtVO;

@Controller
public class MenuMgtController {
	
	@Autowired
	private MenuMgtService MenuMgtService;
	
	
	@RequestMapping("/menuMgt")
	public String menuMgt(Model model) {
		List<MenuMgtVO> list = MenuMgtService.getMenuList();
		List<MenuMgtVO> option = MenuMgtService.getUpCd();
		model.addAttribute("list", list);	
		model.addAttribute("option",option);
		
		return "menuMgt";
	}
	
	@PostMapping("/menuInfo")
	@ResponseBody
	public void setMenuInfo(@RequestBody MenuMgtVO vo) {
		MenuMgtService.setMenuInfo(vo);
	}
	
	@PostMapping("/menuInfo/upd")
	@ResponseBody
	public void updateMenuInfo(@RequestBody MenuMgtVO vo) {
		MenuMgtService.updateMenuInfo(vo);
	}
	
	@GetMapping("/menuInfo")
	@ResponseBody
	public List<MenuMgtVO> getMenuInfo(@RequestParam String menuId) {
		List<MenuMgtVO> menuDetail = MenuMgtService.getMenuInfo(menuId);
		return menuDetail;
	}
	
	@GetMapping("/menuInfo/del")
	@ResponseBody
	public void deleteMenuInfo(@RequestParam String menuId) {
		MenuMgtService.deleteMenuInfo(menuId);
	}

	@GetMapping("/valiMenuCd")
	@ResponseBody
	public List<MenuMgtVO> valiMenuCd() {
		List<MenuMgtVO> list = MenuMgtService.getMenuList();
		return list;
	}
}
