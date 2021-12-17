/**
*생성자 : 김소연
*생성일 : 2021.11.29
*로그인
*/

$(function() {
	attchEvent();
});

var attchEvent = function() {

	//로그인 버튼 누르면 실행
	$("#loginBtn").click(function() {
		var idCheck = $("#idCheck").val();
		var passCheck = $("#passCheck").val();
		if (wrapValidation(idCheck, passCheck)) {
			login(idCheck, passCheck);
		}
	});

	//Id또는 패스워드 어느 곳이라도 엔터 실행시 로그인 실행
	$("#checkWrap").keypress(function(keyValue) {
		if (keyValue.keyCode == 13) {
			var idCheck = $("#idCheck").val();
			var passCheck = $("#passCheck").val();
			if (wrapValidation(idCheck, passCheck)) {
				login(idCheck, passCheck);
			}
		}
	});

	//회원가입페이지로 이동
	$("#signUpBtn").click(function() { //id가 csEmailOne인 selector를 클릭하면 수행
		location.href = "/login/joinPage"; //  /login/joinPage의 주소로 이동
	});

}

//로그인 validation check
var wrapValidation = function(idCheck, passCheck) {
	var returnVal = false;

	if (idCheck == "" && passCheck == "") {
		$("#validCheckText").text("아이디와 비밀번호를 입력해주세요");
		$("#idCheck").focus();
	} else if (typeof idCheck == "undefined" || idCheck == "" || idCheck == null) {
		$("#validCheckText").text("아이디를 입력해주세요");
		$("#idCheck").focus();
	} else if (typeof passCheck == "undefined" || passCheck == "" || passCheck == null) {
		$("#validCheckText").text("비밀번호를 입력해주세요");
		$("#passCheck").focus();
	} else {
		$("#validCheckText").text("");
		returnVal = true;
	}
	return returnVal;
}

//로그인 수행
var login = function(idCheck, passCheck) {
	$.ajax({
		url: '/login/getLogin',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({
			"csId": idCheck,
			"csPs": passCheck
		}),
		dataType: 'json',
		success: function(res) {
			res == "0" ? $("#validCheckText").text("아이디 또는 비밀번호가 일치하지 않습니다.") : location.href = '/';
		}
	});

}




