package com.vo.menuTotalMgt;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
/**
 * 메뉴관리 VO
 * 생성자 : 김소연
 * 생성일 : 2021.11.27
 *
 */
@Getter
@Setter
public class MenuMgtVO {
	private String menuId;
	private String menuNm;
	private String menuCd;
	private String menuUpCd;
	private int menuSn;
	private String adminYn;
	private String userYn;
	
	List optList;
	String authSelect;

}
