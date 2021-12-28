package com.controller.adminGoodsMgt;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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
import org.springframework.web.servlet.support.RequestContextUtils;

import com.service.adminGoodsMgt.GoodsListService;
import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.adminGoodsMgt.GoodsRegVO;
import com.vo.common.CmmnVO;
import com.vo.common.SearchVO;

/**
 * 물품목록 Controller
 * 생성자 : 김소연 
 * 생성일 : 2021.12.16
 */

@Controller
public class GoodsListController {
	
	@Autowired
	private GoodsListService goodsListService;
	
	//물품목록 페이지가기
	@RequestMapping("/goodsList/goodsListPage")
	public String goodsListPage(Model model) throws IOException {
		
		 //현재월 첫번째 일자
		 String startDt= LocalDate.now().with(TemporalAdjusters.firstDayOfMonth()).format(DateTimeFormatter.ISO_DATE);
		 
		 //현재 일자
		 String endDt = LocalDate.now().format(DateTimeFormatter.ISO_DATE);
		
		
		SearchVO svo = SearchVO.builder().startDt(startDt).endDt(endDt).build();
		
		int listcount = goodsListService.getGoodsListCount(svo);
		SearchVO searchVO = SearchVO.builder().startDt(startDt).endDt(endDt).page(1).listcount(listcount).build();
		
		//물품목록리스트 가져오기
		List<GoodsListVO> list =  goodsListService.getGoodsList(searchVO);
		List<GoodsListVO> reList = new ArrayList<GoodsListVO>();
		
		for (int i = 0; i < list.size(); i++) {
			GoodsListVO vo = new GoodsListVO();
			
			vo.setGdNo(list.get(i).getGdNo());
			vo.setGdGp(list.get(i).getGdGp());
			vo.setGdSp(list.get(i).getGdSp());
			vo.setGdNm(list.get(i).getGdNm());
			vo.setGdCnt(list.get(i).getGdCnt());
			vo.setGdYn(list.get(i).getGdYn());
			vo.setGdPrice(list.get(i).getGdPrice());
			vo.setGdGpNm(list.get(i).getGdGpNm());
			vo.setGdSpNm(list.get(i).getGdSpNm());
			
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
		
		return "/adminGoodsMgt/goodsList";
	}
	
	//목록페이지 가기
	@PostMapping(value = "/goodsList/goodsListPage")
	public String goGoodsListPage(SearchVO searchVO,Model model){
		model.addAttribute("searchVO", searchVO);
		model.addAttribute("goList", "t");
		return "/adminGoodsMgt/goodsList";
		
	}
	
	/* 물품 등록 페이지 이동 */
	@RequestMapping("/goodsReg/goodsRegPage")
	public String goodsRegPage() {
		return "/adminGoodsMgt/goodsReg";
	}

	//상품구분에따는 상품분류 가져오기
	@GetMapping("/goodsReg/goodsSeparate")
	@ResponseBody
	public List<CmmnVO> goodsSeparate(@RequestParam Map<String, Object> param, Model model) {

		String goodsGroup = String.valueOf(param.get("goodsGroup"));
		List<CmmnVO> separate = goodsListService.getGoodsSeparate(goodsGroup);

		return separate;

	}
	
	//상품이미지,상세설명의 파일을 포함한 상품등록하기
	@PostMapping("/goodsReg/setGoodsReg")
	@ResponseBody
	public void setGoodsReg(GoodsRegVO vo) throws IOException {
		
		if (!"".equals(vo.getGdImgFile().getOriginalFilename())) {
			vo.setGdImg(vo.getGdImgFile().getBytes());
		}
		
		if (!"".equals(vo.getGdDetlFile().getOriginalFilename())) {
			vo.setGdDetl(vo.getGdDetlFile().getBytes());
			vo.setGdDetlNm(vo.getGdDetlFile().getOriginalFilename());
		}
		goodsListService.setGoodsReg(vo);
	}
	
	
	
	//물품상세 페이지 가기
	@GetMapping("/goodsList/detailGoods/{gdNo}") 
	public String detailGoods(@PathVariable String gdNo, Model model, HttpServletRequest request) throws IOException {

		// 하나의 물품정보 가져오기
		GoodsListVO goodsVO = goodsListService.getDetailGoods(gdNo);

		if (goodsVO.getGdImg() != null) {
			goodsVO.setGdImgStr(new String(Base64.encodeBase64(goodsVO.getGdImg()), "UTF-8"));
		}
		if (goodsVO.getGdDetl() != null) {
			goodsVO.setGdDetlStr(new String(Base64.encodeBase64(goodsVO.getGdDetl()), "UTF-8"));
		}

		model.addAttribute("goodsVO", goodsVO);

		Map<String, ?> flashMap = RequestContextUtils.getInputFlashMap(request);
		SearchVO searchVO = new SearchVO();
		if (flashMap != null) {

			searchVO = (SearchVO) flashMap.get("searchVO");
		}
		
		model.addAttribute("searchVO", searchVO);

		return "/adminGoodsMgt/goodsDetail";
	}
	 
	//물품상세 페이지 가기(목록페이지의 검색값전달)
	@PostMapping("/goodsList/detailGoods") 
	public String detailGoodsSearch(String gdNo,SearchVO searchVO,RedirectAttributes redirectAttributes){
	  
	 redirectAttributes.addFlashAttribute("searchVO", searchVO);
	  
	return "redirect:/goodsList/detailGoods/"+gdNo; }
	  
	 
	
	//물품상세 수정 하기
	@PostMapping("/goodsList/updateGoods")
	@ResponseBody
	public void updateGoods(GoodsRegVO vo) throws IOException {
		
		if (!"".equals(vo.getGdImgFile().getOriginalFilename())) {
			vo.setGdImg(vo.getGdImgFile().getBytes());
		}
		
		if (!"".equals(vo.getGdDetlFile().getOriginalFilename())) {
			vo.setGdDetl(vo.getGdDetlFile().getBytes());
			vo.setGdDetlNm(vo.getGdDetlFile().getOriginalFilename());
		}
		goodsListService.updateGoods(vo);
	}
	
	//물품 삭제 하기
	@GetMapping("/goodsList/deleteGoods")
	@ResponseBody
	public void deleteGoods(@RequestParam(value = "delNoList[]",required = false) ArrayList<String> delNoList) {
		goodsListService.deleteGoods(delNoList);
	}
	
	// 물품 개시 하기
	@GetMapping("/goodsList/showGoods")
	@ResponseBody
	public void showGoods(@RequestParam(value = "showNoList[]",required = false) ArrayList<String> showNoList,@RequestParam(value = "nonShowNoList[]",required = false) ArrayList<String> nonShowNoList) {
		goodsListService.showGoods(showNoList,nonShowNoList);
	}
	
	/*물품목록 검색 */
	@GetMapping("/goodsList/searchGoodsList")
	@ResponseBody
	public Map<String, Object> searchNotice(SearchVO vo) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();

		int listcount = goodsListService.getGoodsListCount(vo);

		SearchVO searchVO = SearchVO.builder().startDt(vo.getStartDt()).endDt(vo.getEndDt()).selectOptValOne(vo.getSelectOptValOne()).selectOptValTwo(vo.getSelectOptValTwo()).selectOptValThree(vo.getSelectOptValThree()).searchVal(vo.getSearchVal()).page(vo.getPage()).listcount(listcount).build();

		List<GoodsListVO> reList = goodsListService.getGoodsList(searchVO);

		resultMap.put("reList", reList);
		resultMap.put("maxPage", searchVO.getMaxpage());
		resultMap.put("page", searchVO.getPage());
		resultMap.put("startpage", searchVO.getStartpage());
		resultMap.put("endpage", searchVO.getEndpage());

		return resultMap;
	}
	
}
