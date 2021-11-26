package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.service.menuMgt.MenuMgtService;
import com.vo.MenuMgtVO;

@Controller
public class MarketController {
	
	@Autowired
	private MenuMgtService MenuMgtService;
	
	@RequestMapping("/")
	public String main() {
		return "main";
	}
	@RequestMapping("/sideMenu")
	public String sideMenu(Model model) {
		List<MenuMgtVO> list = MenuMgtService.getMenuList();
		model.addAttribute("list", list);
		return "/common/sideMenu";
	}
	
	
}
