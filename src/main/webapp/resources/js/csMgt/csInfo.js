/**
*생성자 : 김소연
*생성일 : 2021.12.09
*고객정보
*/

$(function() {
	attachEvent();
});

/*이벤트함수*/
var attachEvent = function() {

	/*검색쿼리작성하기*/
	$("#goSearch").click(function() {
		/*페이지가 1페이지인 검색함수*/
		goPage(1);
	});
}

/*글번호에 맞는 Detail 페이지 가기*/
var goDetail = function(csNo) {
	location.href = '/csInfo/detailCsInfo/'+csNo;
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

			$.each(csInfoList, function(i, e) {
				var date = new Date(e.createDate);
				var year = date.getFullYear().toString();
				var month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
				var day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)

				viewList += "<tr>";
				viewList += "<td>" + e.ntcNo + "</td>";
				viewList += "<td class='hover' onclick='goDetail(" + e.csNo + ")'>" + e.csId + "</td>";
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