package com.vo.login;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JoinVO {

	private String csNo; //고객번호
	private String csGrade; //고객구분
	private String csId; //고객아이디
	private String csPs; //비밀번호
	private String csNm; //이름
	private String csAddrOne; //주소 앞부분
	private String csAddrTwo; //주소 뒷부분
	private String csBirthYear; //생일 년도
	private String csBirthMonth; //생일 월
	private String csBirthDay; //생일 일
	private String csPhone; //핸드폰번호
	private String csEmail; //이메일
	
}
