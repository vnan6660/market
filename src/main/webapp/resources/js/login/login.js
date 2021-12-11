/**
*생성자 : 김소연
*생성일 : 2021.11.29
*로그인
*/

$(function() {
	attchEvent();
	//이메일 직접입력 input 처음 로딩됐을때 안보이게
	$("#csEmailWriteInput").hide();
	
	//이메일 뒷부분 선택값이 직접입력이면 input박스 나오게 아니면 숨김
	$('#csEmailTwo').change(function() {
		if($("#csEmailTwo").val() == 'csEmailWrite'){
			$("#csEmailWriteInput").show();
		}else{
			$("#csEmailWriteInput").hide();
		}
	});
	
	/**
	*회원가입 생년월일 년도 selectBox만들기
	*생성자 : 김혜경
	*생성일 : 2021.12.06
	*/
	var date = new Date(); //Date생성자 생성
	var selYear = date.getFullYear(); //현재년도를 YYYY로 반환한걸 selYear변수에 넣는다
	getYears(selYear);// 현재년도를 기준으로 getYears()메서드 호출
	$('#yearBox').val(selYear);// id가 yearBox인 selector에 현재년도를 넣는다.
	$("#yearBox").focusout(function(){ //id가 csPs인 selector에서 커서가 사라지면 수행
		ageChk(); //ageChk()메서드 수행
	});
	
	/**
	*회원가입 아이디 체크
	*생성자 : 김혜경
	*생성일 : 2021.12.08
	*/
	//focusout:커서가 사라지면 수행하는 event
	$("#csId").blur(function(){ //id가 csId인 selector에서 커서가 사라지면 수행
		idChk(); //idChk()메서드 수행
	});
	
	/**
	*회원가입 비밀번호 유효성검사 체크
	*생성자 : 김혜경
	*생성일 : 2021.12.07
	*/
	//focusout:커서가 사라지면 수행하는 event
	$("#csPs").focusout(function(){ //id가 csPs인 selector에서 커서가 사라지면 수행
		psChk(); //psChk()메서드 수행
	});
	
	/**
	*회원가입 비밀번호 확인
	*생성자 : 김혜경
	*생성일 : 2021.12.07
	*/
	$("#csPsConfirm").focusout(function(){ //id가 csPsConfirm인 selector에서 커서가 사라지면 수행
		csPwConfirm(); //csPwConfirm()메서드 수행
	});

	/**
	*회원가입 이메일 중복확인
	*생성자 : 김혜경
	*생성일 : 2021.12.07
	*/
	$("#csEmailOne").focusout(function(){ //id가 csEmailOne인 selector에서 커서가 사라지면 수행
		emailChk(); //emailChk()메서드 수행
	});
	
	
	$("#csEmailWrite").on("click", function () {
		alert("aaaa");
	    $("body").append("<button name='add'>+</button>");
	  });
	
	/**
	*회원가입 이름 공백확인
	*생성자 : 김혜경
	*생성일 : 2021.12.08
	*/
	$("#csNm").focusout(function(){ //id가 csNm인 selector에서 커서가 사라지면 수행
		nameChk(); //nameChk()메서드 수행
	});
	
	/**
	*회원가입 전화번호 4자리 체크
	*생성자 : 김혜경
	*생성일 : 2021.12.10
	*/
	$("#csPhoneTwo, csPhoneThree").focusout(function(){ //id가 csPhoneTwo인 selector에서 커서가 사라지면 수행
		phoneChkFn(); //phoneChkFn()메서드 수행
	});
});

function write(){
	alert($("#csEmailWriteID option:selected").val());
}

var attchEvent = function() {
	/**
	*로그인 버튼 클릭시 수행
	*생성자 : 김소연
	*생성일 : 2021.11.29
	*/
	$("#loginBtn").click(function() {
		var idCheck = $("#idCheck").val();
		var passCheck = $("#passCheck").val();
		if (wrapValidation(idCheck, passCheck)) {
			login(idCheck, passCheck);
		}
	});


	//회원가입페이지로 이동
	$("#signUpBtn").click(function() { //id가 csEmailOne인 selector를 클릭하면 수행
		location.href = "/login/joinPage"; //  /login/joinPage의 주소로 가라
	});

	$("#joinBtn").click(function() { //id가 joinBtn인 selector를 클릭하면 수행
		doJoin(); //doJoin()메서드 수행
	});
}

