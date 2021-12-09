package com.controller.csMgt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.service.csMgt.CsInfoService;

/**
 * 고객정보 Controller
 * 생성자 : 김소연 
 * 생성일 : 2021.12.09
 */
@Controller
public class CsInfoController {
	
	@Autowired
	private CsInfoService csInfoService;
	
	@RequestMapping("/csInfo/csInfoPage")
	public String csInfoPage(Model model) {
				
		return "/csMgt/csInfo";
	}
}
