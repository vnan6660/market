package com.controller.common;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.service.menuTotalMgt.MenuMgtService;
import com.vo.menuTotalMgt.MenuMgtVO;

/**
 * 공통 Controller
 * 생성자 : 김소연
 * 생성일 : 2021.11.27
 *
 */

@Controller
public class CommonController {
	
    @Autowired
    private MenuMgtService MenuMgtService;
    
    @RequestMapping("/")
    public String main() {
        return "main";
    }
    @RequestMapping("/sideMenu/sideMenuPage")
    public String sideMenu(Model model) {
        List<MenuMgtVO> list = MenuMgtService.getMenuList();
        model.addAttribute("list", list);
        return "/common/sideMenu";
    }

}
