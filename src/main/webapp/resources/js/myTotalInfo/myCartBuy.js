/**
*장바구니 구매 js
*생성자 : 김혜경
*생성일 : 2021.12.31
*/
$(function() {
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

});

function onPay(){
	
}
