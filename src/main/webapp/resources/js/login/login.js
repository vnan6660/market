/**
*생성자 : 김소연
*생성일 : 2021.11.29
*로그인
*/

$(function(){
	attchEvent();
	
	//회원가입 년도 생성
	var date = new Date();
	var selYear = date.getFullYear();
	
	// 현재년도를 기준으로 호출
	getYears(selYear);
	
	// 현재년도를 select함
	$('#yearBox').val(selYear);
	
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
		location.href = "/login/joinPage";
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

/*
*회원가입 년도 생성
*생성자 : 김혜경
*생성일 : 2021.12.06
*/
function getYears(getY){
	// 기존option을 삭제함
	$("#yearBox option").remove();
	
	//올해 기준으로 -50년을 보여줌.
	var stY = Number(getY)-50;
	var edY = Number(getY);
	for(var y = stY; y <= edY; y++){
		$('#yearBox').append("<option value='"+ y + "'>" + y + "년" + "</option>");
	}
}

