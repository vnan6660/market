/*
*회원정보수정 js
*생성자 : 김혜경
*생성일 : 2021.12.14
*/
$(function() {
	var mainHeight = $("#contentsWrap").outerHeight(true);
	$("#sideUlWrap").css("height", mainHeight + "px");
	
	// ================ 전화번호 ================ //
	$("#hideCsPhoneOne").hide();
	var hideCsPhoneOne = $("#hideCsPhoneOne").val();
	$('#hideCsPhoneOne').val(hideCsPhoneOne).prop("selected", true);

	// ================ 이메일 ================ //
	//이메일 직접입력 input 처음 로딩됐을때 안보이게
	$("#csEmailWriteInput").hide();

	//이메일 뒷부분 선택값이 직접입력이면 input박스 나오게 아니면 숨김
	$('#csEmailTwo').change(function() {
		if ($('#csEmailTwo').val() != "직접입력") {
			$("#csEmailWriteInput").hide();
		} else {
			$("#csEmailWriteInput").show();
		}
	});

	//@기준으로 이메일 앞/뒤 자르기
	var splitEmail = $("#hiddenEmail").val();
	splitEmail = splitEmail.split("@"); // @기준으로 잘라라
	var splitEmailOne = splitEmail[0]; //이메일 앞자리
	var splitEmailTwo = splitEmail[1]; //이메일 뒷자리
	$("#hiddenEmailTwo").hide();
	var hideCsPhoneOne = $("#hideCsPhoneOne").val();
	$("#csEmailOne").val(splitEmailOne);//csEmailOne에 이메일 앞자리 넣기
	$('#csEmailTwo').val(splitEmailTwo).prop("selected", true);//csEmailTwo에 선택한 도메인주소 넣기
	//집적입력으로 되어있는 이메일은 입력input박스와 입력한 이메일을 가져오도록 설정
	if (splitEmailTwo == "naver.com" || splitEmailTwo == "gamil.com" || splitEmailTwo == "daum.net" || splitEmailTwo == "hanmail.net" || splitEmailTwo == "kakao.com") {
	} else {
		$("#csEmailWriteInput").show();
		$('#csEmailTwo').val("직접입력").prop("selected", true);
		$("#csEmailWriteInput").val(splitEmailTwo);
	}


	// ================ 생년월일 ================ //
	//생년월일 년도 셋팅
	$("#hideBirthYear").hide();
	var birthYear = $("#hideBirthYear").val();

	//회원정보수정 생년월일 년도 selectBox만들기
	var date = new Date(); //Date생성자 생성
	var selYear = date.getFullYear(); //현재년도를 YYYY로 반환한걸 selYear변수에 넣는다
	getYears(selYear);// 현재년도를 기준으로 getYears()메서드 호출
	$('#yearBox').val(birthYear).prop("selected", true);// id가 yearBox인 selector에 현재년도를 넣는다.

	//회원정보수정 년도 생성
	function getYears(selYear) { //getYears함수 파라미터로 selYear를 받는다.
		$("#yearBox option").remove(); //기존option을 삭제함
		var stY = Number(selYear) - 50; //올해 기준으로 -50년을 보여줌.
		var edY = Number(selYear); //마지막 년도는 올해로 설정
		for (var y = stY; y <= edY; y++) { //올해-50년 부터 올해까지 for문 돌리기
			$('#yearBox').append("<option value='" + y + "'>" + y + "년" + "</option>"); //id가 yearBox인것에 <option value="2021">2021년</option>형태 넣기
		}
	}

	//생년월일 월 셋팅
	$("#hideBirtMonth").hide();
	var birthMonth = $("#hideBirtMonth").val();
	$("#month").val(birthMonth).prop("selected", true);

	//생년월일 일자 셋팅
	$("#hideBirthDay").hide();
	var birthDay = $("#hideBirthDay").val();
	$("#day").val(birthDay).prop("selected", true);

	//수정버튼 눌렀을 시 시행되는 함수
	$('#updateInfoBtn').click(function() {
		if(!updateInfo()) return; //updateInfo()가 false면 return;
		if(!emailCheck()) return; //emailCheck()가 false면 return;
		
		if (confirm('수정하시겠습니까?')) {
			$.ajax({
				url: '/myInfo/doUpdateInfo',
				type: 'POST',
				enctype: 'multipart/form-data',
				contentType: false,//false 꼭 작성해야함
				processData: false,//false 꼭 작성해야함,
				data: new FormData($('#updateInfoForm')[0]),
				success: function() {
					alert("수정되었습니다");
					location.href = "/myInfo/myInfoPage";
				},
				error: function() {
					alert("오류입니다. 관리자에게 문의해주세요");
				}
			});
		}else{//수정하시겠습니까 취소
			alert("취소되었습니다");
		}
	});
});//레디펑션 마침

