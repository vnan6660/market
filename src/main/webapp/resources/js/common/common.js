/*
*생성자 : 김소연
*생성일 : 2021.11.27
*공통
*/
var startDt;
var endDt;
var searchParam;
$(function() {
	init();
});

/*페이지 로딩될때 즉시 실행시킬 것*/
var init = function() {
	var mainHeight = $("#contentsMain, #contents").outerHeight(true);
	$("#sideUlWrap").css("height", mainHeight + "px");
}

var goHome = function(val) {
	if (val == 0) {
		location.href = "/adminMain";
	} else {
		if (val == 1 || val == 2 || typeof val == 'undefined' || val == '') {
			location.href = "/";
		}
	}
}

//로그인 페이지로 가기
var goLogin = function() {
	location.href = "/login/loginPage";
}

//로그아웃 실행
var goLogout = function() {
	$.ajax({
		url: '/login/getLogout',
		type: 'GET',
		success: function() {
			location.href = "/";
		}
	});
}
