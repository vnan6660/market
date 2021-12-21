package com.vo.common;

import java.util.Date;

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
	
	private String startDt;
	private String endDt;
	private String selectOptValOne;
	private String selectOptValTwo;
	private String selectOptValThree;
	private String searchVal;

	private int page;
	private int limit = 10;
	private int startpage;
	private int endpage;
	private int maxpage;
	private int startCount;
	private int endCount;
	
	@Builder
	public SearchVO(String startDt,String endDt,String selectOptValOne,String selectOptValTwo,String selectOptValThree,String searchVal,int page, int listcount) {
		this.startDt = startDt;
		this.endDt = endDt;
		this.selectOptValOne = selectOptValOne;
		this.selectOptValTwo = selectOptValTwo;
		this.selectOptValThree = selectOptValThree;
		this.searchVal = searchVal;
		this.page = page;
		this.startCount = (this.page- 1) * this.limit + 1;// 페이지가 1 이면 1 
		this.endCount =  this.page * this.limit;  // 페이지가 1 이면 10
		this.startpage = ((this.page - 1) / 10) * 10 + 1;// 시작 페이지수
		this.endpage = this.startpage + 10 - 1;// 시작 페이지수
		this.maxpage = (listcount + this.limit - 1) / this.limit;// (1 + 9) / 10
		
		if (this.endpage > this.maxpage) {
			this.endpage = this.maxpage;
		}
	}
	
}
