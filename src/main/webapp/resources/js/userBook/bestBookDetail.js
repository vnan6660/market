/*
**생성자 : 김혜경
**생성일 : 2021.12.21
**베스트도서 js
*/
var searchParam = {};
var nowPage = 1; //처음페이지는 1페이지
$(function(){
	//목록버튼 누르면 실행
	$("#bestBookListBtn").click(function() {
		$("#searchForm").attr("action","/bestBook/bestBookPage");
		$("#searchForm").attr("method","post");
		$("#searchForm").submit();
	});
});

