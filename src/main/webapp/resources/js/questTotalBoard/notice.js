/**
*생성자 : 김소연
*생성일 : 2021.12.01
*공지사항
*/
var searchParam = {};

$(function() {
	attachEvent();

	/*detail페이지의 수정을 위한 input박스 숨김*/
	$("#updSubject, #updText, #ntcUpdDoneBtn").hide();
});

/*이벤트함수*/
var attachEvent = function() {
	/*글쓰기 페이지가기*/
	$("#goWriteForm").click(function() {
		location.href = "/notice/writeNotice";
	});

	/*공지사항목록 페이지가기*/
	$("#goNoticeList").click(function() {
		location.href = "/notice/noticePage";
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
		/*페이지가 1페이지인 검색함수*/
		goPage(1);
	});
}

/*글번호에 맞는 Detail 페이지 가기*/
var goDetail = function(ntcNo) {
	location.href = '/notice/detailNotcie?ntcNo='+ntcNo;
}

/*글작성후 성공하면 글목록에 가기*/
var saveNotice = function(param) {
	if (confirm("저장하시겠습니까?")) {
		$.ajax({
			url: '/notice/writeNotice',
			type: 'POST',
			data: JSON.stringify(param),
			datatype: 'JSON',
			contentType: 'application/json',
			success: function() {
				location.href = '/notice/noticePage';
			}
		});
	}
}

/*글삭제후 성공하면 글목록에 가기*/
var deleteNotice = function() {
	if (confirm("삭제하시겠습니까?")) {
		$.ajax({
			url: '/notice/deleteNotice',
			type: 'GET',
			data: { "ntcNo": $("#ntcNo").val() },
			success: function() {
				location.href = '/notice/noticePage';
			}
		});
	}
}

/*글수정후 성공하면 해당 글상세에 가기*/
var updateNotice = function() {
	var ntcNo = $("#ntcNo").val();
	if (confirm("수정하시겠습니까?")) {
		$.ajax({
			url: '/notice/updateNotice',
			type: 'POST',
			data: JSON.stringify({
				"ntcNo": ntcNo,
				"ntcSj": $("#updSubject").val(),
				"ntcText": $("#updText").val()
			}),
			contentType: 'application/json',
			success: function() {
				location.href = '/notice/detailNotcie/' + ntcNo;
			}
		});
	}
}

/*검색과 페이지 정보 같이 넘기기*/
var goPage = function(pageNum) {
	searchParam = {};
	searchParam.selectOptVal = $("#selectWrap option:selected").val();
	searchParam.searchVal = $("#searchVal").val();
	searchParam.page = pageNum;

	$.ajax({
		url: '/notice/searchNotice',
		type: 'GET',
		data: searchParam,
		success: function(res) {
			var page = res.page;
			var maxPage = res.maxPage;
			var startpage = res.startpage;
			var endpage = res.endpage;
			var noticeList = res.noticeList;
			var viewList = "";
			viewList += "<colgroup>";
			viewList += "<col width='10%;'>";
			viewList += "<col width='50%;'>";
			viewList += "<col width='15%;'>";
			viewList += "<col width='15%;'>";
			viewList += "<col width='10%;'>";
			viewList += "/colgroup";
			viewList += "<tr>";
			viewList += "<th>NO</th>";
			viewList += "<th>제목</th>";
			viewList += "<th>작성자</th>";
			viewList += "<th>작성일</th>";
			viewList += "<th>조회</th>";
			viewList += "</tr>";

			$.each(noticeList, function(i, e) {
				var date = new Date(e.ntcRegDate);
				var year = date.getFullYear().toString();
				var month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
				var day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)

				viewList += "<tr>";
				viewList += "<td>" + e.ntcNo + "</td>";
				viewList += "<td class='hover' onclick='goDetail(" + e.ntcNo + ")'>" + e.ntcSj + "</td>";
				viewList += "<td>" + e.ntcWrt + "</td>";
				viewList += "<td>" + year + "-" + month + "-" + day + "</td>";
				viewList += "<td>" + e.ntcVcnt + "</td>";
				viewList += "</tr>";
			});

			var pageList = "";
			if (1 < startpage) {
				/*startpage가 1보다 커야 실행가능*/
				pageList += '<span class="page mr6" onclick="goPage(' + (startpage - 1) + ')">' + '&lt;&lt;' + '</span>';
			}
			for (var num = startpage; num <= endpage; num++) {
				pageList += '<span class="page mr6" onclick="goPage(' + num + ')">' + num + '</span>';
			}

			if (endpage < maxPage) {
				/*endpage가 maxPage보다 작아야 실행 가능*/
				pageList += '<span class="page mr6" onclick="goPage(' + (endpage + 1) + ')">' + '&gt;&gt;' + '</span>';
			}

			$("#ntcTable").html(viewList);
			$("#pageList").html(pageList);

		}
	});
}

