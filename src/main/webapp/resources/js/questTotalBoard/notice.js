/**
*생성자 : 김소연
*생성일 : 2021.12.01
*공지사항
*/
var searchParam = {};

$(function() {
	attachEvent();
	$("#updSubject, #updText, #ntcUpdDoneBtn").hide();
});


var attachEvent = function() {
	/*글쓰기 페이지가기*/
	$("#goWriteForm").click(function() {
		location.href = "/write/notice";
	});

	/*공지사항목록 페이지가기*/
	$("#goNoticeList").click(function() {
		location.href = "/notice";
	});

	/*글쓴것 저장하기*/
	$("#saveWriteFrom").click(function() {
		var param = {};
		param.ntcSj = $("#subject").val();
		param.ntcText = $("#writeText").val();

		saveNotice(param);

	});

	/*삭제버튼을 누르면 삭제하기*/
	$("#ntcDelBtn").click(function() {
		deleteNotice();
	});

	/*수정버튼누르기*/
	$("#ntcUpdBtn").click(function() {
		$("#orgSubject, #orgText, #ntcUpdBtn").hide();
		$("#updSubject, #updText, #ntcUpdDoneBtn").show();
	});

	/*수정완료버튼누르면*/
	$("#ntcUpdDoneBtn").click(function() {
		updateNotice();
	});

	/*검색쿼리작성하기*/
	$("#goSearch").click(function() {
		/*select값하고 input 값 같이넘기기*/
		var selectOptVal = $("#selectWrap option:selected").val();
		var searchVal = $("#searchVal").val();

	});
}

/*글번호에 맞는 Detail 페이지 가기*/
var goDetail = function(ntcNo) {
	location.href = '/detail/notice/' + ntcNo;
}

var saveNotice = function(param) {
	if (confirm("저장하시겠습니까?")) {
		$.ajax({
			url: '/write/notice',
			type: 'POST',
			data: JSON.stringify(param),
			datatype: 'JSON',
			contentType: 'application/json',
			success: function() {
				location.href = '/notice';
			}
		});
	}
}

var deleteNotice = function() {
	if (confirm("삭제하시겠습니까?")) {
		$.ajax({
			url: '/delete/notice',
			type: 'GET',
			data: { "ntcNo": $("#ntcNo").val() },
			success: function() {
				location.href = '/notice';
			}
		});
	}
}

var updateNotice = function() {
	var ntcNo = $("#ntcNo").val();
	if (confirm("수정하시겠습니까?")) {
		$.ajax({
			url: '/update/notice',
			type: 'POST',
			data: JSON.stringify({
				"ntcNo": ntcNo,
				"ntcSj": $("#updSubject").val(),
				"ntcText": $("#updText").val()
			}),
			contentType: 'application/json',
			success: function() {
				location.href = '/detail/notice/' + ntcNo;
			}
		});
	}
}



