/**
*생성자 : 김소연
*생성일 : 2021.12.22
*고객정보
*/

var curDate;
var searchParam = {};
var nowPage = 1;

$(function() {
	//초기설정함수
	csInfoInit();
	
	//이벤트함수
	csInfoAttachEvent();
});

//초기설정함수
var csInfoInit = function() {
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
	if($("#returnT").val() == 't'){
		$("#startDt").val($("#returnStdt").val());
		$("#endDt").val($("#returnEdDt").val());
		$("#userGradeSelectWrap").val($("#returnSptValOne").val()).prop("selected", true);
		$("#userInfoSelectWrap").val($("#returnSptValTwo").val()).prop("selected", true);
		$("#searchVal").val($("#returnSearchVal").val());
		goPage($("#returnPage").val());
	}
}



/*이벤트함수*/
var csInfoAttachEvent = function() {

	/*검색쿼리작성하기*/
	$("#goSearch").click(function() {
		/*페이지가 1페이지인 검색함수*/
		goPage(1);
	});

	//목록클릭시 고객정보 전페이지가기
	$("#goCsInfoList").click(function() {
		$("#searchForm").attr("action","/csInfo/goCsInfoPage");
		$("#searchForm").attr("method","post");
		$("#searchForm").submit();
	});
}

/*글번호에 맞는 Detail 페이지 가기*/
var goDetail = function(csNo) {
	searchParam = {};
	$("input[name = csNo]").val(csNo);
	$("input[name = startDt]").val($("#startDt").val());
	$("input[name = endDt]").val($("#endDt").val());
	$("input[name = selectOptValOne]").val($("#userGradeSelectWrap option:selected").val());
	$("input[name = selectOptValTwo]").val($("#userInfoSelectWrap option:selected").val());
	$("input[name = searchVal]").val($("#searchVal").val());
	$("input[name = page]").val($("#hdThisPage").val());
	$('#searchForm').attr("action","/csInfo/detailCsInfoSearch");
	$('#searchForm').attr("method","POST");
	$('#searchForm').submit();
}

