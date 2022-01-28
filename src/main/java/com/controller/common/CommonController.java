package com.controller.common;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.common.CommonService;
import com.service.menuTotalMgt.MenuMgtService;
import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.common.CmmnVO;
import com.vo.common.OrderVO;
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
        return "/main";
    }
    
    //관리자메인 페이지 가기
    @RequestMapping("/adminMain")
    public String adminMain() {
        return "/adminMain";
    }
    
    //사이드 메뉴 불러오기
    @RequestMapping("/sideMenu/sideMenuPage")
    public String sideMenu(Model model) {
        List<MenuMgtVO> list = MenuMgtService.getMenuList();
        model.addAttribute("list", list);
        return "/common/sideMenu";
    }
    
   //사이드 메뉴 불러오기
    @RequestMapping("/footer/footerPage")
    public String footer(Model model) {
        return "/common/footer";
    }
    
    //공통코드 가져오기
    @GetMapping("/common/getCmmnCd")
    @ResponseBody
    public List<CmmnVO> getCmmnCd() {
    	
    	List<CmmnVO> list = commonService.getCmmnCd();
    	
        return list;
    }
    
    //금주 주문량,판매금액 불러오기
    @GetMapping("/common/getThisWeekOrder")
    @ResponseBody
    public List<OrderVO> getThisWeekOrder(@RequestParam(value = "dateList[]" ,required = false)ArrayList<String> dateList){
    	
    	List<OrderVO> list = commonService.getThisWeekOrder(dateList);
		
    	return list;
    }
    
    //이번년도 주문량,판매금액 불러오기
    @GetMapping("/common/getThisYearOrder")
    @ResponseBody
    public List<OrderVO> getThisYearOrder(){
    	
    	List<OrderVO> list = commonService.getThisYearOrder();
		
    	return list;
    }
    
    //베스트 셀러 불러오기
    @GetMapping("/common/getBestSeller")
    @ResponseBody
    public List<GoodsListVO> getBestSeller() throws IOException{
    	
    	List<GoodsListVO> list = commonService.getBestSeller();
    	List<GoodsListVO> reList = new ArrayList<GoodsListVO>();
		
		for (int i = 0; i < list.size(); i++) {
			GoodsListVO vo = new GoodsListVO();
			
			vo.setGdNo(list.get(i).getGdNo());
			vo.setGdGp(list.get(i).getGdGp());
			vo.setGdSp(list.get(i).getGdSp());
			vo.setGdNm(list.get(i).getGdNm());
			vo.setGdWr(list.get(i).getGdWr());
			vo.setSelQty(list.get(i).getSelQty());
			
			if (list.get(i).getGdImg() != null) {
				String gdImgStr = new String(Base64.encodeBase64(list.get(i).getGdImg()),"UTF-8");
				vo.setGdImgStr(gdImgStr);
			}
			reList.add(i,vo);
		}
		
    	return list;
    }
    
    
    //추천도서 불러오기
    @GetMapping("/common/getRecomnSeller")
    @ResponseBody
    public List<GoodsListVO> getRecomnSeller(String gpCd) throws IOException{
    	
    	List<GoodsListVO> list = commonService.getRecomnSeller(gpCd);
    	List<GoodsListVO> reList = new ArrayList<GoodsListVO>();
		
		for (int i = 0; i < list.size(); i++) {
			GoodsListVO vo = new GoodsListVO();
			
			vo.setGdNo(list.get(i).getGdNo());
			vo.setGdGp(list.get(i).getGdGp());
			vo.setGdSp(list.get(i).getGdSp());
			vo.setGdNm(list.get(i).getGdNm());
			vo.setGdWr(list.get(i).getGdWr());
			
			if (list.get(i).getGdImg() != null) {
				String gdImgStr = new String(Base64.encodeBase64(list.get(i).getGdImg()),"UTF-8");
				vo.setGdImgStr(gdImgStr);
			}
			reList.add(i,vo);
		}
		
    	return list;
    }
    
}
