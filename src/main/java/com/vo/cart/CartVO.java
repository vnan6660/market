package com.vo.cart;

import lombok.Getter;
import lombok.Setter;

/**
 * 장바구니 VO
 * 생성자 : 김혜경
 * 생성일 : 2021.12.27
 * 수정자 : 김소연
 * 수정일 : 2022.01.19
 */

@Getter
@Setter
public class CartVO {
	
	private String cartNo;//장바구니 번호
	private String csNo;//고객번호
	private String gdNo;//상품번호
	private String gdQty;//상품수량


}
