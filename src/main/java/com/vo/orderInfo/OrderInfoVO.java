package com.vo.orderInfo;


import lombok.Getter;
import lombok.Setter;

/**
 * 주문정보 VO
 * 생성자 : 김소연
 * 생성일 : 2021.12.22
 *
 */
@Getter
@Setter
public class OrderInfoVO {
	private String odNo;/* 주문번호 */
	private String trNo;/* 배송번호 */
	private String csNo;/* 고객번호 */
	private String gdQty;/* 상품갯수 */
	private String odAmt;/* 주문금액 */
	private String trDate;/* 배송날짜 */
	private String odDate;/* 주문날짜 */
	private String odState;/* 주문상태 */
	private String gdNm;/* 상품이름 */
	
	private String rcNm;/* 수취인이름 */
	private String rcPhone;/* 수취인휴대폰번호 */
	private String rcEmail;/* 수취인이메일 */
	private String rcAddrOne;/* 수취인기본주소 */
	private String rcAddrTwo;/* 수취인상세주소 */
}
