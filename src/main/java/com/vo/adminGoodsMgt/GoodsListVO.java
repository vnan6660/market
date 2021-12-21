package com.vo.adminGoodsMgt;

import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 물품목록 VO
 * 생성자 : 김소연 
 * 생성일 : 2021.12.16
 * 수정자 : 김혜경
 * 생성일 : 2021.12.21
 */

@Getter
@Setter
@NoArgsConstructor
public class GoodsListVO {
	
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
	private String gdYn;//상품개시
	private String gdGpNm;//상품구분이름
	private String gdSpNm;//상품분류이름
	private Date gdRegdate;//상품생성날짜
	private String gdPrice;//상품가격
	private byte[] gdImg;//상품이미지(BLOB)
	private byte[] gdDetl;//상세설명(BLOB)
	
	private MultipartFile gdImgFile; 
	private MultipartFile gdDetlFile;
	
	private String gdImgStr;
	private String gdDetlStr;
	
}
