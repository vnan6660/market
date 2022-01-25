/*
*생성자 : 김소연
*생성일 : 2022.01.06
*관리자 메인
*/

$(function() {
	//초기설정함수
	adminMainInit();

	//이벤트함수
	adminMainAttachEvent();
});

//초기설정함수
var adminMainInit = function() {

	//Local시간 가져오기
	getLocalTime();

	//공지사항불러오기
	noticeListLoad();

	//주문관리 불러오기
	orderMgtLoad("tab1","주문완료");

	//주문관리에 있는 탭내용부분 숨기되 첫번째내용은 보여주기
	$('.tabcontent > div').hide().filter(':first').show();
}

//이벤트함수
var adminMainAttachEvent = function() {
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

	//tabnav에 있는 탭을 클릭시 실행
	$("#orderMgtQuickMenu > div:nth-child(2) > div > ul > li a").click(function() {
		//hash태그로 이어진 tabContents Id 가져오기
		var tabContentsId = new String(this.hash).substring(1);
		var tabNm = new String(this.text);
		orderMgtLoad(tabContentsId,tabNm);

	});
}

//Local시간 가져오기
var getLocalTime = function() {
	var curDate = new Date();
	//달력시간 년초1일로 셋팅
	startDt = new Date(curDate);
	startDt.setMonth(0);//1월은 0부터 시작
	startDt.setDate(1);
	startDt = startDt.toISOString().substring(0, 10);
	endDt = curDate.toISOString().substring(0, 10);
}

//공지사항 불러오기
var noticeListLoad = function() {
	$.ajax({
		url: '/notice/searchNotice',
		data: {
			"startDt": startDt,
			"endtDt": endDt,
			"page": 1,
			"noLimit":1
		},
		async:false,
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
				viewList += "<td colspan='2'>데이터가 존재하지 않습니다</td>";
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

//주문관리 불러오기
var orderMgtLoad = function(tabContentsId,tabNm) {
	$.ajax({
		url: '/orderList/searchOrderList',
		data: {
			"startDt": startDt,
			"endDt": endDt,
			"page": 1,
			"noLimit":1
		},
		async:false,
		success: function(res) {
			var viewList = "";
			var orderMgtList = res.reList.filter(function(e, i) {
				return e.odState == tabNm;
			}).filter(function(e,i){
				return i < 10;
			});

			viewList += "<colgroup>";
			viewList += "<col width='20%;'>";
			viewList += "<col width='25%;'>";
			viewList += "<col width='20%;'>";
			viewList += "<col width='15%;'>";
			viewList += "/colgroup";
			viewList += "<tr>";
			viewList += "<th>사용자ID</th>";
			viewList += "<th>주문번호</th>";
			viewList += "<th>주문날짜</th>";
			viewList += "<th>발송상태</th>";
			viewList += "</tr>";
			if (orderMgtList.length == 0) {

				for (var i = 0; i < 8; i++) {
					viewList += "<tr>";
					viewList += "<td>&nbsp;</td>";
					viewList += "</tr>";
				}

				viewList += "<tr style='text-align: center;'>";
				viewList += "<td colspan='4'>데이터가 존재하지 않습니다</td>";
				viewList += "</tr>";

				for (var i = 0; i < 1; i++) {
					viewList += "<tr>";
					viewList += "<td>&nbsp;</td>";
					viewList += "</tr>";
				}

			} else {
				$.each(orderMgtList, function(i, e) {
					/*e.odNo가 다른 함수로 넘어갈때 변형이 일어나서 2개로 나누어서 값 넘겨줌*/
					let odNoOne = e.odNo.substring(0, 10);
					let odNoTwo = e.odNo.substring(10);
					let odState;
					if ("주문완료" == e.odState || "주문취소" == e.odState) {
						odState = "12";
					} else {
						odState = "34";
					}
					viewList += "<tr>";
					viewList += "<td class='hover' onclick='goOdDetail(" + odNoOne + "," + odNoTwo + "," + odState + ")'>" + e.csId + "</td>";
					viewList += "<td class='hover' onclick='goOdDetail(" + odNoOne + "," + odNoTwo + "," + odState + ")'>" + e.odNo + "</td>";
					viewList += "<td class='hover' onclick='goOdDetail(" + odNoOne + "," + odNoTwo + "," + odState + ")'>" + e.odDate.substring(0, 10) + "</td>";
					viewList += "<td class='hover' onclick='goOdDetail(" + odNoOne + "," + odNoTwo + "," + odState + ")'>" + e.odState + "</td>";
					viewList += "</tr>";
				});
			}

			$("#"+tabContentsId+" > table").html(viewList);
		},
		error: function() {
			alert("오류입니다. 관리자에게 문의해주세요");
		}
	});
}

// + 모양의 버튼을 누를경우 실행
var plusBtn = function(val) {
	//공지사항페이지가기
	if ('notice' == val) {
		location.href = "/notice/noticePage";
	}
	//주문목록페이지가기
	if ('orderMgt' == val) {
		location.href = "/orderList/orderListPage";
	}
}

/*글번호에 맞는 noticeDetail 페이지 가기*/
var goNoticeDetail = function(ntcNo) {
	searchParam = {};
	$("input[name = ntcNo]").val(ntcNo);
	$("input[name = selectOptValOne]").val("optAll");
	$("input[name = page]").val(1);
	$('#noticeSearchForm').attr("action", "/notice/detailNotcieSearch");
	$('#noticeSearchForm').attr("method", "POST");
	$('#noticeSearchForm').submit();
}


/*글번호에 맞는 odDetail 페이지 가기*/
var goOdDetail = function(odNo, odNo2, odState) {
	searchParam = {};
	$("input[name = odNo]").val(String(odNo) + String(odNo2));
	$("input[name = startDt]").val(startDt);
	$("input[name = endDt]").val(endDt);
	$("input[name = selectOptValOne]").val("optAll");
	$("input[name = selectOptValTwo]").val("optAll");
	$("input[name = selectOptValThree]").val(odState);
	$("input[name = dtType]").val("odDt");
	$("input[name = page]").val(1);
	$('#odSearchForm').attr("action", "/orderList/detailOrderSearch");
	$('#odSearchForm').attr("method", "POST");
	$('#odSearchForm').submit();
}

