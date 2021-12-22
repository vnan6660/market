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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.userBook.BestBookService;
import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.common.SearchVO;

/**
 * 외국도서 Controller 
 * 생성자 : 김혜경 
 * 생성일 : 2021.12.20
 */
@Controller
public class ForeignBookController {

	@Autowired
	private BestBookService bestBookService;

	// 신간도서 페이지
	@RequestMapping("/foreignBook/foreignBookPage")
	public String bestBookPage(Model model) throws IOException{
		SearchVO svo = SearchVO.builder().selectOptValOne("foreignBook").build();
		int listcount = bestBookService.getBbListCount(svo);
		SearchVO searchVO = SearchVO.builder().selectOptValOne("foreignBook").page(1).listcount(listcount).build();
		
		//베스트 도서 이미지 리스트 가져오기
		List<GoodsListVO> list =  bestBookService.getBestBook(searchVO);
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
		model.addAttribute("maxPage", searchVO.getMaxpage());
		model.addAttribute("page", searchVO.getPage());
		model.addAttribute("startpage", searchVO.getStartpage());
		model.addAttribute("endpage", searchVO.getEndpage());
		
		return "/userBook/foreignBookList";
	}
	
	// 신간도서 검색
	@GetMapping("/foreignBook/searchForeignBook")
	@ResponseBody
	public Map<String, Object> searchNotice(SearchVO vo) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		vo.setSelectOptValOne("foreignBook");
		//검색한 결과의 수를 가져오기
		int listcount = bestBookService.getBbListCount(vo);

		SearchVO searchVO = SearchVO.builder().startDt(vo.getStartDt()).endDt(vo.getEndDt()).selectOptValOne("foreignBook").selectOptValTwo(vo.getSelectOptValTwo()).selectOptValThree(vo.getSelectOptValThree()).searchVal(vo.getSearchVal()).page(vo.getPage()).listcount(listcount).build();

		List<GoodsListVO> reList = bestBookService.getBestBook(searchVO);

		resultMap.put("reList", reList);
		resultMap.put("maxPage", searchVO.getMaxpage());
		resultMap.put("page", searchVO.getPage());
		resultMap.put("startpage", searchVO.getStartpage());
		resultMap.put("endpage", searchVO.getEndpage());

		return resultMap;
	}

}
