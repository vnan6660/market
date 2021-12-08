/*
*생성자 : 김소연
*생성일 : 2021.11.27
*공통
*/


var goHome = function() {
	location.href = "/";
}

var goLogin = function() {
	location.href = "/login/loginPage";
}

var goLogout = function() {
	/*location.href = "/";*/
	$.ajax({
		url:'/login/getLogout',
		type:'GET',
		success:function(){
			location.href = "/";
		}
		
	});
}