/*검색과 페이지 정보 같이 넘기기*/
var goPage = function(pageNum) {
	searchParam = {};
	searchParam.startDt = $("#startDt").val();
	searchParam.endDt = $("#endDt").val();
	searchParam.selectOptValOne = $("#userGradeSelectWrap option:selected").val();
	searchParam.selectOptValTwo = $("#userInfoSelectWrap option:selected").val();
	searchParam.searchVal = $("#searchVal").val();
	searchParam.page = pageNum;
	
	nowPage = pageNum;

	$.ajax({
		url: '/csInfo/searchCsInfoList',
		type: 'GET',
		data: searchParam,
		success: function(res) {
			var maxPage = res.maxPage;
			var startpage = res.startpage;
			var endpage = res.endpage;
			var csInfoList = res.csInfoList;
			var viewList = "";
			viewList += "<colgroup>";
			viewList += "<col width='10%;'>";
			viewList += "<col width='25%;'>";
			viewList += "<col width='25%;'>";
			viewList += "<col width='25%;'>";
			viewList += "<col width='15%;'>";
			viewList += "/colgroup";
			viewList += "<tr>";
			viewList += "<th>NO</th>";
			viewList += "<th>사용자ID</th>";
			viewList += "<th>사용자이름</th>";
			viewList += "<th>가입날짜</th>";
			viewList += "<th>회원구분</th>";
			viewList += "</tr>";
			if (csInfoList.length == 0) {

				viewList += "<tr>";
				viewList += "<td colspan='9'>데이터가 존재하지 않습니다</td>";
				viewList += "</tr>";

				$("#pageList").html("");
			} else {
				$.each(csInfoList, function(i, e) {
					var date = new Date(e.createDate);
					var year = date.getFullYear().toString();
					var month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
					var day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)

					viewList += "<tr class='hover' onclick='goDetail(" + e.csNo + ")'>";
					viewList += "<td>" + e.csNo + "</td>";
					viewList += "<td>" + e.csId + "</td>";
					viewList += "<td>" + e.csNm + "</td>";
					viewList += "<td>" + year + "-" + month + "-" + day + "</td>";
					viewList += "<td>" + e.csGrade + "</td>";
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
			$("#csInfoTable").html(viewList);
		}
	});
}

/*고객정보상세에서 구매이력 페이지 정보넘기기*/
var goPageOdHistory = function(pageNum) {
	searchParam = {};
	searchParam.selectOptValOne = $("#csNo").val();
	searchParam.page = pageNum;
	
	nowPage = pageNum;

	$.ajax({
		url: '/csInfo/searchOdHistoryList',
		type: 'GET',
		data: searchParam,
		success: function(res) {
			var maxPage = res.maxPage;
			var startpage = res.startpage;
			var endpage = res.endpage;
			var odInfoList = res.odInfoList;
			var viewList = "";
			viewList += "<colgroup>";
			viewList += "<col style='width:100px'>";
			viewList += "<col style='width:200px'>";
			viewList += "<col style='width:150px'>";
			viewList += "<col style='width:150px'>";
			viewList += "<col style='width:150px'>";
			viewList += "<col style='width:150px'>";
			viewList += "/colgroup";
			viewList += "<tr>";
			viewList += "<th style='background-color:#eaeaea;text-align:center;font-weight: 500;'>NO</th>";
			viewList += "<th style='background-color:#eaeaea;text-align:center;font-weight: 500;'>주문번호</th>";
			viewList += "<th style='background-color:#eaeaea;text-align:center;font-weight: 500;'>상품이름</th>";
			viewList += "<th style='background-color:#eaeaea;text-align:center;font-weight: 500;'>주문날짜</th>";
			viewList += "<th style='background-color:#eaeaea;text-align:center;font-weight: 500;'>배송날짜</th>";
			viewList += "<th style='background-color:#eaeaea;text-align:center;font-weight: 500;'>발송상태</th>";
			viewList += "</tr>";
			if (odInfoList.length == 0) {

				viewList += "<tr>";
				viewList += "<td colspan='9'>데이터가 존재하지 않습니다</td>";
				viewList += "</tr>";

				$("#pageList").html("");
			} else {
				$.each(odInfoList, function(i, e) {
					viewList += "<tr>";
					
					if((i+1)*(nowPage%10-1) == 0){
						viewList += "<td>"+(i+1) + "</td>";
					}else{
						viewList += "<td>"+(i+1)*(nowPage%10-1)+""+(i+1) + "</td>";
					}
					
					viewList += "<td>" + e.odNo + "</td>";
					
					var gdNmSplit = e.gdNm.split(",");
					if (gdNmSplit.length == 1) {
						viewList += "<td>" + e.gdNm + "</td>";
					}
					if (gdNmSplit.length > 1) {
						viewList += "<td>" + gdNmSplit[0] + " 외 " + (gdNmSplit.length - 1) + "</td>";
					}
					
					viewList += "<td>" + e.odDate + "</td>";
					
					if(e.trDate == null){
						viewList += "<td> - </td>";
					}else{
						viewList += "<td>" + e.trDate + "</td>";
					}
					
					viewList += "<td>" + e.odState + "</td>";
					viewList += "</tr>";
				});

				var pageList = "";
				if (1 < startpage) {
					/*startpage가 1보다 커야 실행가능*/
					pageList += '<span class="page mr6" onclick="goPageOdHistory(' + (startpage - 1) + ')">' + '&lt;&lt;' + '</span>';
				}
				for (var num = startpage; num <= endpage; num++) {
					pageList += '<span class="page mr6" onclick="goPageOdHistory(' + num + ')"'
					if (nowPage == num) {
						pageList += ' style = "background-color: #eee" >' + num
					} else {
						pageList += '>' + num
					}

					pageList += '</span>';
				}

				if (endpage < maxPage) {
					/*endpage가 maxPage보다 작아야 실행 가능*/
					pageList += '<span class="page mr6" onclick="goPageOdHistory(' + (endpage + 1) + ',1)">' + '&gt;&gt;' + '</span>';
				}
				$("#pageList").html(pageList);
			}
			$("#buyHistoryTable").html(viewList);
		}
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