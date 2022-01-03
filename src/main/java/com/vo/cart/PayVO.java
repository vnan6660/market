package com.vo.cart;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 장바구니 구매하기 위한 VO
 * 생성자 : 김혜경
 * 생성일 : 2022.1.3
 */

@Getter
@Setter
@NoArgsConstructor
public class PayVO {
	
	private String odNo;//주문번호
	private String cartNo;//장바구니 번호
	private String csNo;//고객번호
	private String csNm;//고객이름
	private String gdNo;//상품번호
	private String gdQty;//상품수량
	private String odAmt;//상품가격

	
	
}
