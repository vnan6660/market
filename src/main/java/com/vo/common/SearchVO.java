package com.vo.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchVO {
	
	private String selectOptVal;
	private String selectUserGradeOpt;
	private String selectUserInfoOpt;
	private String searchVal;

	private int page;
	private int limit = 10;
	private int startpage;
	private int endpage;
	private int maxpage;
	private int startCount;
	private int endCount;
	
	public SearchVO(String searchVal,String selectOptVal,int page, int listcount) {
		this.searchVal = searchVal;
		this.selectOptVal = selectOptVal;
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
