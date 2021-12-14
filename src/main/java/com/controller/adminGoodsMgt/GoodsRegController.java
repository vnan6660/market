package com.controller.adminGoodsMgt;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.adminGoodsMgt.GoodsRegService;
import com.vo.common.CmmnVO;

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

}
