/*
*생성자 : 김혜경
*생성일 : 2021.12.21
* 베스트도서 js
*/
var searchParam = {};
var nowPage = 1;
$(function(){
	init();
	
	//검색
	$("#goSearch").click(function() {
		//페이지가 1페이지인 검색함수
		goPage(1);
	});
	
	
	
});

var init = function() {

	//상품 구분에 맞는 상품분류 값 가져오기(베스트도서로 상품 구분값 setting)
	getGoodsSeparate("bestBook");

	//서버시간 가져오기
	getServerTime();

	//가져온 서버시간  startDate와 endDate에 넣기
	$("#startDt").attr('value', curDate.toISOString().substring(0, 10));
	$("#endDt").attr('value', curDate.toISOString().substring(0, 10));
}

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


//상품상세 페이지 가기
var goDetail = function(gdNo) {
	location.href = "/bestBook/bestBookDetail/" + gdNo;
}

//상품 구분에 맞는 상품분류 값 가져오기
var getGoodsSeparate = function(goodsGroup) {
	//selectBox안에 있는 하위요소만 삭제
	$("#goodsSeparate *").remove();

	$.ajax({
		url: '/goodsReg/goodsSeparate',
		type: "GET",
		data: {
			"goodsGroup": goodsGroup
		},
		success: function(res) {
			$("#goodsSeparate").append("<option value='optAll'>전체</option>");
			res.filter(function(e, i) {
				return $("#goodsSeparate").append("<option value='" + res[i].cmGrcd + "'>" + res[i].cmGrnm + "</option>");
			});
		},
		error: function() {
			alert("오류입니다. 관리자에게 문의해주세요");
		}
	});
}

//검색과 페이지 정보 같이 넘기기
var goPage = function(pageNum) {
	searchParam = {};
	searchParam.startDt = $("#startDt").val();
	searchParam.endDt = $("#endDt").val();
	searchParam.selectOptValTwo = $("#goodsSeparate option:selected").val();
	searchParam.selectOptValThree = $("#goodsNmNbrm option:selected").val();
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
			var reList = res.reList;
			var viewList = "";
			viewList += "<colgroup>";
			viewList += "<col width='200px;'>";
			viewList += "<col width='800px;'>";
			viewList += "<col width='150px;'>";
			viewList += "</colgroup>";

			$.each(reList, function(i, e) {

				viewList += "<tr>";
				viewList += "<td class='img hover' onclick='goDetail(" + e.gdNo + ")'><img id='img' alt='이미지없음' src='data:image/png;base64," + e.gdImg + "'></td>";
				viewList += "<td  valign='top' class='hover' onclick='goDetail(" + e.gdNo + ")'>" 
								+"<ul>"
									+"<li class='hover li'>" + "<span id='imgNm' class='hover f14'>" + e.gdNm + "</span>" + "</li>"
									+"<li class='hover li'>" + "<span class='hover f12'>" + e.gdWr + "(지은이)" + "  |  " + "</span>" + "<span class='hover f12'>" + e.gdPb + "(출판사)"  +"</span>" + "</li>"
									+"<li class='hover li'>" + "<span id='gdDc' class='hover f14'>" + e.gdDc + "</span>" + "</li>"
									+"<c:if test='${vo.gdPrice} >= 1000'>"
										+"<li class='hover li imgPrice f14' >" + "<span class='hover' id='gdPriceComma'>"
										+ e.gdPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "원" 
										+ "</span>" + "</li>"
									+"</c:if>"
								+"</ul>"
							+"</td>";
				viewList += "<td class='hover'>" + "<button id='cartBtn'>장바구니</button></td>";

				/*if (e.gdYn == 'Y') {
					viewList += "<td><input type='checkbox' name='showCheck' checked='checked' value='" + e.gdNo + "'></td>";
				}
				if (e.gdYn == 'N') {
					viewList += "<td><input type='checkbox' name='showCheck' value='" + e.gdNo + "'></td>";
				}*/
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