/*
*회원가입 수행
*생성자 : 김혜경
*생성일 : 2021.12.06
*/
var doJoin = function() {
	var csId = $("#csId").val(); // id가 csId인 selector의 값을 .val()로 가져와 csId라는 변수에 넣는다. (이하 동일)
	var csPs = $("#csPs").val();
	var csNm = $("#csNm").val();
	var csPhoneOne = $("#csPhoneOne").val();
	var csPhoneTwo = $("#csPhoneTwo").val();
	var csPhoneThree = $("#csPhoneThree").val();
	var csPhone = csPhoneOne+csPhoneTwo+csPhoneThree;
	var csEmailOne = $("#csEmailOne").val();
	var csEmailTwo = $("#csEmailTwo").val();
	var csEmail = csEmailOne+csEmailTwo;
	var csAddrOne = $("#csAddrOne").val();
	var csAddrTwo = $("#csAddrTwo").val();
	var csBirthYear = $("#yearBox").val();
	var csBirthMonth = $("#month").val();
	var csBirthDay = $("#day").val();
	var data = {}; // 빈 객체 생성
	// 위에서 작성한 변수값을 data.속성에 넣는 작업
	data.csId = csId; 
	data.csPs = csPs;
	data.csNm = csNm;
	data.csPhone = csPhone;
	data.csEmail = csEmail;
	data.csAddrOne = csAddrOne;
	data.csAddrTwo = csAddrTwo;
	data.csBirthYear = csBirthYear;
	data.csBirthMonth = csBirthMonth;
	data.csBirthDay = csBirthDay;

	var date = new Date(); //Date생성자 생성
	var thisY = date.getFullYear(); //현재년도를 YYYY로 반환한걸 thisY변수에 넣는다
	var selectY = $("#yearBox").val(); //선택한 년도

	//필수항목들이 비어있지 않을 때 ajax를 수행
	if(csId!=""&&csPs!=""&&csNm!=""&&csPhoneOne!=""&&csPhoneTwo!=""&&csPhoneThree!=""&&csEmailOne!=""&&csEmailTwo!=""&&csBirthYear!=""&&csBirthMonth!=""&&csBirthDay!=""){
		if(thisY - selectY < 16){
			alert("만14세 미만 아동은 회원가입이 불가능합니다.");
			location.href = "/";
		}else{
			$.ajax({
				url: "/login/getJoin", //요청 url
				type: "POST", //post타입
				datatype: 'JSON', //서버에서 어떤 타입(json, html, text...)을 받을 것인지를 의미. json(key:value)형태의 데이터타입을 사용
				contentType: 'application/json', //보내는 데이터의 타입
				data: JSON.stringify(data), //요청과 함께 보낼 데이터
				success: function(resultId) { //성공했을시 수행하는 function
					if(resultId==0){
						alert("회원가입되었습니다."); //alert으로 회원가입되었습니다라는 문구 띄우기
						location.href = "/login/loginPage"; //로그인페이지로 돌아가라
					}else{
						location.href = "/"; //메인페이지로 돌아가라
					}
				},
				error: function() {
				}
			});
		}
	}else{
		alert("전체 필수입력사항들을 입력해주세요.");
	}
}
/**
	*로그인 validation check
	*생성자 : 김소연
	*생성일 : 2021.11.29
	*/
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


