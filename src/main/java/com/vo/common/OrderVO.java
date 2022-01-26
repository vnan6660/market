package com.vo.common;

import lombok.Getter;
import lombok.Setter;
/**
 * 주문 VO
 * 생성자 : 김소연 
 * 생성일 : 2022.01.26
 */
@Getter
@Setter
public class OrderVO {
	private int totalQty;
	private long totalAmt;
	private String odDate;
	private String odMonth;
	private String dateType;
}
