/*
*주문하기js
*생성자 : 김혜경
*생성일 : 2021.12.31
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
	var csEmailOne = $("#csEmailOne").val();
	var csEmailTwo = $("#csEmailTwo").val();
	var csEmailWriteInput = $("#csEmailWriteInput").val()//직접 입력한 이메일 도메인
	var csEmail = csEmailOne + '@' + csEmailTwo;
	if(csEmailTwo == "직접입력"){
		csEmail = csEmailOne+'@'+csEmailWriteInput;
	}
	$('input[id=csEmail]').attr('value', csEmail);
	
	
	
	//결제하기버튼 눌렀을 시 시행되는 함수
	$('#goPay').click(function() {
		if(!csInfo()) return; //csInfo()가 false면 return;
		
		if (confirm('구매하시겠습니까?')) {
			$.ajax({
				url: '/myCart/doPay',
				type: 'POST',
				enctype: 'multipart/form-data',
				contentType: false,//false 꼭 작성해야함
				processData: false,//false 꼭 작성해야함,
				data: new FormData($('#myCartBuyForm')[0]),
				success: function() {
					alert("구매되었습니다");
					location.href = "/";
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

function csInfo() {
	var returnValue = false;

	//유효성검사
	var nmOnlyHangulEng = /^[가-힣a-zA-Z]+$/; //한글과 영어만
	var emailOnly = /^[a-zA-Z0-9_\.\-]+$/; //영어 대,소문자 (.)(_)(-)특수문자만
	var phonelOnly = /^(?=.*?[0-9]).{4,4}$/;//숫자만
	var pattern = /\s/g; //공백확인
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


	console.log("이름:  "+csNm);
	console.log("핸드폰:  "+csPhone);
	console.log("이메일:  "+csEmail);
	console.log("기본주소:  "+$("#csAddrOne").val());
	console.log("기본주소:  "+$("#csAddrTwo").val());



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
	


