/*
*회원가입 js
*생성자 : 김혜경
*생성일 : 2021.12.11
*/
$(function(){
	//이메일 직접입력 input 처음 로딩됐을때 안보이게
	$("#csEmailWriteInput").hide();

	//이메일 뒷부분 선택값이 직접입력이면 input박스 나오게 아니면 숨김
	$('#csEmailTwo').change(function() {
		if($('#csEmailTwo').val() !="직접입력"){
			$("#csEmailWriteInput").hide();
		}else{
			$("#csEmailWriteInput").show();
		}
	});
	
	//회원가입 년도 생성
	function getYears(selYear) { //getYears함수 파라미터로 selYear를 받는다.
		$("#yearBox option").remove(); //기존option을 삭제함
		var stY = Number(selYear) - 50; //올해 기준으로 -50년을 보여줌.
		var edY = Number(selYear); //마지막 년도는 올해로 설정
		for (var y = stY; y <= edY; y++) { //올해-50년 부터 올해까지 for문 돌리기
			$('#yearBox').append("<option value='" + y + "'>" + y + "년" + "</option>"); //id가 yearBox인것에 <option value="2021">2021년</option>형태 넣기
		}
	}
	
	//회원가입 생년월일 년도 selectBox만들기
	var date = new Date(); //Date생성자 생성
	var selYear = date.getFullYear(); //현재년도를 YYYY로 반환한걸 selYear변수에 넣는다
	getYears(selYear);// 현재년도를 기준으로 getYears()메서드 호출
	$('#yearBox').val(selYear);// id가 yearBox인 selector에 현재년도를 넣는다.
	
	//수정버튼 눌렀을 시 시행되는 함수
	$('#joinBtn').click(function() {
		var csPhoneOne = $("#csPhoneOne").val();
		var csPhoneTwo = $("#csPhoneTwo").val();
		var csPhoneThree = $("#csPhoneThree").val();
		var csPhone = csPhoneOne+csPhoneTwo+csPhoneThree;
		var csEmailOne = $("#csEmailOne").val();
		var csEmailWriteInput = $("#csEmailWriteInput").val()
		var csEmailTwo = $("#csEmailTwo").val();
		var csEmail = csEmailOne+'@'+csEmailWriteInput+csEmailTwo;
		//전화번호 속성추가
		$('input[name=csPhone]').attr('value',csPhone);
		//추가됐는지 확인
		var get_csPhone = $('input[name=csPhone]').attr('value');
		console.log("get_csPhone:  "+get_csPhone);
		
		//이메일 속성추가
		$('input[name=csEmail]').attr('value',csEmail);
		//추가됐는지 확인
		var get_csEmail = $('input[name=csEmail]').attr('value');
		console.log("get_csEmail:  "+get_csEmail);
		
		validation().then(function(ajaxData){
			if(ajaxData==true){
				if (confirm('가입하시겠습니까?')) {
					$.ajax({
						url: '/login/doJoin',
						type: 'POST',
						enctype: 'multipart/form-data',
						contentType: false,//false 꼭 작성해야함
						processData: false,//false 꼭 작성해야함,
						data: new FormData($('#doJoinForm')[0]),
						success: function() {
							alert("가입되었습니다");
							location.href = "/login/loginPage";
							resolve();
						},
						error: function() {
							alert("오류입니다. 관리자에게 문의해주세요");
						}
					});
				}else{//수정하시겠습니까 취소
					alert("취소되었습니다");
				}
			}
		});
	});
	
});//레디펑션 마침

