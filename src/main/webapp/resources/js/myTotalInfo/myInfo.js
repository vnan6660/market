/**
*생성자 : 김혜경
*생성일 : 2021.12.10
*로그인
*/

$(function() {
	var mainHeight = $("#contentsWrap").outerHeight(true);
	$("#sideUlWrap").css("height", mainHeight + "px");
	
	movePage();//페이지 이동관련 함수

	//비밀번호 확인페이지에서 확인버튼 눌렀을 시
	$("#pwChkBtn").click(function() { //id가 pwChkBtn인 selector를 클릭하면 수행
		pwChk();
	});

	//엔터 눌러도 확인버튼 누른것처럼 설정
	$("#pwChkInput").keypress(function(e) {
		if (e.keyCode == 13) { //keyCode == 13은 엔터
			pwChk();
		}
	});

});

//페이지 이동관련 함수
function movePage() {
	//비밀번호확인 페이지로 이동
	$("#updateInfoBtn").click(function() { //id가 updateInfoBtn인 selector를 클릭하면 수행
		location.href = "/myInfo/pwChkPage"; //  /myInfo/pwChkPage의 주소로 가라
	});

	//비밀번호확인 페이지에서 취소버튼 눌렀을 때 마이페이지로 이동	
	$("#pwChkBtnCancle").click(function() { //id가 updateInfoBtn인 selector를 클릭하면 수행
		location.href = "/myInfo/myInfoPage"; //  /myInfo/myInfoPage의 주소로 가라
	});
}

//세션의 비밀번호 가져와서 내가 쓴 비밀번호가 DB와 맞는지 비교해서 맞으면 1 틀리면 0
function pwChk() {
	var pwChkInput = $("#pwChkInput").val();
	var csId = $("#csId").val();
	data = {};
	data.csPs = pwChkInput;
	data.csId = csId;

	$.ajax({
		url: '/myInfo/pwChk', //요청 url
		type: "POST", //post타입
		datatype: 'JSON', //서버에서 어떤 타입(json, html, text...)을 받을 것인지를 의미. json(key:value)형태의 데이터타입을 사용
		contentType: 'application/json', //보내는 데이터의 타입
		data: JSON.stringify(data), //요청과 함께 보낼 데이터
		success: function(result) { //성공했을시 수행하는 function
			if (result == 1) {//DB에서 가져온 비밀번호와 입력한 비밀번호가 같으면
				location.href = "/myInfo/updateInfoPage";
			} else {
				alert("비밀번호를 다시 확인해주세요");
			}
		},
		error: function() {
			alert("관리자에게 문의하시길 바랍니다.")
		}
	});
}

