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
	var idCheck = $("#idCheck").val();
	var passCheck = $("#passCheck").val();
		if(wrapValidation(idCheck,passCheck)){
			login(idCheck,passCheck);
		}
	});
	
	
	//회원가입
	$("#signUpBtn").click(function(){
		
	});
}


var wrapValidation = function(idCheck,passCheck){
	var returnVal = false;
	
	if(idCheck == "" && passCheck == ""){
		$("#validCheckText").text("아이디와 비밀번호를 입력해주세요");
		$("#idCheck").focus();
	}else if(typeof idCheck == "undefined" || idCheck == "" || idCheck == null){
		$("#validCheckText").text("아이디를 입력해주세요");
		$("#idCheck").focus();
	}else if(typeof passCheck == "undefined" || passCheck == "" || passCheck == null){
		$("#validCheckText").text("비밀번호를 입력해주세요");
		$("#passCheck").focus();
	}else{
		$("#validCheckText").text("");
		returnVal = true;
	}
	return returnVal;
}

var login = function(idCheck,passCheck){
	idCheck;
	passCheck;
	$.ajax({
		url: '/get/getLogin',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				"csId" : idCheck,
				"csPs": passCheck
			}),
			dataType: 'json',
			success: function(res) {
				res == "0" ? $("#validCheckText").text("아이디 또는 비밀번호가 일치하지 않습니다.") :location.href = '/'; 
			}
	});
	
	
}
