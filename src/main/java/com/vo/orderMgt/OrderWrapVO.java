package com.vo.orderMgt;

import lombok.Setter;

import com.vo.orderInfo.OrderInfoVO;

import lombok.Getter;

/**
 * 주문Wrap VO
 * 생성자 : 김소연
 * 생성일 : 2022.01.17
 *
 */
@Getter
@Setter
public class OrderWrapVO extends OrderInfoVO{
	private String csId; //고객아이디
	private String csNm; //이름
}
