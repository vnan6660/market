package com.controller.adminGoodsMgt;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.service.adminGoodsMgt.GoodsListService;
import com.vo.adminGoodsMgt.GoodsListVO;

@Controller
public class GoodsListController {
	
	@Autowired
	private GoodsListService goodsListService;
	
	@RequestMapping("/goodsList/goodsListPage")
	public String goodsListPage(Model model) throws IOException {
		
		List<GoodsListVO> list =  goodsListService.getImg();
		
		List<GoodsListVO> test = new ArrayList<GoodsListVO>();
		
		for (int i = 0; i < list.size(); i++) {
			
			GoodsListVO votest = new GoodsListVO();
			
			votest.setGdNo(list.get(i).getGdNo());
			votest.setGdGp(list.get(i).getGdGp());
			votest.setGdSp(list.get(i).getGdSp());
			votest.setGdNm(list.get(i).getGdNm());
			votest.setGdCnt(list.get(i).getGdCnt());
			votest.setGdPage(list.get(i).getGdPage());
			votest.setGdThick(list.get(i).getGdThick());
			votest.setGdWr(list.get(i).getGdWr());
			votest.setGdPb(list.get(i).getGdPb());
			votest.setGdYn(list.get(i).getGdYn());
			
			
			
			if (list.get(i).getGdImg() != null) {
				String gdImgStr = new String(Base64.encodeBase64(list.get(i).getGdImg()),"UTF-8");
				votest.setGdImgStr(gdImgStr);
			}
			
			
			test.add(i,votest);
		}
		
		
		
		model.addAttribute("eelist", test);
		
		
		return "/adminGoodsMgt/goodsList";
	}
}
