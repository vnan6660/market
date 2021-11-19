package com.the.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MarketController {
	@RequestMapping("/")
	public String hello() {
		return "main";
	}
	@RequestMapping("/sideMenu")
	public String sideMenu() {
		return "/common/sideMenu";
	}
	@RequestMapping("/menuMgt")
	public String menuMgt() {
		return "menuMgt";
	}
	
}
