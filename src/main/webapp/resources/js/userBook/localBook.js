/*
*생성자 : 김혜경
*생성일 : 2021.12.22
*신간도서 js
*/

var searchParam = {};
var nowPage = 1;
$(function(){
	init();
	
	//검색
	$("#goSearch").click(function() {
		//페이지가 1페이지인 검색함수
		goPage(1,1);
	});
	
});

var init = function() {

	//상품 구분에 맞는 상품분류 값 가져오기(베스트도서로 상품 구분값 setting)
	getGoodsSeparate("localBook");

}

//상품상세 페이지 가기
var goDetail = function(gdNo) {
	location.href = "/localBook/localBookDetail/" + gdNo;
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
		url: '/localBook/searchLocalBook',
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
				if(e.gdSp == 'exam'){
					e.gdSp = '수험서';
				}else if(e.gdSp == 'child'){
					e.gdSp = '아동';
				}else if(e.gdSp == 'foreign'){
					e.gdSp = '외국어';
				}else if(e.gdSp == 'general'){
					e.gdSp = '일반서적';
				}else if(e.gdSp == 'magazine'){
					e.gdSp = '잡지';
				}else if(e.gdSp == 'special'){
					e.gdSp = '전문서적';
				}else if(e.gdSp == 'it'){
					e.gdSp = ' IT ';
				}
				viewList += "<tr>";
				viewList += "<td class='img hover' onclick='goDetail(" + e.gdNo + ")'><img id='img' alt='이미지없음' src='data:image/png;base64," + e.gdImg + "'></td>";
				viewList += "<td  valign='top' class='hover' onclick='goDetail(" + e.gdNo + ")'>" 
								+"<ul>"
									+"<li class='hover'>" + "<span class='hover f12'>" + "["+ e.gdSp +"]"+ "</span>" + "</li>"
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