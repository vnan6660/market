/**
*생성자 : 김소연
*생성일 : 2021.11.29
*로그인
*/

$(function(){
	attchEvent();
});

var attchEvent = function(){
	$("#loginBtn").click(function(){
		wrapValidation();
		login();
	});
	
	$("#signUpBtn").click(function(){
		location.href = "/signUp";
	});
}


var wrapValidation = function(){
	var idCheck = $("#idCheck").val();
	var passCheck = $("#passCheck").val();
	
	
	
	if(idCheck == "" && passCheck == ""){
		$("#validCheckText").text("아이디와 비밀번호를 입력해주세요");
	}else if(typeof idCheck == "undefined" || idCheck == "" || idCheck == null){
		$("#validCheckText").text("아이디를 입력해주세요");
	}else if(typeof passCheck == "undefined" || passCheck == "" || passCheck == null){
		$("#validCheckText").text("비밀번호를 입력해주세요");
	}else{
		$("#validCheckText").text("");
	}
	
}

var login = function(){
	console.log("아직로그인기능구현못함");
}