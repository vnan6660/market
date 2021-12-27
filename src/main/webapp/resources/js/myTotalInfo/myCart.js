/**
*생성자 : 김혜경
*생성일 : 2021.12.10
*로그인
*/

$(function() {
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
