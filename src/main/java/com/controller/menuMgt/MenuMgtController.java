package com.controller.menuMgt;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.service.menuMgt.MenuMgtService;
import com.vo.MenuMgtVO;

@Controller
public class MenuMgtController {
	
	@Autowired
	private MenuMgtService MenuMgtService;
	
	@PostMapping("/MenuInfo")
	public void setMenuInfo(@RequestBody MenuMgtVO vo) {
		MenuMgtService.setMenuInfo(vo);
	}
	
	@RequestMapping("/menuMgt")
	public String menuMgt(Model model) {
		List<MenuMgtVO> list = MenuMgtService.getMenuList();
		model.addAttribute("list", list);	
		return "menuMgt";
	}
}
