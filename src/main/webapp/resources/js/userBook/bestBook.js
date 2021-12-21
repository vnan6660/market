/*
*생성자 : 김혜경
*생성일 : 2021.12.21
* 베스트도서 js
*/
$(function(){
	/*검색쿼리작성하기*/
	$("#goSearch").click(function() {
		/*페이지가 1페이지인 검색함수*/
		goPage(1);
	});
});

//상품상세 페이지 가기
var goDetail = function(gdNo) {
	location.href = "/bestBook/bestBookDetail/" + gdNo;
}

/*검색과 페이지 정보 같이 넘기기*/
var goPage = function(pageNum) {
	searchParam = {};
	searchParam.selectOptValOne = $("#goodsGroup option:selected").val();
	searchParam.searchVal = $("#searchVal").val();
	searchParam.page = pageNum;

	nowPage = pageNum;

	$.ajax({
		url: '/bestBook/searchBestBook',
		type: 'GET',
		data: searchParam,
		success: function(res) {
			var maxPage = res.maxPage;
			var startpage = res.startpage;
			var endpage = res.endpage;
			var bbList = res.bestBookList;
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

			$.each(bbList, function(i, e) {
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
				} else {
					pageList += '>' + num
				}

				pageList += '</span>';
			}

			if (endpage < maxPage) {
				/*endpage가 maxPage보다 작아야 실행 가능*/
				pageList += '<span class="page mr6" onclick="goPage(' + (endpage + 1) + ')">' + '&gt;&gt;' + '</span>';
			}

			$("#bestBookTable").html(viewList);
			$("#pageList").html(pageList);

		},
		error: function() {
			alert("오류입니다. 관리자에게 문의해주세요");
		}
	});
}