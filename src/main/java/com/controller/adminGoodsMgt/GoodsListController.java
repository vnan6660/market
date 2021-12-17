package com.controller.adminGoodsMgt;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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

import com.service.adminGoodsMgt.GoodsListService;
import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.adminGoodsMgt.GoodsRegVO;

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
		
		//물품목록리스트 가져오기
		List<GoodsListVO> list =  goodsListService.getGoodsList();
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
			
			if (list.get(i).getGdImg() != null) {
				String gdImgStr = new String(Base64.encodeBase64(list.get(i).getGdImg()),"UTF-8");
				vo.setGdImgStr(gdImgStr);
			}
			reList.add(i,vo);
		}
		
		model.addAttribute("reList", reList);
		
		return "/adminGoodsMgt/goodsList";
	}
	
	//물품상세 페이지 가기
	@GetMapping("/goodsList/detailGoods/{gdNo}")
	public String detailGoods(@PathVariable String gdNo,Model model) throws IOException {
		
		//하나의 물품정보 가져오기
		GoodsListVO goodsVO = goodsListService.getDetailGoods(gdNo);
		
		if(goodsVO.getGdImg() != null) {
			goodsVO.setGdImgStr( new String(Base64.encodeBase64(goodsVO.getGdImg()),"UTF-8"));
		}
		if(goodsVO.getGdDetl() != null) {
			goodsVO.setGdDetlStr(new String(Base64.encodeBase64(goodsVO.getGdDetl()),"UTF-8"));
		}
		
		model.addAttribute("goodsVO", goodsVO);
		
		return "/adminGoodsMgt/goodsDetail";
	}
	
	//물품상세 수정 하기
	@PostMapping("/goodsList/updateGoods")
	@ResponseBody
	public void updateGoods(GoodsRegVO vo) throws IOException {
		
		if (!"".equals(vo.getGdImgFile().getOriginalFilename())) {
			vo.setGdImg(vo.getGdImgFile().getBytes());
		}
		
		if (!"".equals(vo.getGdDetlFile().getOriginalFilename())) {
			vo.setGdDetl(vo.getGdDetlFile().getBytes());
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
	public void showGoods(@RequestParam(value = "showNoList[]",required = false) ArrayList<String> showNoList) {
		goodsListService.showGoods(showNoList);
	}
	
	
}
