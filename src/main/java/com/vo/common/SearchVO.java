package com.vo.common;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchVO {
	
	private String startDt; //시작날짜
	private String endDt; //끝나는날짜
	private String selectOptValOne; //셀렉트박스값1
	private String selectOptValTwo; //셀렉트박스값2
	private String selectOptValThree; //셀렉트박스값3
	private String searchVal;//검색하는 값

	private int noLimit;
	private int page;
	private int limit = 10;
	private int startpage;//시작페이지 
	private int endpage;//끝페이지
	private int maxpage;//최대 페이지
	private int startCount; //해당페이지의 시작페이지 수 
	private int endCount;//해당페이지의 끝페이지 수
	
	@Builder
	public SearchVO(String startDt,String endDt,int noLimit,int endpage,String selectOptValOne,String selectOptValTwo,String selectOptValThree,String searchVal,int page, int listcount) {
		this.startDt = startDt;
		this.endDt = endDt;
		this.selectOptValOne = selectOptValOne;
		this.selectOptValTwo = selectOptValTwo;
		this.selectOptValThree = selectOptValThree;
		this.searchVal = searchVal;
		this.noLimit = noLimit;
		this.page = page;
		
		//noLimit란 변수가 넘어올 때 1인경우에는 전체글 조회
		if(noLimit == 0) {
			this.startCount = (this.page- 1) * this.limit + 1;// 페이지가 1 이면 1 
			this.endCount =  this.page * this.limit;  // 페이지가 1 이면 10
		}else {
			this.startCount = 1;
			this.endCount =  endpage;
		}
		this.startpage = ((this.page - 1) / 10) * 10 + 1;// 시작 페이지수
		this.endpage = this.startpage + 10 - 1;
		this.maxpage = (listcount + this.limit - 1) / this.limit;// (1 + 9) / 10
		
		if (this.endpage > this.maxpage) {
			this.endpage = this.maxpage;
		}
	}
	
}
