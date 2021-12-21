package com.controller.userBook.bestBook;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.service.userBook.BestBookService;
import com.vo.adminGoodsMgt.GoodsListVO;

/**
 * 베스트도서 Controller 
 * 생성자 : 김혜경 
 * 생성일 : 2021.12.20
 */
@Controller
public class BestBookController {

	@Autowired
	private BestBookService bestBookService;

	// 베스트도서 페이지 연결
	@RequestMapping("/bestBook/bestBookPage")
	public String bestBookPage(Model model) throws IOException{

		//베스트 도서 이미지 리스트 가져오기
		List<GoodsListVO> list =  bestBookService.getBestBook();
		List<GoodsListVO> reList = new ArrayList<GoodsListVO>();
		
		for (int i = 0; i < list.size(); i++) {
			GoodsListVO vo = new GoodsListVO();
			
			vo.setGdNo(list.get(i).getGdNo());
			vo.setGdGp(list.get(i).getGdGp());
			vo.setGdGpNm(list.get(i).getGdGpNm());
			vo.setGdSp(list.get(i).getGdSp());
			vo.setGdSpNm(list.get(i).getGdSpNm());
			vo.setGdNm(list.get(i).getGdNm());
			vo.setGdCnt(list.get(i).getGdCnt());
			vo.setGdPage(list.get(i).getGdPage());
			vo.setGdThick(list.get(i).getGdThick());
			vo.setGdWr(list.get(i).getGdWr());
			vo.setGdPb(list.get(i).getGdPb());
			vo.setGdYn(list.get(i).getGdYn());
			vo.setGdPrice(list.get(i).getGdPrice());
			vo.setGdDc(list.get(i).getGdDc());
			
			if (list.get(i).getGdImg() != null) {
				String gdImgStr = new String(Base64.encodeBase64(list.get(i).getGdImg()),"UTF-8");
				vo.setGdImgStr(gdImgStr);
			}
			reList.add(i,vo);
		}
		
		model.addAttribute("reList", reList);
		
		return "/userBook/bestBook/bestBookList";
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
