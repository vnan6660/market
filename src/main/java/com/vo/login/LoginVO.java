package com.vo.login;
import java.util.Date;

/**
 * 로그인 VO
 * 생성자 : 김소연
 * 생성일 : 2021.11.30
 *
 */
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginVO {

	private String csNo;
	private String cartNo;
	private String csGrade;
	private String csId;
	private String csPs;
	private String csNm;
	private String csAddr;
	private String csPhone;
	private Date createDate;
}
