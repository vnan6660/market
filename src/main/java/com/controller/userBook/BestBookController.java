package com.controller.userBook;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.userBook.BestBookService;
import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.common.SearchVO;
import com.vo.questTotalBoard.NoticeVO;

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
		
		return "/userBook/bestBookList";
	}
	
	
	// 베스트도서 상세 페이지 연결
	@GetMapping("/bestBook/bestBookDetail/{gdNo}")
	public String getBestDtl(@PathVariable String gdNo,Model model) throws IOException {
		
		//하나의 물품정보 가져오기
		GoodsListVO goodsVO = bestBookService.getBestDtl(gdNo);
		
		if(goodsVO.getGdImg() != null) {
			goodsVO.setGdImgStr( new String(Base64.encodeBase64(goodsVO.getGdImg()),"UTF-8"));
		}
		if(goodsVO.getGdDetl() != null) {
			goodsVO.setGdDetlStr(new String(Base64.encodeBase64(goodsVO.getGdDetl()),"UTF-8"));
		}
		
		model.addAttribute("goodsVO", goodsVO);
		
		return "/userBook/bestBookDetail";
	}
	
	
	
	
	
	
	
	
	
	
	
	/* 베스트도서 검색 */
//	@GetMapping("/bestBook/searchBestBook")
//	@ResponseBody
//	public Map<String, Object> searchBestBook(SearchVO vo) {
//		HashMap<String, Object> resultMap = new HashMap<String, Object>();
//
//		int listcount = bestBookService.getListCount(vo);
//
//		SearchVO searchVO = SearchVO.builder().selectOptValOne(vo.getSelectOptValOne()).searchVal(vo.getSearchVal()).page(vo.getPage()).listcount(listcount).build();
//
//		List<NoticeVO> bestBookList = bestBookService.getNoticeList(searchVO);
//
//		resultMap.put("bestBookList", bestBookList);
//		resultMap.put("maxPage", searchVO.getMaxpage());
//		resultMap.put("page", searchVO.getPage());
//		resultMap.put("startpage", searchVO.getStartpage());
//		resultMap.put("endpage", searchVO.getEndpage());
//
//		return resultMap;
//	}
	
	
	
	

}