/**
*로그인 수행
*생성자 : 김소연
*생성일 : 2021.11.29
*/
var login = function(idCheck, passCheck) {
	idCheck;
	passCheck;
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

/*
*회원가입 년도 생성
*생성자 : 김혜경
*생성일 : 2021.12.06
*/
function getYears(selYear) { //getYears함수 파라미터로 selYear를 받는다.
	$("#yearBox option").remove(); //기존option을 삭제함
	
	var stY = Number(selYear) - 50; //올해 기준으로 -50년을 보여줌.
	var edY = Number(selYear); //마지막 년도는 올해로 설정
	for (var y = stY; y <= edY; y++) { //올해-50년 부터 올해까지 for문 돌리기
		$('#yearBox').append("<option value='" + y + "'>" + y + "년" + "</option>"); //id가 yearBox인것에 <option value="2021">2021년</option>형태 넣기
	}
}

/*
*회원가입 id 중복체크
*생성자 : 김혜경
*생성일 : 2021.12.07
*/
function idChk(){ //idChk function
	var data = {};// 빈 객체 생성
	
	// 위에서 작성한 변수값을 data.속성에 넣는 작업
	var chkCsId = $("#csId").val(); 
	data.csId = chkCsId;
	var idOnlyEngNum = /^(?=.*?[a-z])(?=.*?[0-9]).{4,16}$/; //(?=.*?[a-z])영문소문자필수, (?=.*?[0-9])숫자필수, {4,16}$4~16자
	
	var pattern = /\s/g;// 공백 체크 정규표현식 - 탭, 스페이스
	
	if(chkCsId == ""){//id가 입력되지않았을때
		$("#csIdCheck").text("아이디를 입력해주세요").css("color", "red"); //사용가능한 아이디입니다. 표시
		return false;
	}else{//id가 입력되어있을때
		//id길이가 3자리가 넘고 정규표현식이 맞으면(true) ajax수행
		if(chkCsId.length > 3 && idOnlyEngNum.test(chkCsId)==true){
			if( chkCsId.match(pattern) ) { //일치하는 내용이 있는지 확인하는 match()함수를 이용해서 공백확인
				$("#csIdCheck").text("공백이 존재합니다.").css("color", "red"); //사용가능한 아이디입니다. 표시
				return false;
			}else{
				$.ajax({
					url: '/login/idCheck', //요청 url
					type: "POST", //post타입
					datatype: 'JSON', //서버에서 어떤 타입(json, html, text...)을 받을 것인지를 의미. json(key:value)형태의 데이터타입을 사용
					contentType: 'application/json', //보내는 데이터의 타입
					data: JSON.stringify(data), //요청과 함께 보낼 데이터
					success: function(result) { //성공했을시 수행하는 function
						if(result == 0){//cnt가 0이면(DB에 저장된 id개수가 0이면)
							$("#joinBtn").removeAttr("disabled"); //회원가입버튼 활성화
							$("#csIdCheck").text("사용 가능한 아이디입니다.").css("color", "green"); //사용가능한 아이디입니다. 표시
						}else if(result == 1){//cnt가 0이 아니면
							$("#csIdCheck").text("이미 사용중인 아이디입니다.").css("color", "red");//이미 사용중인 아이디입니다. 표시
						}
					},
					error: function() {
					}
				});
			}
		//정규표현식이 맞지 않으면
		}else{
			$("#csIdCheck").text("영문소문자/숫자를 사용하여 4~16자의 아이디를 만들어 주세요.").css("color", "red");//"영문소문자/숫자를 사용하여 4~16자의 아이디를 만들어 주세요. 표시
		}
	}
}

/*
*회원가입 비밀번호 체크
*생성자 : 김혜경
*생성일 : 2021.12.07
*/
function psChk(){
	var chkCsPs = $("#csPs").val(); //id가 csPs인 선택자의 값을 chkCsPs변수에 넣는다
	//(?=.*?[a-z])영문소문자필수, (?=.*?[0-9])숫자필수, (?=.*?[#?!@$%^&*-])특수문자필수 {4,16}$4~16자
	var pwOnlyEngNumSpecial = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
	var pattern = /\s/g;// 공백 체크 정규표현식 - 탭, 스페이스
	if( chkCsPs.match(pattern) ) {//일치하는 내용이 있는지 확인하는 match()함수를 이용해서 공백확인
		$("#csPwCheck").text("공백이 존재합니다.").css("color", "red");
	}else{
		//비밀번호가 7자리가 넘고 정규식이 맞으면 비밀번호 통과
		if(chkCsPs.length > 7 && pwOnlyEngNumSpecial.test(chkCsPs)==true){
			$("#csPwCheck").text("사용 가능한 비밀번입니다.").css("color", "green"); //id csPwCheck에 text()의 내용을 넣고 색을 초록색으로 설정
		}else{
			$("#csPwCheck").text("영문소문자/숫자/특수문자 조합의 8자~16자 비밀번호를 입력해주세요.").css("color", "red"); //id csPwCheck에 text()의 내용을 넣고 색을 빨간색으로 설정
		}
	}
}

/*
*회원가입 비밀번호 재확인
*생성자 : 김혜경
*생성일 : 2021.12.07
*/
function csPwConfirm(){
	var chkCsPs = $("#csPs").val(); //id가 csPs인 선택자의 값을 chkCsPs변수에 넣는다
	var csPsConfirm = $("#csPsConfirm").val(); //id가 csPsConfirm인 선택자의 값을 csPsConfirm변수에 넣는다
	if(chkCsPs!="" && csPsConfirm!=""){
			if(chkCsPs == csPsConfirm){ //비밀번호가 같다면
			$("#csPwConfirm").text("비밀번호가 같습니다.").css("color", "green");//id csPwConfirm에 text()의 내용을 넣고 색을 초록색으로 설정
		}else{ //비밀번호가 다르다면
			$("#csPwConfirm").text("비밀번호가 다릅니다. 다시 확인해주세요.").css("color", "red");//id csPwConfirm에 text()의 내용을 넣고 색을 빨간색으로 설정
		}
	}
}

/*
*회원가입 이름확인
*생성자 : 김혜경
*생성일 : 2021.12.08
*/
function nameChk(){
	var chkName = $("#csNm").val(); //id가 csNm인 선택자의 값을 chkName변수에 넣는다
	var nmOnlyHangulEng = /^[가-힣a-zA-Z]+$/;

	if(chkName==""){
		$("#csNmConfirm").text("이름을 입력해주세요.").css("color", "red");
	}else if(!nmOnlyHangulEng.test(chkName)){
		$("#csNmConfirm").text("잘못된 이름입니다.").css("color", "red");
	}else{
		$("#csNmConfirm").text("");
	}
}

/*
*회원가입 이메일 중복확인
*생성자 : 김혜경
*생성일 : 2021.12.07
*/
function emailChk(){
	var emailOnly = /^[a-zA-Z0-9_\.\-]+$/; //﻿이메일 체크 정규표현식: 영문 대/소문자, 숫자와 특수기호(_),(-),(.)만 사용 만 가능
	var csEmailOne = $("#csEmailOne").val(); //id가 csEmailOne인 값의 내용을 csEmailOne변수에 넣는다.
	var csEmailTwo = $("#csEmailTwo").val(); //id가 csEmailTwo인 값의 내용을 csEmailTwo변수에 넣는다.
	var csEmail= csEmailOne+'@'+csEmailTwo;
	var data = {};//빈 객체 생성
	// 위에서 작성한 변수값을 'data.속성'에 넣는 작업
	data.csEmail = csEmail;
	console.log(csEmailOne);
	
	if(csEmailOne==""){//csEmailOne의 값이 비어있다면
		$("#csEmailChk").text("이메일을 입력해주세요.").css("color", "red");//이메일을 입력해주세요 띄우기
	}else if(!emailOnly.test(csEmailOne)){
		$("#csEmailChk").text("잘못된 이메일입니다.").css("color", "red");
	}else{
		$("#csEmailChk").text("");
		$.ajax({
			url: '/login/emailChk',//요청 url
			type: 'POST',//post타입
			contentType: 'application/json',//서버에서 어떤 타입(json, html, text...)을 받을 것인지를 의미. json(key:value)형태의 데이터타입을 사용
			data: JSON.stringify(data),//서버에서 어떤 타입(json, html, text...)을 받을 것인지를 의미. json(key:value)형태의 데이터타입을 사용
			dataType: 'json', //요청과 함께 보낼 데이터
			success: function(result) {//성공했을시 수행하는 function
				if(result == 0){ //DB에 저장된 이메일개수가 0개면
					$("#csEmailChk").text("사용가능한 이메일입니다.").css("color", "green");
				}else if(result == 1){//DB에 저장된 이메일이 1개있다면(DB에 있단 소리니깐 존재하는 이메일)
					$("#csEmailChk").text("존재하는 이메일입니다. 다시 입력해주세요.").css("color", "red");
				}
			}
		});
	}
}

/*
*회원가입 만14세 미만 가입 금지
*생성자 : 김혜경
*생성일 : 2021.12.07
*/
function ageChk(){
	var date = new Date(); //Date생성자 생성
	var thisY = date.getFullYear(); //현재년도를 YYYY로 반환한걸 thisY변수에 넣는다
	var selectY = $("#yearBox").val(); //선택한 년도
	if(thisY - selectY < 16){ // 올해 - 선택한년도가 16미만이면
		alert("만14세 미만 아동은 회원가입이 불가능합니다.");
	}else{
		alert("만14세 이상입니다.");
	}
}


function phoneChkFn(){
	if($("#csPhoneTwo").length<3||$("#csPhoneThree").length<3){
		$("#phoneChk").text("4자리의 숫자가 입력되어야 합니다.").css("color","red");
	}
}





