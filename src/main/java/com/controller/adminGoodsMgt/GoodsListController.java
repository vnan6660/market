package com.controller.adminGoodsMgt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.service.adminGoodsMgt.GoodsListService;

@Controller
public class GoodsListController {
	
	@Autowired
	private GoodsListService goodsListService;
	
	@RequestMapping("/goodsList/goodsListPage")
	public String goodsListPage() {
		return "/adminGoodsMgt/goodsList";
	}
}
