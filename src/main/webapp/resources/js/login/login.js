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
	
	
	//회원가입페이지로 이동
	$("#signUpBtn").click(function(){
		location.href = "/login/joinPage";
	});
	
	$("#joinBtn").click(function(){
		doJoin();
	});
}

//회원가입 수행
var doJoin = function (){
	var csId = $("#csId").val();
	console.log("csId: "+csId);
	var csPs = $("#csPs").val();
	console.log("csPs: "+csPs);
	var csNm = $("#csNm").val();
	console.log("csNm: "+csNm);
	var csPhoneOne = $("#csPhoneOne").val();
	console.log("csPhoneOne: "+csPhoneOne);
	var csPhoneTwo = $("#csPhoneTwo").val();
	console.log("csPhoneTwo: "+csPhoneTwo);
	var csPhoneThree = $("#csPhoneThree").val();
	console.log("csPhoneThree: "+csPhoneThree);
	var csEmailOne = $("#csEmailOne").val();
	console.log("csEmailOne: "+csEmailOne);
	var csEmailTwo = $("#csEmailTwo").val();
	console.log("csEmailTwo: "+csEmailTwo);
	var csAddrOne = $("#csAddrOne").val();
	console.log("csAddrOne: "+csAddrOne);
	var csAddrTwo = $("#csAddrTwo").val();
	console.log("csAddrTwo: "+csAddrTwo);
	
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
	
	$.ajax({
		url: '/login/getJoin',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(data),
			dataType: 'json',
			success: function(res) {
				alert(JSON.stringify(res));
				location.href="/";
			}
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

