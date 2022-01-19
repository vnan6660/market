package com.vo.common;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

/**
 * 물품등록 VO
 * 생성자 : 김소연 
 * 생성일 : 2021.12.14
 */

@Getter
@Setter
public class CmmnVO {
	
	private String cmGrcd; //그룹코드
	private String cmGrnm;//그룹코드명
	private String cmUpcd;//메뉴상위코드
	private String cmYn;//사용여부
	private String cmCdds;//코드설명
	private String cmcdWrt;//등록자
	private Date cmcdRegDate;//등록일


}
