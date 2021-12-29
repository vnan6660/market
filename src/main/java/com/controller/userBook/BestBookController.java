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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.service.adminGoodsMgt.GoodsListService;
import com.service.userBook.BestBookService;
import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.common.CmmnVO;
import com.vo.common.SearchVO;

/**
 * 베스트도서 Controller 
 * 생성자 : 김혜경 
 * 생성일 : 2021.12.20
 */
@Controller
public class BestBookController {

	@Autowired
	private BestBookService bestBookService;

	@Autowired
	private GoodsListService goodsListService;
	
	
	// 베스트도서 페이지
	@RequestMapping("/bestBook/bestBookPage")
	public String bestBookPage(Model model) throws IOException{
		//처음 페이지를 불러올 때 bestBook의 값이 나오도록 builder()를 이용해 SearchVO의 selectOptValOne에 "bestBook" 값을 넣어주겠단 의미
		SearchVO svo = SearchVO.builder().selectOptValOne("bestBook").build();
		//bestBook의 값을 넣고 list의 개수를 불러옴
		int listcount = bestBookService.getBbListCount(svo);

		//도서 리스트를 가져오기 위해 SearchVO의 selectOptValOne에 "bestBook" 값, 1페이지, 위에서 가져온 listcount값을 넣은 searchVO를 만든다.
		SearchVO searchVO = SearchVO.builder().selectOptValOne("bestBook").page(1).listcount(listcount).build();
		//searchVO의 값을 넣어 list에 베스트 도서 리스트 넣기
		List<GoodsListVO> list =  bestBookService.getBestBook(searchVO);
		//새로운 reList를 만든다 -> 이미지를 변형해야해서 다시 만듦
		List<GoodsListVO> reList = new ArrayList<GoodsListVO>();
		
		for (int i = 0; i < list.size(); i++) {
			//GoodsListVO에 저장하기위해 생성자 생성
			GoodsListVO vo = new GoodsListVO();
			
			//list의 i행에있는 gdNo를 vo의 gdNo에 값을 넣겠다.(이하동일)
			vo.setGdNo(list.get(i).getGdNo());	//상품번호
			vo.setGdGp(list.get(i).getGdGp());	//상품구분
			vo.setGdGpNm(list.get(i).getGdGpNm());	//상품구분이름
			vo.setGdSp(list.get(i).getGdSp());	//상품분류
			vo.setGdSpNm(list.get(i).getGdSpNm());	//상품분류이름
			vo.setGdNm(list.get(i).getGdNm());	//상품이름
			vo.setGdCnt(list.get(i).getGdCnt());	//상품재고
			vo.setGdPage(list.get(i).getGdPage());	//상품페이지
			vo.setGdThick(list.get(i).getGdThick());	//상품두께
			vo.setGdWr(list.get(i).getGdWr());	//상품작가
			vo.setGdPb(list.get(i).getGdPb());	//상품출판사
			vo.setGdYn(list.get(i).getGdYn());	//상품개시
			vo.setGdPrice(list.get(i).getGdPrice());	//상품가격
			vo.setGdDc(list.get(i).getGdDc());	//상품설명
			
			//for문을 돌렸을때 이미지가 있다면
			if (list.get(i).getGdImg() != null) {
				//blob으로 저장되어있는 이미지를 string형태로 담아낸다.
				String gdImgStr = new String(Base64.encodeBase64(list.get(i).getGdImg()),"UTF-8");
				//vo에 이미지를 담는다.
				vo.setGdImgStr(gdImgStr);
			}
			
			//새로운 리스트에 가져온 값을 넣어줌
			reList.add(i,vo);
		}
		
		//model.addAttribute("a",b)에 담음으로써 jsp에서 "a"의 이름으로 b의 값을 사용할 수 있음 
		model.addAttribute("reList", reList);
		model.addAttribute("maxPage", searchVO.getMaxpage());
		model.addAttribute("page", searchVO.getPage());
		model.addAttribute("startpage", searchVO.getStartpage());
		model.addAttribute("endpage", searchVO.getEndpage());
		
		return "/userBook/bestBookList";
	}
	
	//목록페이지 가기
	@PostMapping(value = "/bestBook/bestBookPage")
	public String goBestBookListPage(SearchVO searchVO,Model model){
		model.addAttribute("searchVO", searchVO);
		model.addAttribute("goList", "t");
		return "/userBook/bestBookList";
		
	}

