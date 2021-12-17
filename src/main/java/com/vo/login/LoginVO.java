package com.vo.login;
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

	private String csNo;//고객번호
	private String csGrade;//고객구분
	private String csId;//고객아이디
	private String csPs;//비밀번호
	private String csNm;//이름
}
