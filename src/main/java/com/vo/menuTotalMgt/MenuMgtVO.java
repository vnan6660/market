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
	private String menuId;//메뉴아이디
	private String menuNm;//메뉴이름
	private String menuCd;//메뉴코드
	private String menuUpCd;//메뉴상위코드
	private int menuSn;//메뉴정렬순서
	private String adminYn;//관리자메뉴노출여부
	private String userYn;//사용자메뉴노출여부
	
	private String onlyUserYn = "f";
	
	List optList;
	String authSelect;

}
