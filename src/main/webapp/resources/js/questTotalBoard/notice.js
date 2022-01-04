/**
*생성자 : 김소연
*생성일 : 2021.12.01
*공지사항
*/
var searchParam = {};
var nowPage = 1;

$(function() {
	noticeInit();
	noticeAttachEvent();

	/*detail페이지의 수정을 위한 input박스 숨김*/
	$("#updSubject, #updText, #ntcUpdDoneBtn, #ntcDelBtn").hide();
});


var noticeInit = function(){
	//상세페이지에서 목록버튼 클릭해서 돌아왔을시만 실행
	if($("#returnT").val() == 't'){
		console.log("t");
		$("#selectWrap").val($("#returnSptValOne").val()).prop("selected", true);
		$("#searchVal").val($("#returnSearchVal").val());
		goPage($("#returnPage").val(), 1);
	}
}

/*이벤트함수*/
var noticeAttachEvent = function() {
	/*글쓰기 페이지가기*/
	$("#goWriteForm").click(function() {
		location.href = "/notice/writeNotice";
	});

	/*공지사항목록 페이지가기*/
	$("#goNoticeList").click(function() {
		$("#searchForm").attr("action","/notice/noticePage");
		$("#searchForm").attr("method","post");
		$("#searchForm").submit();
	});

	/*글쓴것 저장하기*/
	$("#saveWriteFrom").click(function() {
		var param = {};
		param.ntcSj = $("#subject").val();
		param.ntcText = $("#writeText").val();
		param.ntcWrt = $("#writer").val();

		saveNotice(param);

	});

	/*삭제버튼을 누르면 삭제하기*/
	$("#ntcDelBtn").click(function() {
		deleteNotice();
	});

	/*수정버튼누르기*/
	$("#ntcUpdBtn").click(function() {
		$("#orgSubject, #orgText, #ntcUpdBtn").hide();
		$("#updSubject, #updText, #ntcUpdDoneBtn, #ntcDelBtn").show();
	});

	/*저장버튼누르면*/
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
	searchParam = {};
	$("input[name = ntcNo]").val(ntcNo);
	$("input[name = selectOptValOne]").val($("#selectWrap option:selected").val());
	$("input[name = searchVal]").val($("#searchVal").val());
	$("input[name = page]").val($("#hdThisPage").val());
	$('#searchForm').attr("action","/notice/detailNotcie");
	$('#searchForm').attr("method","POST");
	$('#searchForm').submit();
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
				alert("저장되었습니다");
				location.href = '/notice/noticePage';
			},
			error: function() {
				alert("오류입니다. 관리자에게 문의해주세요");
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
				alert("삭제되었습니다");
				location.href = '/notice/noticePage';
			},
			error: function() {
				alert("오류입니다. 관리자에게 문의해주세요");
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
				alert("수정되었습니다");
				$('#searchForm').attr("action","/notice/detailNotcie");
				$('#searchForm').attr("method","POST");
				$('#searchForm').submit();
			},
			error: function() {
				alert("오류입니다. 관리자에게 문의해주세요");
			}
		});
	}
}

/*검색과 페이지 정보 같이 넘기기*/
var goPage = function(pageNum) {
	searchParam = {};
	searchParam.selectOptValOne = $("#selectWrap option:selected").val();
	searchParam.searchVal = $("#searchVal").val();
	searchParam.page = pageNum;

	nowPage = pageNum;

	$.ajax({
		url: '/notice/searchNotice',
		type: 'GET',
		data: searchParam,
		success: function(res) {
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
			if (noticeList.length ==  0) {
				
					viewList += "<tr>";
					viewList += "<td colspan='9'>데이터가 존재하지 않습니다</td>";
					viewList += "</tr>";
					
					$("#pageList").html("");
			} else {
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
				pageList += '<span class="page mr6" onclick="goPage(' + num + ')"'
				if (nowPage == num) {
					pageList += ' style = "background-color: #eee" >' + num
					pageList += '<input type="hidden"  id="hdThisPage" value="' + num + '">'
				} else {
					pageList += '>' + num
				}

				pageList += '</span>';
			}

			if (endpage < maxPage) {
				/*endpage가 maxPage보다 작아야 실행 가능*/
				pageList += '<span class="page mr6" onclick="goPage(' + (endpage + 1) + ')">' + '&gt;&gt;' + '</span>';
			}

			$("#pageList").html(pageList);
			
			}
			$("#ntcTable").html(viewList);

		},
		error: function() {
			alert("오류입니다. 관리자에게 문의해주세요");
		}
	});
}