	// 베스트도서 검색
	@GetMapping("/bestBook/searchBestBook")
	@ResponseBody
	public Map<String, Object> searchNotice(SearchVO vo) {
		//HashMap:key,value로 값을 저장
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		
		//vo의 selectOptValOne에 "bestBook"데이터를 저장
		vo.setSelectOptValOne("bestBook");
		
		//검색한 결과의 수를 가져오기
		int listcount = bestBookService.getBbListCount(vo);

		//vo에 저장된 값들을 searchVo에 넣는다.
		SearchVO searchVO = SearchVO.builder().startDt(vo.getStartDt()).endDt(vo.getEndDt()).selectOptValOne("bestBook").selectOptValTwo(vo.getSelectOptValTwo()).selectOptValThree(vo.getSelectOptValThree()).searchVal(vo.getSearchVal()).page(vo.getPage()).listcount(listcount).build();

		//검색조건들을 포함한 검색 결과를 reList에 다시 담는다
		List<GoodsListVO> reList = bestBookService.getBestBook(searchVO);

		resultMap.put("reList", reList);
		resultMap.put("maxPage", searchVO.getMaxpage());//최대페이지
		resultMap.put("page", searchVO.getPage());//현재페이지
		resultMap.put("startpage", searchVO.getStartpage());//시작페이지
		resultMap.put("endpage", searchVO.getEndpage());//마지막페이지

		return resultMap;
	}
	
	/* 상세페이지 */
	//물품상세 페이지 가기(목록페이지의 검색값전달)
	@PostMapping("/bestBookList/bestBookDetail") 
	public String detailGoodsSearch(String gdNo,SearchVO searchVO,RedirectAttributes redirectAttributes){
	  
	 redirectAttributes.addFlashAttribute("searchVO", searchVO);
	  
	return "redirect:/bestBook/bestBookDetail/"+gdNo;
	}
		
		
	//베스트도서상세 페이지 가기
	@GetMapping("/bestBook/bestBookDetail/{gdNo}")
	public String getBestDtl(@PathVariable String gdNo,Model model) throws IOException {
		
		//하나의 물품정보 가져오기
		GoodsListVO goodsVO = bestBookService.getBestDtl(gdNo);
		
		//상품이미지(BLOB)가 있다면
		if(goodsVO.getGdImg() != null) {
			//goodsVo에 gdImg에 String으로 변환된 gdImg값을 넣어라
			goodsVO.setGdImgStr( new String(Base64.encodeBase64(goodsVO.getGdImg()),"UTF-8"));
		}
		//상세설명파일이름(BLOB)이 있다면
		if(goodsVO.getGdDetl() != null) {
			//goodsVo에 gdDetlStr에 String으로 변환된 gdDetl값을 넣어라
			goodsVO.setGdDetlStr(new String(Base64.encodeBase64(goodsVO.getGdDetl()),"UTF-8"));
		}
		//goodVo의값을 goodsVo란 이름으로 넣어라
		model.addAttribute("goodsVO", goodsVO);
		
		return "/userBook/bestBookDetail";
	}
	
//	//외국 도서 상세 페이지 연결
//	@GetMapping("/bestBook/bestBookDetail/{gdNo}")
//	public String getForeignDtl(@PathVariable String gdNo,Model model) throws IOException {
//		
//		//하나의 물품정보 가져오기
//		GoodsListVO goodsVO = bestBookService.getBestDtl(gdNo);
//		
//		//상품이미지(BLOB)가 있다면
//		if(goodsVO.getGdImg() != null) {
//			//goodsVo에 gdImg에 String으로 변환된 gdImg값을 넣어라
//			goodsVO.setGdImgStr( new String(Base64.encodeBase64(goodsVO.getGdImg()),"UTF-8"));
//		}
//		//상세설명파일이름(BLOB)이 있다면
//		if(goodsVO.getGdDetl() != null) {
//			//goodsVo에 gdDetlStr에 String으로 변환된 gdDetl값을 넣어라
//			goodsVO.setGdDetlStr(new String(Base64.encodeBase64(goodsVO.getGdDetl()),"UTF-8"));
//		}
//		//goodVo의값을 goodsVo란 이름으로 넣어라
//		model.addAttribute("goodsVO", goodsVO);
//		
//		return "/userBook/bestBookDetail";
//	}
//	
//	// 국내도서 상세 페이지 연결
//	@GetMapping("/bestBook/bestBookDetail/{gdNo}")
//	public String getBestDtl(@PathVariable String gdNo,Model model) throws IOException {
//		
//		//하나의 물품정보 가져오기
//		GoodsListVO goodsVO = bestBookService.getBestDtl(gdNo);
//		
//		//상품이미지(BLOB)가 있다면
//		if(goodsVO.getGdImg() != null) {
//			//goodsVo에 gdImg에 String으로 변환된 gdImg값을 넣어라
//			goodsVO.setGdImgStr( new String(Base64.encodeBase64(goodsVO.getGdImg()),"UTF-8"));
//		}
//		//상세설명파일이름(BLOB)이 있다면
//		if(goodsVO.getGdDetl() != null) {
//			//goodsVo에 gdDetlStr에 String으로 변환된 gdDetl값을 넣어라
//			goodsVO.setGdDetlStr(new String(Base64.encodeBase64(goodsVO.getGdDetl()),"UTF-8"));
//		}
//		//goodVo의값을 goodsVo란 이름으로 넣어라
//		model.addAttribute("goodsVO", goodsVO);
//		
//		return "/userBook/bestBookDetail";
//	}
//	
//	
//
}
