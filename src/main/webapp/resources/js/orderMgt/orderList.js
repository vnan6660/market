/**
*생성자 : 김소연
*생성일 : 2022.01.17
*주문목록
*/
var curDate;
var searchParam = {};
var nowPage = 1;

$(function() {
	//초기설정함수
	orderListInit();
	
	//이벤트함수
	orderListAttachEvent();
});

//초기설정함수
var orderListInit = function() {
	//서버시간 가져오기
	getServerTime();

	//달력시간 년초1일로 셋팅
	var startDate = new Date(curDate);
	startDate.setMonth(0);//1월은 0부터 시작
	startDate.setDate(1);

	//가져온 서버시간  startDate와 endDate에 넣기
	$("#startDt").attr('value', startDate.toISOString().substring(0, 10));
	$("#endDt").attr('value', curDate.toISOString().substring(0, 10));
	
	//상세페이지에서 목록버튼 클릭해서 돌아왔을시만 실행
	if ($("#returnT").val() == 't') {
		$("#startDt").val($("#returnStdt").val());
		$("#endDt").val($("#returnEdDt").val());
		$("#oderState").val($("#returnSptValOne").val()).prop("selected", true);
		$("#orderInfo").val($("#returnSptValTwo").val()).prop("selected", true);
		$("#dtType").val($("#returndtType").val()).prop("selected", true);
		$("#searchVal").val($("#returnSearchVal").val());
		goPage($("#returnPage").val(), 1);
	}
}

//이벤트함수
var orderListAttachEvent = function() {
	/*검색쿼리작성하기*/
	$("#goSearch").click(function() {
		/*페이지가 1페이지인 검색함수*/
		goPage(1, 1);
	});

	//전체체크
	$("input[name = allCheck]").click(function() {
		allCheck();
	});

	//주문취소,발송중,발송완료 버튼 누를시
	$("#orderCancel, #transferStart").click(function() {
		odStateChange(this.value);
	});

}

