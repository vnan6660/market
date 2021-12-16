package com.vo.adminGoodsMgt;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 물품목록 VO
 * 생성자 : 김소연 
 * 생성일 : 2021.12.16
 */

@Getter
@Setter
@NoArgsConstructor
public class GoodsListVO {
	
	private String gdNo;//상품번호(나중에 문자열 숫자열 섞어서 넣기)
	private String gdGp;//상품구분
	private String gdSp;//상품분류
	private String gdNm;//상품이름
	private String gdCnt;//상품재고
	private String gdPage;//상품페이지
	private String gdThick;//상품두께
	private String gdWr;//상품작가
	private String gdPb;//상품출판사
	private String gdDc;//상픔설명
	private String gdYn;//상품개제
	private MultipartFile gdImgFile; //상품이미지(BLOB)
	private MultipartFile gdDetlFile;//상세설명(BLOB)
	
	private byte[] gdImg;
	private byte[] gdDetl;
	
	private String gdImgStr;
	private String gdDetlStr;
	
}