function validation(){
	return new Promise(function(resolve, reject){
		//alert("1.validation실행");
		var returnValue = false;
		
		//유효성검사
		var idOnlyEngNum = /^(?=.*?[a-z])(?=.*?[0-9]).{4,16}$/; //(?=.*?[a-z])영문소문자필수, (?=.*?[0-9])숫자필수, {4,16}$4~16자
		var pwOnlyEngNumSpecial = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
		var nmOnlyHangulEng = /^[가-힣a-zA-Z]+$/;
		var emailOnly = /^[a-zA-Z0-9_\.\-]+$/; 
		var phonelOnly = /^(?=.*?[0-9]).{4,4}$/;
		var pattern = /\s/g;
		var csId = $("#csId").val(); // id가 csId인 selector의 값을 .val()로 가져와 csId라는 변수에 넣는다. (이하 동일)
		var csPs = $("#csPs").val();
		var csPsConfirm = $("#csPsConfirm").val();
		var csNm = $("#csNm").val();
		var csPhoneOne = $("#csPhoneOne").val();
		var csPhoneTwo = $("#csPhoneTwo").val();
		var csPhoneThree = $("#csPhoneThree").val();
		var csPhone = csPhoneOne+csPhoneTwo+csPhoneThree;
		var csEmailOne = $("#csEmailOne").val();
		var csEmailWriteInput = $("#csEmailWriteInput").val()
		var csEmailTwo = $("#csEmailTwo").val();
		var csEmail = csEmailOne+'@'+csEmailWriteInput+csEmailTwo;
		if(csEmailTwo == "직접입력"){
			csEmail = csEmailOne+'@'+csEmailWriteInput;
		}
		/*//전화번호 속성추가
		$('input[name=csPhone]').attr('value',csPhone);
		//추가됐는지 확인
		var get_csPhone = $('input[name=csPhone]').attr('value');
		console.log("get_csPhone:  "+get_csPhone);
		
		//이메일 속성추가
		$('input[name=csEmail]').attr('value',csEmail);
		//추가됐는지 확인
		var get_csEmail = $('input[name=csEmail]').attr('value');
		console.log("get_csEmail:  "+get_csEmail);*/
		
		// ================ ID ================ //
		//1. 빈값 안됨
		if(csId==""){
			$("#csIdCheck").text("아이디를 입력해주세요").css("color", "red"); //아이디를 입력해주세요 표시
			return returnValue;
		}else{
			$("#csIdCheck").text("");
		}
		
		//2. 정규식 맞는지
		if(!idOnlyEngNum.test(csId)){
			$("#csIdCheck").text("형식에 알맞은 아이디를 입력해주세요.").css("color", "red");
			return returnValue;
		}else{
			$("#csIdCheck").text("");
		}
		
		//3.공백이 들어갔는지
		if(csId.match(pattern)) {
			$("#csIdCheck").text("공백이 존재합니다.").css("color", "red");
			return returnValue;
		}else{
			$("#csIdCheck").text("");
		}
		
		//4.회원가입 아이디 중복확인
		var data = {};
		data.csId = csId; 
		
		$.ajax({
			url: '/login/idCheck', //요청 url
			type: "POST", //post타입
			datatype: 'JSON', //서버에서 어떤 타입(json, html, text...)을 받을 것인지를 의미. json(key:value)형태의 데이터타입을 사용
			contentType: 'application/json', //보내는 데이터의 타입
			data: JSON.stringify(data), //요청과 함께 보낼 데이터
			success: function(result) { //성공했을시 수행하는 function
				if(result == 0){//cnt가 0이면(DB에 저장된 id개수가 0이면)
					$("#csIdCheck").text(""); //사용가능한 아이디입니다. 표시
					resultVal = true;
					resolve(resultVal);
				}else{//cnt가 0이 아니면
					$("#csIdCheck").text("이미 사용중인 아이디입니다.").css("color", "red");//이미 사용중인 아이디입니다. 표시
					resultVal = false;
					resolve(resultVal);
				}
			},
			error: function() {
				alert("관리자에게 문의하세요");
			}
		});
		
		// ================ 비밀번호 ================ //
		//1. 빈값 안됨
		if(csPs==""){
			$("#csPwCheck").text("비밀번호를 입력해주세요").css("color", "red");
			return returnValue;
		}else{
			$("#csPwCheck").text("");
		}
		
		//2. 정규식 맞는지
		if(!pwOnlyEngNumSpecial.test(csPs)){
			$("#csPwCheck").text("형식에 알맞은 비밀번호를 입력해주세요.").css("color", "red");
			return returnValue;
		}else{
			$("#csPwCheck").text("");
		}
		
		//3.공백이 들어갔는지
		if(csPs.match(pattern)) {
			$("#csPwCheck").text("공백이 존재합니다.").css("color", "red");
			return returnValue;
		}else{
			$("#csPwCheck").text("");
		}
		
		// ================ 비밀번호 재확인 ================ //
		//1. 빈값 안됨
		if(csPsConfirm==""){
			$("#csPwConfirm").text("비밀번호를 입력해주세요").css("color", "red");
			return returnValue;
		}else{
			$("#csPwConfirm").text("");
		}
		
		//2.공백이 들어갔는지
		if(csPsConfirm.match(pattern)) {
			$("#csPwConfirm").text("공백이 존재합니다.").css("color", "red");
			return returnValue;
		}else{
			$("#csPwConfirm").text("");
		}
		
		//3.비밀번호랑 입력값 같은지
		if(csPsConfirm != csPs){
			$("#csPwConfirm").text("비밀번호를 다시 확인해주세요").css("color", "red");
			return returnValue;
		}else{
			$("#csPwConfirm").text("");
		}
	
		// ================ 이름 ================ //
		//1. 빈값 안됨
		if(csNm==""){
			$("#csNmConfirm").text("이름을 입력해주세요").css("color", "red");
			return returnValue;
		}else{
			$("#csNmConfirm").text("");
		}
		
		//2. 정규식 맞는지
		if(!nmOnlyHangulEng.test(csNm)){
			$("#csNmConfirm").text("형식에 알맞은 이름을 입력해주세요.").css("color", "red");
			return returnValue;
		}else{
			$("#csNmConfirm").text("");
		}
		
		//3.공백이 들어갔는지
		if(csNm.match(pattern)) {
			$("#csNmConfirm").text("공백이 존재합니다.").css("color", "red");
			return returnValue;
		}else{
			$("#csNmConfirm").text("");
		}
		
		// ================ 전화번호 ================ //
		//1.빈값 안됨
		if(csPhoneTwo == "" || csPhoneThree == ""){
			$("#phoneChk").text("전화번호를 입력해주세요").css("color", "red");
			return returnValue;
		}else{
			$("#phoneChk").text("");
		}
		
		//2.전화번호 정규식 맞는지
		if(!phonelOnly.test(csPhoneTwo) || !phonelOnly.test(csPhoneThree)){
			$("#phoneChk").text("형식에 알맞은 전화번호를 입력해주세요.").css("color", "red");
			return returnValue;
		}else{
			$("#phoneChk").text("");
		}
		
		//3.공백이 들어갔는지
		if(csPhoneTwo.match(pattern) || csPhoneThree.match(pattern)) {
			$("#phoneChk").text("공백이 존재합니다.").css("color", "red");
			return returnValue;
		}else{
			$("#phoneChk").text("");
		}
		
		// ================ 생년월일 ================ //
		//회원가입 만14세 미만 가입 금지
		var date = new Date(); //Date생성자 생성
		var thisY = date.getFullYear(); //현재년도를 YYYY로 반환한걸 thisY변수에 넣는다
		var selectY = $("#yearBox").val(); //선택한 년도
		if(thisY - selectY < 16){ // 올해 - 선택한년도가 16미만이면
			$("#ageConfirm").text("*만 14세 미만 아동의 회원가입은 받고 있지 않습니다").css("color", "red");
			return returnValue;
		}
		
		// ================ 이메일 ================ //
		//1. 빈값 안됨
		if(csEmailOne == "" || csEmailTwo == ""){
			$("#csEmailChk").text("이메일을 입력해주세요").css("color", "red");
			return returnValue;
		}else{
			$("#csEmailChk").text("");
		}
		
		//2. 이메일 앞자리 정규식 맞는지
		if(!emailOnly.test(csEmailOne)){
			$("#csEmailChk").text("형식에 알맞은 이메일을 입력해주세요.").css("color", "red");
			return returnValue;
		}else{
			$("#csEmailChk").text("");
		}
		
		//3.공백이 들어갔는지
		if(csEmailOne.match(pattern) || csEmailTwo.match(pattern)) {
			$("#csEmailChk").text("공백이 존재합니다.").css("color", "red");
			return returnValue;
		}else{
			$("#csEmailChk").text("");
		}
		
		//4.이메일 선택이면 도메인을 선택해주세요 띄우기
		if(csEmailTwo == '선택') {
			$("#csEmailChk").text("도메인을 선택해주세요.").css("color", "red");
			return returnValue;
		}else{
			csEmailOne = "";
		}
		
		//5.회원가입 이메일 중복확인
		var resultVal="";
		var data = {};//빈 객체 생성
		data.csEmail = csEmail; //위에서 작성한 변수값을 'data.속성'에 넣는 작업
		
		$.ajax({
			url: '/login/emailChk',//요청 url
			type: 'POST',//post타입
			contentType: 'application/json',//서버에서 어떤 타입(json, html, text...)을 받을 것인지를 의미. json(key:value)형태의 데이터타입을 사용
			data: JSON.stringify(data),//서버에서 어떤 타입(json, html, text...)을 받을 것인지를 의미. json(key:value)형태의 데이터타입을 사용
			dataType: 'json', //요청과 함께 보낼 데이터
			success: function(result) {//성공했을시 수행하는 function
				if(result == 0){ //DB에 저장된 이메일개수가 0개면
					$("#csEmailChk").text("");
					resultVal = true;
					resolve(resultVal);
				}else if(result == 1){//DB에 저장된 이메일이 1개있다면(DB에 있단 소리니깐 존재하는 이메일)
					$("#csEmailChk").text("존재하는 이메일입니다. 다시 입력해주세요.").css("color", "red");
					resultVal = false;
					resolve(resultVal);
				}
			},
			error: function() {
				alert("관리자에게 문의하세요");
			}
		});
		
		return true;
	});
}