//서버시간 가져오기
var getServerTime = function() {
	var xmlHttp;

	if (window.XMLHttpRequest) {
		//익스플로러 7과 그 이상의 버전, 크롬, 파이어폭스, 사파리, 오페라
		xmlHttp = new XMLHttpRequest;
	} else if (window.ActiveXObject) {
		//익스플로러 5,6(익스플로러 구형버전)
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlHttp.open('HEAD', window.location.href.toString(), false);
	xmlHttp.setRequestHeader('Content-Type', 'text/html');
	xmlHttp.send('');

	var serverDate = xmlHttp.getResponseHeader('Date');

	curDate = new Date(serverDate);
}

//검색과 페이지 정보 같이 넘기기
var goPage = function(pageNum, tfNum) {
	searchParam = {};
	if (tfNum != 0) {
		searchParam.startDt = $("#startDt").val();
		searchParam.endDt = $("#endDt").val();
	}
	searchParam.selectOptValOne = $("#oderState option:selected").val();
	searchParam.selectOptValTwo = $("#orderInfo option:selected").val();
	searchParam.selectOptValThree = $("#dtType option:selected").val();
	searchParam.searchVal = $("#searchVal").val();
	searchParam.page = pageNum;

	nowPage = pageNum;

	$.ajax({
		url: '/orderList/searchOrderList',
		type: 'GET',
		data: searchParam,
		success: function(res) {
			var maxPage = res.maxPage;
			var startpage = res.startpage;
			var endpage = res.endpage;
			var reList = res.reList;
			var reListcount = res.reListcount;
			var viewList = "";
			viewList += "<colgroup>";
			viewList += "<col width='3%;'>";
			viewList += "<col width='3%;'>";
			viewList += "<col width='20%;'>";
			viewList += "<col width='20%;'>";
			viewList += "<col width='20%;'>";
			viewList += "<col width='12.5%;'>";
			viewList += "<col width='12.5%;'>";
			viewList += "<col width='10%;'>";
			viewList += "</colgroup>";
			viewList += "<tr>";
			viewList += "<th><input type='checkbox' name='allCheck'></th>";
			viewList += "<th>No</th>";
			viewList += "<th>사용자ID</th>";
			viewList += "<th>사용자이름</th>";
			viewList += "<th>주문번호</th>";
			viewList += "<th>주문날짜</th>";
			viewList += "<th>배송날짜</th>";
			viewList += "<th>발송상태</th>";
			viewList += "</tr>";
			if (reList.length == 0) {

				viewList += "<tr>";
				viewList += "<td colspan='8'>데이터가 존재하지 않습니다</td>";
				viewList += "</tr>";

				$("#pageList").html("");
			} else {
				$.each(reList, function(i, e) {
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
					viewList += "<td><input type='checkbox' name='eachCheck' value='" + odNoOne + "" + odNoTwo + "'></td>";
					/*역순 NO정렬*/
					viewList += "<td>" + (reListcount - (nowPage - 1) * 10 - i) + "</td>";
					viewList += "<td class='hover' onclick='goDetail(" + odNoOne + "," + odNoTwo + "," + odState + ")'>" + e.csId + "</td>";
					viewList += "<td class='hover' onclick='goDetail(" + odNoOne + "," + odNoTwo + "," + odState + ")'>" + e.csNm + "</td>";
					viewList += "<td class='hover' onclick='goDetail(" + odNoOne + "," + odNoTwo + "," + odState + ")'>" + e.odNo + "</td>";
					viewList += "<td class='hover' onclick='goDetail(" + odNoOne + "," + odNoTwo + "," + odState + ")'>" + e.odDate + "</td>";
					viewList += "<td class='hover' onclick='goDetail(" + odNoOne + "," + odNoTwo + "," + odState + ")'>" + e.trDate + "</td>";
					viewList += "<td class='hover' onclick='goDetail(" + odNoOne + "," + odNoTwo + "," + odState + ")'>" + e.odState + "</td>";
					viewList += "</tr>";
				});

				var pageList = "";
				if (1 < startpage) {
					/*startpage가 1보다 커야 실행가능*/
					pageList += '<span class="page mr6" onclick="goPage(' + (startpage - 1) + ',1)">' + '&lt;&lt;' + '</span>';
				}
				for (var num = startpage; num <= endpage; num++) {
					pageList += '<span class="page mr6" onclick="goPage(' + num + ',1)"'
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
					pageList += '<span class="page mr6" onclick="goPage(' + (endpage + 1) + ',1)">' + '&gt;&gt;' + '</span>';
				}

				$("#pageList").html(pageList);
			}

			$("#orderListTable").html(viewList);
			var mainHeight = $("#contents").outerHeight(true);
			$("#sideUlWrap").css("height", mainHeight + "px");

		},
		error: function() {
			alert("오류입니다. 관리자에게 문의해주세요");
		}
	});
}

//맨위에 있는 체크박스를 클릭시 아래에 있는 체크박스 전체선택또는 전체해제
var allCheck = function() {

	/*맨위에있는 체크박스 선택 또는 해제 상태*/
	var allcheckStatus = $('input:checkbox[name=allCheck]').is(":checked");


	if (allcheckStatus == true) {
		/*맨위에 있는 체크박스가 선택일때 아래에 있는 체크박스들을 disabled 제외하고 전체선택으로 바꿈*/
		$("input[name = eachCheck]").each(function() {
			$("input[name = eachCheck]").prop("checked", true);
		});
	} else {
		/*맨위에 있는 체크박스가 해제일때 아래에 있는 체크박스들을 disabled 제외하고 전체해제으로 바꿈*/
		$("input[name = eachCheck]").each(function() {
			$("input[name = eachCheck]").prop("checked", false);
		});
	}
}

//주문취소,발송중,발송완료 버튼 누를시
var odStateChange = function(nowOdState) {
	checkList = [];

	$("input[name = eachCheck]").each(function(i, e) {
		//체크박스에 체크되어있는 것만
		if (e.checked == true) {
			checkList.push(e.value);
		}
	});
	if (checkList.length != 0) {
		if (confirm('변경하시겠습니까?')) {
			$.ajax({
				url: '/orderList/odStateChange',
				type: 'GET',
				data: {
					"checkList": checkList,
					"nowOdState": nowOdState
				},
				async: false,
				success: function() {
					alert("개시정보가 변경되었습니다");
					goPage($("#hdThisPage").val(), 1);
				},
				error: function() {
					alert("오류입니다. 관리자에게 문의해주세요");
				}
			});
		}
	} else {
		alert("변경할 항목이 존재하지 않습니다");
	}

}

//odNo가 다른 함수로 넘어갈때 변형이 일어나서 2개로 나누어서 값 받음		
var goDetail = function(odNo, odNo2, odState) {
	searchParam = {};
	$("input[name = odNo]").val(String(odNo) + String(odNo2));
	$("input[name = startDt]").val($("#startDt").val());
	$("input[name = endDt]").val($("#endDt").val());
	$("input[name = selectOptValOne]").val($("#oderState option:selected").val());
	$("input[name = selectOptValTwo]").val($("#orderInfo option:selected").val());
	$("input[name = selectOptValThree]").val(odState);
	$("input[name = dtType]").val($("#dtType option:selected").val());
	$("input[name = searchVal]").val($("#searchVal").val());
	$("input[name = page]").val($("#hdThisPage").val());
	$('#searchForm').attr("action", "/orderList/detailOrderSearch");
	$('#searchForm').attr("method", "POST");
	$('#searchForm').submit();
}