//이미 사용중인 이메일인지
function emailCheck() {
	var resultVal="";
	var csId = $("#csId").val(); //아이디
	var csEmailOne = $("#csEmailOne").val();//이메일 앞자리
	var csEmailWriteInput = $("#csEmailWriteInput").val()//직접 입력한 이메일 도메인
	var csEmailTwo = $("#csEmailTwo").val();//선택한 도메인
	var csEmail = csEmailOne+'@'+csEmailWriteInput+csEmailTwo;//이메일 전체
	if(csEmailTwo == "직접입력"){
		csEmail = csEmailOne+'@'+csEmailWriteInput;
	}
	//이메일 속성추가
	$('input[id=csEmail]').attr('value', csEmail);
	var data = {};//빈 객체 생성
	data.csEmail = csEmail; //위에서 작성한 변수값을 'data.속성'에 넣는 작업
	data.csId = csId; //위에서 작성한 변수값을 'data.속성'에 넣는 작업
		
	$.ajax({
		url: '/myInfo/infoEmailChk',//요청 url
		type: 'POST',//post타입
		contentType: 'application/json',//서버에서 어떤 타입(json, html, text...)을 받을 것인지를 의미. json(key:value)형태의 데이터타입을 사용
		data: JSON.stringify(data),//서버에서 어떤 타입(json, html, text...)을 받을 것인지를 의미. json(key:value)형태의 데이터타입을 사용
		dataType: 'json', //요청과 함께 보낼 데이터
		async : false,
		success: function(result) {//성공했을시 수행하는 function
			if (result == 0) { //DB에 저장된 이메일개수가 0개면 내 자신 or 새로운 이메일
				$("#csEmailChk").text("");
				resultVal = true;
			}else{
				$("#csEmailChk").text("존재하는 이메일입니다. 다시 입력해주세요.").css("color", "red");
				resultVal = false;
			}
		},
		error: function() {
			alert("관리자에게 문의하세요");
		}
	});
	return resultVal;
}	

