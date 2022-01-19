package com.vo.questTotalBoard;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
/**
 * 공지사항 VO
 * 생성자 : 김소연
 * 생성일 : 2021.12.01
 *
 */
@Getter
@Setter
public class NoticeVO {
	private String ntcNo;//공지사항번호
	private String ntcSj; //제목
	private String ntcText;//내용
	private String ntcWrt;//작성자
	private Date ntcRegDate;//생성일자
	private String ntcVcnt;//조회수
}
