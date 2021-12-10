package com.vo.csMgt;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

/**
 * 고객정보 VO
 * 생성자 : 김소연
 * 생성일 : 2021.12.09
 *
 */
@Setter
@Getter
public class CsInfoVO {
	private String csNo; 
	private String csGrade; 
	private String csId; 
	private String csPs;
	private String csNm; 
	private String csPhoneOne; 
	private String csPhoneTwo; 
	private String csPhoneThree; 
	private String csEmailOne; 
	private String csEmailTwo;
	private Date createDate;
	private String csAddrOne; 
	private String csAddrTwo; 
	private String csBirthYear;
	private String csBirthMonth;
	private String csBirthDay;
}
