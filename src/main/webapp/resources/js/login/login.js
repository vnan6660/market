/**
*생성자 : 김소연
*생성일 : 2021.11.29
*로그인
*/

$(function() {
	attchEvent();

	/**
	*회원가입 생년월일 년도 selectBox만들기
	*생성자 : 김혜경
	*생성일 : 2021.12.06
	*/
	var date = new Date();//회원가입 년도 생성
	var selYear = date.getFullYear();
	getYears(selYear);// 현재년도를 기준으로 호출
	$('#yearBox').val(selYear);// 현재년도를 select함
	
	/**
	*회원가입 비밀번호 유효성검사 체크
	*생성자 : 김혜경
	*생성일 : 2021.12.07
	*/
	$("#csPs").focusout(function(){
		psChk();
	});
	
	$("#csPsConfirm").focusout(function(){
		csPwConfirm();
	});

});

var attchEvent = function() {
	$("#loginBtn").click(function() {
		var idCheck = $("#idCheck").val();
		var passCheck = $("#passCheck").val();
		if (wrapValidation(idCheck, passCheck)) {
			login(idCheck, passCheck);
		}
	});


	//회원가입페이지로 이동
	$("#signUpBtn").click(function() {
		location.href = "/login/joinPage";
	});

	$("#joinBtn").click(function() {
		doJoin();
	});
}

/*
*회원가입 수행
*생성자 : 김혜경
*생성일 : 2021.12.06
*/
var doJoin = function() {
	var csId = $("#csId").val();
	var csPs = $("#csPs").val();
	var csNm = $("#csNm").val();
	var csPhoneOne = $("#csPhoneOne").val();
	var csPhoneTwo = $("#csPhoneTwo").val();
	var csPhoneThree = $("#csPhoneThree").val();
	var csEmailOne = $("#csEmailOne").val();
	var csEmailTwo = $("#csEmailTwo").val();
	var csAddrOne = $("#csAddrOne").val();
	var csAddrTwo = $("#csAddrTwo").val();
	var csAddrTwo = $("#csAddrTwo").val();
	var csBirthYear = $("#yearBox").val();
	var csBirthMonth = $("#month").val();
	var csBirthDay = $("#day").val();

	var data = {};
	data.csId = csId;
	data.csPs = csPs;
	data.csNm = csNm;
	data.csPhoneOne = csPhoneOne;
	data.csPhoneTwo = csPhoneTwo;
	data.csPhoneThree = csPhoneThree;
	data.csEmailOne = csEmailOne;
	data.csEmailTwo = csEmailTwo;
	data.csAddrOne = csAddrOne;
	data.csAddrTwo = csAddrTwo;
	data.csBirthYear = csBirthYear;
	data.csBirthMonth = csBirthMonth;
	data.csBirthDay = csBirthDay;

	$.ajax({
		url: "/login/getJoin",
		type: "POST",
		datatype: 'JSON',
		contentType: 'application/json',
		data: JSON.stringify(data),
		success: function() {
			alert("회원가입되었습니다.");
			location.href = "/";
		},
		error: function() {
		}
	});
}

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

var login = function(idCheck, passCheck) {
	idCheck;
	passCheck;
	$.ajax({
		url: '/get/getLogin',
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

/*
*회원가입 년도 생성
*생성자 : 김혜경
*생성일 : 2021.12.06
*/
function getYears(getY) {
	// 기존option을 삭제함
	$("#yearBox option").remove();

	//올해 기준으로 -50년을 보여줌.
	var stY = Number(getY) - 50;
	var edY = Number(getY);
	for (var y = stY; y <= edY; y++) {
		$('#yearBox').append("<option value='" + y + "'>" + y + "년" + "</option>");
	}
}

/*
*회원가입 id 중복체크
*생성자 : 김혜경
*생성일 : 2021.12.07
*/
function idChk(){
	var data = {};
	var chkCsId = $("#csId").val(); 
	data.csId = chkCsId;
	
	var idOnlyEngNum = /^(?=.*?[a-z])(?=.*?[0-9]).{4,16}$/;
	
	//id길이가 3자리가 넘고 정규표현식이 맞으면(true) ajax수행
	if(chkCsId.length > 3 && idOnlyEngNum.test(chkCsId)==true){
		$.ajax({
				url: '/login/idCheck',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(data),
				dataType: 'json',
				success: function(data) {
					if(data == 0){//cnt가 0이면(DB에 저장된 id개수가 0이면)
						if($("#csId").val() == ""){
							alert("아이디를 입력해주세요");
							return false;// 아무것도 진행하지 말아라
						}else{
							alert("사용 가능한 아이디입니다.");
							$("#joinBtn").removeAttr("disabled");
							$("#csIdCheck").text("사용 가능한 아이디입니다.").css("color", "green");
						}
					}else if(data == 1){//cnt가 0이 아니면
						alert("이미 사용중인 아이디입니다.");
						$("#joinBtn").attr("disabled","disabled");
						$("#csId").val("");
						$("#csIdCheck").text("이미 사용중인 아이디입니다.").css("color", "red");
					}
				},
				error: function() {
				}
			});
		
	}else{
		alert("영문소문자/숫자를 사용하여 4~16자의 아이디를 만들어 주세요.");
		$("#csId").val("");
	}
}

/*
*회원가입 비밀번호 체크
*생성자 : 김혜경
*생성일 : 2021.12.07
*/
function psChk(){
	var chkCsPs = $("#csPs").val();
	var pwOnlyEngNumSpecial = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
	//비밀번호가 8자리가 넘고 정규식이 맞으면 비밀번호 통과
	if(chkCsPs.length > 7 && pwOnlyEngNumSpecial.test(chkCsPs)==true){
		$("#csPwCheck").text("사용 가능한 비밀번입니다.").css("color", "green");
	}else{
		alert("영문소문자/숫자/특수문자 조합의 8자~16자 비밀번호를 입력해주세요.")
		$("#csPwCheck").text("영문소문자/숫자/특수문자 조합의 8자~16자 비밀번호를 입력해주세요.").css("color", "red");
		$("#csPs").val("");
	}
	
}

/*
*회원가입 비밀번호 재확인
*생성자 : 김혜경
*생성일 : 2021.12.07
*/
function csPwConfirm(){
	var chkCsPs = $("#csPs").val();
	var csPsConfirm = $("#csPsConfirm").val();
	
	if(chkCsPs == csPsConfirm){ //비밀번호가 같다면
		$("#csPwConfirm").text("비밀번호가 같습니다.").css("color", "green");
	}else{ //비밀번호가 다르다면	
		$("#csPwConfirm").text("비밀번호가 다릅니다. 다시 확인해주세요.").css("color", "red");
		$("#joinBtn").attr("disabled","disabled");
	}
}

/*
*회원가입 이메일 중복확인
*생성자 : 김혜경
*생성일 : 2021.12.07
*/
function emailChk(){
	var csEmailOne = $("#csEmailOne").val();
	var csEmailTwo = $("#csEmailTwo").val();
	
	var csEmail = csEmailOne+csEmailTwo;
	console.log(csEmail);
	
	if(csEmail){
		$("#csEmailChk").text("사용가능한 이메일입니다.");
	}else{
		$("#csEmailChk").text("존재하는 이메일입니다. 다시 입력해주세요.");
	}
}

/*
*회원가입 만14세 미만 가입 금지
*생성자 : 김혜경
*생성일 : 2021.12.07
*/
/*function noJoin(){
	
}*/








