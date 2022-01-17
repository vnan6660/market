package com.vo.orderMgt;

import lombok.Setter;

import com.vo.orderInfo.OrderInfoVO;

import lombok.Getter;

@Getter
@Setter
public class OrderWrapVO extends OrderInfoVO{
	private String csId; //고객아이디
	private String csNm; //이름
}
