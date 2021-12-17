package com.controller.common;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.common.CommonService;
import com.service.menuTotalMgt.MenuMgtService;
import com.vo.common.CmmnVO;
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
    
    @Autowired
    private CommonService commonService;
    
    //메인 페이지 가기
    @RequestMapping("/")
    public String main() {
        return "main";
    }
    
    //사이드 메뉴 불러오기
    @RequestMapping("/sideMenu/sideMenuPage")
    public String sideMenu(Model model) {
        List<MenuMgtVO> list = MenuMgtService.getMenuList();
        model.addAttribute("list", list);
        return "/common/sideMenu";
    }
    
    //공통코드 가져오기
    @GetMapping("/common/getCmmnCd")
    @ResponseBody
    public List<CmmnVO> getCmmnCd() {
    	
    	List<CmmnVO> list = commonService.getCmmnCd();
    	
        return list;
    }
}
