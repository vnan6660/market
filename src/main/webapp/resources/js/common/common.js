/*
*생성자 : 김소연
*생성일 : 2021.11.27
*공통
*/

//메인 페이지로 가기
var goHome = function() {
	location.href = "/";
}

//로그인 페이지로 가기
var goLogin = function() {
	location.href = "/login/loginPage";
}

//로그아웃 실행
var goLogout = function() {
	$.ajax({
		url:'/login/getLogout',
		type:'GET',
		success:function(){
			location.href = "/";
		}
	});
}
