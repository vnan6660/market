package com.controller.adminGoodsMgt;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.adminGoodsMgt.GoodsRegService;
import com.vo.adminGoodsMgt.GoodsRegVO;
import com.vo.common.CmmnVO;

/**
 * 물품등록 Controller
 * 생성자 : 김소연 
 * 생성일 : 2021.12.14
 */

@Controller
public class GoodsRegController {

	@Autowired
	private GoodsRegService goodsRegService;

	/* 물품 등록 페이지 이동 */
	@RequestMapping("/goodsReg/goodsRegPage")
	public String goodsRegPage() {

		
		return "/adminGoodsMgt/goodsReg";
	}

	@GetMapping("/goodsReg/goodsSeparate")
	@ResponseBody
	public List<CmmnVO> goodsSeparate(@RequestParam Map<String, Object> param, Model model) {

		String goodsGroup = String.valueOf(param.get("goodsGroup"));
		List<CmmnVO> separate = goodsRegService.getGoodsSeparate(goodsGroup);

		return separate;

	}
	
	//상품이미지,상세설명의 파일을 포함한 상품등록하기
	@PostMapping("/goodsReg/setGoodsReg")
	@ResponseBody
	public void setGoodsReg(GoodsRegVO vo) throws IOException {
		
		if (!"".equals(vo.getGdImgFile().getOriginalFilename())) {
			System.out.println("상품이미지파일(1) 있음");
			System.out.println(vo.getGdImgFile().getOriginalFilename());
			vo.setGdImg(vo.getGdImgFile().getBytes());
		}
		
		if (!"".equals(vo.getGdDetlFile().getOriginalFilename())) {
			System.out.println("상세설명이미지파일(2) 있음");
			System.out.println(vo.getGdDetlFile().getOriginalFilename());
			vo.setGdDetl(vo.getGdDetlFile().getBytes());
		}
		goodsRegService.setGoodsReg(vo);
	}

}
