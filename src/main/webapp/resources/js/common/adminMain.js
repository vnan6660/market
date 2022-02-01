/*
*생성자 : 김소연
*생성일 : 2022.01.06
*관리자 메인
*/
var weekMonday;
var weekSunday;
var dateArr = [];

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

	//월요일과 일요일간의 날짜사이를 dateArr 배열에 넣기
	getDateStartToLast(weekMonday, weekSunday);

	//공지사항불러오기
	noticeListLoad();

	//주문관리 불러오기
	orderMgtLoad("tab1", "주문완료");

	//금주 주문량,판매금액 불러오기
	thisWeekOrderLoad(dateArr);

	//이번년도 주문량,판매금액 불러오기
	thisYearOrderLoad();

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
		orderMgtLoad(tabContentsId, tabNm);

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

	//오늘기준으로 월요일 가져오기
	weekMonday = getMondayDate(curDate);
	//오늘기준으로 일요일 가져오기
	weekSunday = getSundayDate(curDate);
}

//공지사항 불러오기
var noticeListLoad = function() {
	$.ajax({
		url: '/notice/searchNotice',
		data: {
			"startDt": startDt,
			"endtDt": endDt,
			"page": 1,
			"noLimit": 1
		},
		async: false,
		success: function(res) {
			var viewList = "";
			var noticeList = res.noticeList.filter(function(e, i) {
				return i < 20;
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
var orderMgtLoad = function(tabContentsId, tabNm) {
	$.ajax({
		url: '/orderList/searchOrderList',
		data: {
			"startDt": startDt,
			"endDt": endDt,
			"page": 1,
			"noLimit": 1
		},
		async: false,
		success: function(res) {
			var viewList = "";
			var orderMgtList = res.reList.filter(function(e, i) {
				return e.odState == tabNm;
			}).filter(function(e, i) {
				return i < 10;
			});

			viewList += "<colgroup>";
			viewList += "<col width='20%;'>";
			viewList += "<col width='25%;'>";
			viewList += "<col width='20%;'>";
			viewList += "<col width='15%;'>";
			viewList += "/colgroup";
			viewList += "<tr style='border-bottom: 1px solid #e9e9e9;'>";
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
					viewList += "<tr style='border-bottom: 1px solid #e9e9e9;'>";
					viewList += "<td class='hover' onclick='goOdDetail(" + odNoOne + "," + odNoTwo + "," + odState + ")'>" + e.csId + "</td>";
					viewList += "<td class='hover' onclick='goOdDetail(" + odNoOne + "," + odNoTwo + "," + odState + ")'>" + e.odNo + "</td>";
					viewList += "<td class='hover' onclick='goOdDetail(" + odNoOne + "," + odNoTwo + "," + odState + ")'>" + e.odDate.substring(0, 10) + "</td>";
					viewList += "<td class='hover' onclick='goOdDetail(" + odNoOne + "," + odNoTwo + "," + odState + ")'>" + e.odState + "</td>";
					viewList += "</tr>";
				});
			}

			$("#" + tabContentsId + " > table").html(viewList);
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

//오늘기준으로 월요일 가져오기
var getMondayDate = function(date) {
	var paramDate = new Date(date);

	var day = paramDate.getDay();// 요일을 반환(0은 일요일 ....6은 월요일)
	var diff = paramDate.getDate() - day + (day == 0 ? -6 : 1);
	return new Date(paramDate.setDate(diff)).toISOString().substring(0, 10);
}

//오늘기준으로 일요일 가져오기
var getSundayDate = function(date) {
	var paramDate = new Date(date);

	var day = paramDate.getDay();// 요일을 반환(0은 일요일 ....6은 월요일)
	var diff = paramDate.getDate() + (day == 0 ? 0 : 7 - day);
	return new Date(paramDate.setDate(diff)).toISOString().substring(0, 10);
}

//월요일과 일요일간의 날짜사이를 dateArr 배열에 넣기
var getDateStartToLast = function(startDate, lastDate) {
	dateArr = [];

	var curDate = new Date(startDate);
	while (curDate <= new Date(lastDate)) {
		//dateArr배열에 값넣기
		dateArr.push(curDate.toISOString().substring(0, 10));
		//curDate날짜에 1일 더하기
		curDate.setDate(curDate.getDate() + 1);
	}

	return dateArr;
}

//금주 주문량,판매금액 불러오기
var thisWeekOrderLoad = function(dateArr) {
	$.ajax({
		url: '/common/getThisWeekOrder',
		data: {
			"dateList": dateArr
		},
		async: false,
		success: function(res) {
			var week = res.filter(function(e,i) {
				return e.dateType == 'week';
			});

			var weekList = ""
			$.each(week, function(i, e) {
				weekList += "<td>" + String(week[i].totalQty).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</td>";
			})

			var weekAmt4 = ""
			var weekAmt3 = ""
			$.each(week, function(i, e) {
				if (i < 4) {
					weekAmt4 += "<td>" + String(week[i].totalAmt).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</td>";
				}

				if (i > 3) {
					weekAmt3 += "<td colspan='1'>"+String(week[i].totalAmt).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</td>";
				}

			})

			//금주 주문량
			$("#weekOrderAmt #weekQty").html(weekList);
			
			//금주 판매금액
			$("#weekMoneyAmt #weekAmt4").html(weekAmt4);
			$("#weekMoneyAmt #weekAmt3").html(weekAmt3);

		},
		error: function() {
			alert("오류입니다. 관리자에게 문의해주세요");
		}
	});
}


//이번년도 주문량,판매금액 불러오기
var thisYearOrderLoad = function() {
	$.ajax({
		url: '/common/getThisYearOrder',
		async: false,
		success: function(res) {
			var year = res.filter(function(e, i) {
				return e.dateType == 'year';
			});

			var yearAmt4 = "";
			var yearQty4 = "";
			var yearAmt8 = "";
			var yearQty8 = "";
			var yearAmt12 = "";
			var yearQty12 = "";
			$.each(year, function(i, e) {
				if (i < 4) {
					yearAmt4 += "<td>" + String(year[i].totalAmt).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</td>"
					yearQty4 += "<td>" + String(year[i].totalQty).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</td>"
				}

				if (i > 3 && i < 8) {
					yearAmt8 += "<td>" + String(year[i].totalAmt).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</td>"
					yearQty8 += "<td>" + String(year[i].totalQty).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</td>"
				}

				if (i > 7 && i < 12) {
					yearAmt12 += "<td>" + String(year[i].totalAmt).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</td>"
					yearQty12 += "<td>" + String(year[i].totalQty).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</td>"
				}

			})
			
			//이번해 주문량
			$("#yearOrderAmt #yearQty4").html(yearQty4);
			$("#yearOrderAmt #yearQty8").html(yearQty8);
			$("#yearOrderAmt #yearQty12").html(yearQty12);
			
			//이번해 판매금액
			$("#yearMoneyAmt #yearAmt4").html(yearAmt4);
			$("#yearMoneyAmt #yearAmt8").html(yearAmt8);
			$("#yearMoneyAmt #yearAmt12").html(yearAmt12);
			
		},
		error: function() {
			alert("오류입니다. 관리자에게 문의해주세요");
		}
	});
}