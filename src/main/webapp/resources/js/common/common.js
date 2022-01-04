/*
*생성자 : 김소연
*생성일 : 2021.11.27
*공통
*/
var startDt;
var endDt;
var searchParam;
$(function() {
	init();
	attachEvent();
});

/*페이지 로딩될때 즉시 실행시킬 것*/
var init = function() {
	var mainHeight = $("#contentsMain, #contents").outerHeight(true);
	$("#sideUlWrap").css("height", mainHeight + "px");

	getLocalTime();

	//공지사항불러오기
	noticeListLoad();

	//주문관리에 있는 탭내용부분 숨기되 첫번째내용은 보여주기
	$('.tabcontent > div').hide().filter(':first').show();
}

var attachEvent = function() {
	
	//주문관리에 있는 탭을 클릭시 시행
	$('.tabnav a').click(function() {
		//주문관리에 있는 탭내용부분 숨기되 클릭한 부분의 #뒤에있는 부분값은 보여주기
		$('.tabcontent > div').hide().filter(this.hash).show();
		
		//tabnav a 에있는 active라고 지어진 Class지우기
		$('.tabnav a').removeClass('active');
		
		//클릭된a(this)에 active라고 Class주기
		$(this).addClass('active');
		
		// 원래의 a태그의 기능 무력화
		return false;
	}).filter(':first').click();
	
}

var goHome = function(val) {
	if (val == 0) {
		location.href = "/adminMain";
	} else {
		if (val == 1 || val == 2 || typeof val == 'undefined' || val == '') {
			location.href = "/";
		}
	}
}

//로그인 페이지로 가기
var goLogin = function() {
	location.href = "/login/loginPage";
}

//로그아웃 실행
var goLogout = function() {
	$.ajax({
		url: '/login/getLogout',
		type: 'GET',
		success: function() {
			location.href = "/";
		}
	});
}

var getLocalTime = function() {
	var curDate = new Date();
	//달력시간 년초1일로 셋팅
	startDt = new Date(curDate);
	startDt.setMonth(0);//1월은 0부터 시작
	startDt.setDate(1);
	startDt = startDt.toISOString().substring(0, 10);
	endtDt = curDate.toISOString().substring(0, 10);
}

//공지사항 불러오기
var noticeListLoad = function() {
	console.log("공지사항 불러오기 fn");

	$.ajax({
		url: '/notice/searchNotice',
		data: {
			"startDt": startDt,
			"endtDt": endtDt,
			"page": 1
		},
		success: function(res) {
			var viewList = "";
			var noticeList = res.noticeList.filter(function(e, i) {
				return i < 5;
			});

			viewList += "<colgroup>";
			viewList += "<col width='75%;'>";
			viewList += "<col width='25%;'>";
			viewList += "/colgroup";
			viewList += "<tr>";
			viewList += "<th>제목</th>";
			viewList += "<th>작성일</th>";
			viewList += "</tr>";
			if (noticeList.length == 0) {

				viewList += "<tr>";
				viewList += "<td colspan='9'>데이터가 존재하지 않습니다</td>";
				viewList += "</tr>";
			} else {
				$.each(noticeList, function(i, e) {
					var date = new Date(e.ntcRegDate);
					var year = date.getFullYear().toString();
					var month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
					var day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)

					viewList += "<tr>";
					viewList += "<td class='hover' onclick='goNoticeDetail(" + e.ntcNo + ")'>" + e.ntcSj + "</td>";
					viewList += "<td>" + year + "-" + month + "-" + day + "</td>";
					viewList += "</tr>";
				});
			}

			$("#ntcMainTable").html(viewList);
		},
		error: function() {
			alert("오류입니다. 관리자에게 문의해주세요");
		}
	});
}

// + 모양의 버튼을 누를경우 실행
var plusBtn = function(val) {
	if ('notice' == val) {
		location.href = "/notice/noticePage";
	}
}
/*글번호에 맞는 noticeDetail 페이지 가기*/
var goNoticeDetail = function(ntcNo) {
	searchParam = {};
	$("input[name = ntcNo]").val(ntcNo);
	$("input[name = selectOptValOne]").val("optAll");
	$("input[name = page]").val(1);
	$('#noticeSearchForm').attr("action", "/notice/detailNotcie");
	$('#noticeSearchForm').attr("method", "POST");
	$('#noticeSearchForm').submit();
}


