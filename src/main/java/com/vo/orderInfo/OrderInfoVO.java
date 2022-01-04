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
	private String odCnt;/* 상품갯수 */
	private String odAmt;/* 주문금액 */
	private String trDate;/* 배송날짜 */
	private String odDate;/* 주문날짜 */
	private String odState;/* 주문상태 */
	private String gdNm;/* 상품이름 */
}
