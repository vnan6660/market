package com.vo.adminGoodsMgt;

import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

/**
 * 물품등록 VO
 * 생성자 : 김소연 
 * 생성일 : 2021.12.15
 * 수정자 : 김혜경
 * 생성일 : 2021.12.21
 */

@Getter
@Setter
public class GoodsRegVO {
	
	private String gdNo;//상품번호
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
	private byte[] gdImg;//상품이미지(BLOB)
	private byte[] gdDetl;//상세설명(BLOB)
	private String gdDetlNm;//상세설명파일이름
	private Date gdRegdate;//상품생성날짜
	private String gdPrice;//상품가격
	private MultipartFile gdImgFile; 
	private MultipartFile gdDetlFile;
	
}