function updateInfo() {
	var returnValue = false;

	//유효성검사
	var pwOnlyEngNumSpecial = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/; //영소문자, 특수문자만
	var nmOnlyHangulEng = /^[가-힣a-zA-Z]+$/; //한글과 영어만
	var emailOnly = /^[a-zA-Z0-9_\.\-]+$/; //영어 대,소문자 (.)(_)(-)특수문자만
	var phonelOnly = /^(?=.*?[0-9]).{4,4}$/;//숫자만
	var pattern = /\s/g; //공백확인
	var csPs = $("#csPs").val();//비밀번호
	var csPsConfirm = $("#csPsConfirm").val();//비밀번호확인
	var csNm = $("#csNm").val();//이름
	var csPhoneOne = $("#csPhoneOne").val();//핸드폰번호 앞자리
	var csPhoneTwo = $("#csPhoneTwo").val();//핸드폰번호 중간자리
	var csPhoneThree = $("#csPhoneThree").val();//핸드폰번호 뒷자리
	var csPhone = csPhoneOne+csPhoneTwo+csPhoneThree;//핸드폰번호 전체
	var csEmailOne = $("#csEmailOne").val();//이메일 앞자리
	var csEmailWriteInput = $("#csEmailWriteInput").val()//직접 입력한 이메일 도메인
	var csEmailTwo = $("#csEmailTwo").val();//선택한 도메인
	var csEmail = csEmailOne+'@'+csEmailWriteInput+csEmailTwo;//이메일 전체
	if(csEmailTwo == "직접입력"){
		csEmail = csEmailOne+'@'+csEmailWriteInput;
	}
	//전화번호 속성추가
	$('input[id=csPhone]').attr('value', csPhone);
	//이메일 속성추가
	$('input[id=csEmail]').attr('value', csEmail);

	// ================ 비밀번호 ================ //
	//1. 빈값 안됨
	if (csPs == "") {
		$("#csPwCheck").text("비밀번호를 입력해주세요").css("color", "red");
		return returnValue;
	} else {
		$("#csPwCheck").text("");
	}

	//2. 정규식 맞는지
	if (!pwOnlyEngNumSpecial.test(csPs)) {
		$("#csPwCheck").text("형식에 알맞은 비밀번호를 입력해주세요.").css("color", "red");
		return returnValue;
	} else {
		$("#csPwCheck").text("");
	}

	//3.공백이 들어갔는지
	if (csPs.match(pattern)) {
		$("#csPwCheck").text("공백이 존재합니다.").css("color", "red");
		return returnValue;
	} else {
		$("#csPwCheck").text("");
	}

	// ================ 비밀번호 재확인 ================ //
	//1. 빈값 안됨
	if (csPsConfirm == "") {
		$("#csPwConfirm").text("비밀번호를 입력해주세요").css("color", "red");
		return returnValue;
	} else {
		$("#csPwConfirm").text("");
	}

	//2.공백이 들어갔는지
	if (csPsConfirm.match(pattern)) {
		$("#csPwConfirm").text("공백이 존재합니다.").css("color", "red");
		return returnValue;
	} else {
		$("#csPwConfirm").text("");
	}

	//3.비밀번호랑 입력값 같은지
	if (csPsConfirm != csPs) {
		$("#csPwConfirm").text("비밀번호를 다시 확인해주세요").css("color", "red");
		return returnValue;
	} else {
		$("#csPwConfirm").text("");
	}

	// ================ 이름 ================ //
	//1. 빈값 안됨
	if (csNm == "") {
		$("#csNmConfirm").text("이름을 입력해주세요").css("color", "red");
		return returnValue;
	} else {
		$("#csNmConfirm").text("");
	}

	//2. 정규식 맞는지
	if (!nmOnlyHangulEng.test(csNm)) {
		$("#csNmConfirm").text("형식에 알맞은 이름을 입력해주세요.").css("color", "red");
		return returnValue;
	} else {
		$("#csNmConfirm").text("");
	}

	//3.공백이 들어갔는지
	if (csNm.match(pattern)) {
		$("#csNmConfirm").text("공백이 존재합니다.").css("color", "red");
		return returnValue;
	} else {
		$("#csNmConfirm").text("");
	}

	// ================ 전화번호 ================ //
	//1.빈값 안됨
	if (csPhoneTwo == "" || csPhoneThree == "") {
		$("#phoneChk").text("전화번호를 입력해주세요").css("color", "red");
		return returnValue;
	} else {
		$("#phoneChk").text("");
	}

	//2.전화번호 정규식 맞는지
	if (!phonelOnly.test(csPhoneTwo) || !phonelOnly.test(csPhoneThree)) {
		$("#phoneChk").text("형식에 알맞은 전화번호를 입력해주세요.").css("color", "red");
		return returnValue;
	} else {
		$("#phoneChk").text("");
	}

	//3.공백이 들어갔는지
	if (csPhoneTwo.match(pattern) || csPhoneThree.match(pattern)) {
		$("#phoneChk").text("공백이 존재합니다.").css("color", "red");
		return returnValue;
	} else {
		$("#phoneChk").text("");
	}

	// ================ 생년월일 ================ //
	//회원정보수정 만14세 미만 가입 금지
	var date = new Date(); //Date생성자 생성
	var thisY = date.getFullYear(); //현재년도를 YYYY로 반환한걸 thisY변수에 넣는다
	var selectY = $("#yearBox").val(); //선택한 년도
	if (thisY - selectY < 16) { // 올해 - 선택한년도가 16미만이면
		$("#ageConfirm").text("*만 14세 미만 아동의 회원정보수정은 받고 있지 않습니다").css("color", "red");
		return returnValue;
	}

	// ================ 이메일 ================ //
	//1. 빈값 안됨
	if (csEmailOne == "" || csEmailTwo == "") {
		$("#csEmailChk").text("이메일을 입력해주세요").css("color", "red");
		return returnValue;
	} else {
		$("#csEmailChk").text("");
	}

	//2. 이메일 앞자리 정규식 맞는지
	if (!emailOnly.test(csEmailOne)) {
		$("#csEmailChk").text("형식에 알맞은 이메일을 입력해주세요.").css("color", "red");
		return returnValue;
	} else {
		$("#csEmailChk").text("");
	}

	//3.공백이 들어갔는지
	if (csEmailOne.match(pattern) || csEmailTwo.match(pattern)) {
		$("#csEmailChk").text("공백이 존재합니다.").css("color", "red");
		return returnValue;
	} else {
		$("#csEmailChk").text("");
	}

	//4.이메일 선택이면 도메인을 선택해주세요 띄우기
	if (csEmailTwo == '선택') {
		$("#csEmailChk").text("도메인을 선택해주세요.").css("color", "red");
		return returnValue;
	} else {
		csEmailOne = "";
	}

	return true;
}
	


