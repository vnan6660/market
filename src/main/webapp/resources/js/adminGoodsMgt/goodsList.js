/*
*생성자 : 김소연
*생성일 : 2021.12.14
* 물품목록
*/
var curDate;
var searchParam = {};
var nowPage = 1;

$(function() {
	init();
	attachEvent();
});

var init = function() {

	//상품 구분에 맞는 상품분류 값 가져오기(베스트도서로 상품 구분값 setting)
	getGoodsSeparate("bestBook");

	//서버시간 가져오기
	getServerTime();

	//달력시간 해당월1일로 셋팅
	var startDate = new Date(curDate);
	startDate.setDate(1);

	//가져온 서버시간  startDate와 endDate에 넣기
	$("#startDt").attr('value', startDate.toISOString().substring(0, 10));
	$("#endDt").attr('value', curDate.toISOString().substring(0, 10));
}

var attachEvent = function() {

	/*검색쿼리작성하기*/
	$("#goSearch").click(function() {
		/*페이지가 1페이지인 검색함수*/
		goPage(1, 1);
	});

	//물품등록 버튼 클릭시 실행
	$("#goRegForm").click(function() {
		location.href = "/goodsReg/goodsRegPage";
	});

	//상품삭제버튼 클릭시 실행
	$("#goDelBtn").click(function() {
		goDeleteGoods();
	});

	//상품개시버튼 클릭시 실행
	$("#goShowBtn").click(function() {
		goShowGoods();
	});
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
//맨위에 있는 전체삭제 체크박스를 클릭했을 때 실행
var allDelCheck = function() {

	//전체삭제 체크박스의 현재상태
	var allDelCheckStatus = $("input[name = allDelCheck]").is(":checked");

	//전체삭제 체크박스가 체크되어있을 때 실행
	if (allDelCheckStatus == true) {
		$("input[name = delCheck]").each(function() {
			$("input[name = delCheck]").prop("checked", true);
		});
	}

	//전체삭제 체크박스가 해제되어있을 때 실행
	if (allDelCheckStatus == false) {
		$("input[name = delCheck]").each(function() {
			$("input[name = delCheck]").prop("checked", false);
		});
	}

}

//맨위에 있는 전체개시 체크박스를 클릭했을 때 실행
var allShowCheck = function() {

	//전체개시 체크박스의 현재상태
	var allShowCheckStatus = $("input[name = allShowCheck]").is(":checked");

	//전체개시 체크박스가 체크되어있을 때 실행
	if (allShowCheckStatus == true) {
		$("input[name = showCheck]").each(function() {
			$("input[name = showCheck]").prop("checked", true);
		});
	}

	//전체개시 체크박스가 해제되어있을 때 실행
	if (allShowCheckStatus == false) {
		$("input[name = showCheck]").each(function() {
			$("input[name = showCheck]").prop("checked", false);
		});
	}
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

//상품상세 페이지 가기
var goDetail = function(gdNo) {
	location.href = "/goodsList/detailGoods/" + gdNo;
}

var goDeleteGoods = function() {
	var delNoList = [];

	$("input[name = delCheck]").each(function(i, e) {
		//삭제체크박스에 체크되어있는 것만
		if (e.checked == true) {
			delNoList.push(e.value);
		}
	});

	if (confirm('삭제하시겠습니까?')) {
		if (delNoList.length != 0) {
			$.ajax({
				url: '/goodsList/deleteGoods',
				type: 'GET',
				data: { "delNoList": delNoList },
				success: function() {
					alert("삭제되었습니다");
					location.href = "/goodsList/goodsListPage";
				},
				error: function() {
					alert("오류입니다. 관리자에게 문의해주세요");
				}
			});
		} else {
			alert("삭제할 항목이 존재하지 않습니다");
		}
	}


}


var goShowGoods = function() {
	var showNoList = [];

	$("input[name = showCheck]").each(function(i, e) {
		//개시체크박스에 체크되어있는 것만
		if (e.checked == true) {
			showNoList.push(e.value);
		}
	});

	if (confirm('개시하시겠습니까?')) {
		$.ajax({
			url: '/goodsList/showGoods',
			type: 'GET',
			data: { "showNoList": showNoList },
			success: function() {
				alert("개시정보가 변경되었습니다");
				location.href = "/goodsList/goodsListPage";
			},
			error: function() {
				alert("오류입니다. 관리자에게 문의해주세요");
			}
		});
	}
}


//검색과 페이지 정보 같이 넘기기
var goPage = function(pageNum, tfNum) {
	searchParam = {};
	if (tfNum != 0) {
		searchParam.startDt = $("#startDt").val();
		searchParam.endDt = $("#endDt").val();
	}
	searchParam.selectOptValOne = $("#goodsGroup option:selected").val();
	searchParam.selectOptValTwo = $("#goodsSeparate option:selected").val();
	searchParam.selectOptValThree = $("#goodsNmNbrm option:selected").val();
	searchParam.searchVal = $("#searchVal").val();
	searchParam.page = pageNum;

	nowPage = pageNum;

	$.ajax({
		url: '/goodsList/searchGoodsList',
		type: 'GET',
		data: searchParam,
		success: function(res) {
			var maxPage = res.maxPage;
			var startpage = res.startpage;
			var endpage = res.endpage;
			var reList = res.reList;
			var viewList = "";
			viewList += "<colgroup>";
			viewList += "<col width='5%;'>";
			viewList += "<col width='5%;'>";
			viewList += "<col width='10%;'>";
			viewList += "<col width='10%;'>";
			viewList += "<col width='20%;'>";
			viewList += "<col width='20%;'>";
			viewList += "<col width='10%;'>";
			viewList += "<col width='10%;'>";
			viewList += "<col width='5%;'>";
			viewList += "</colgroup>";
			viewList += "<tr>";
			viewList += "<th><input type='checkbox' name='allDelCheck' onchange='allDelCheck()'></th>";
			viewList += "<th>NO</th>";
			viewList += "<th>상품구분</th>";
			viewList += "<th>상품분류</th>";
			viewList += "<th>상품이미지</th>";
			viewList += "<th>상품이름</th>";
			viewList += "<th>상품가격</th>";
			viewList += "<th>재고</th>";
			viewList += "<th><input type='checkbox' name='allShowCheck' onchange='allShowCheck()'></th>";
			viewList += "</tr>";

			$.each(reList, function(i, e) {

				viewList += "<tr>";
				viewList += "<td><input type='checkbox' name='delCheck' value='" + e.gdNo + "'></td>";
				viewList += "<td class='hover' onclick='goDetail(" + e.gdNo + ")'>" + e.gdNo + "</td>";
				viewList += "<td class='hover' onclick='goDetail(" + e.gdNo + ")'>" + e.gdGpNm + "</td>";
				viewList += "<td class='hover' onclick='goDetail(" + e.gdNo + ")'>" + e.gdSpNm + "</td>";
				viewList += "<td class='img hover' onclick='goDetail(" + e.gdNo + ")'><img alt='이미지없음' src='data:image/png;base64," + e.gdImg + "'></td>";
				viewList += "<td class='hover' onclick='goDetail(" + e.gdNo + ")'>" + e.gdNm + "</td>";
				viewList += "<td class='hover' id='gdPriceComma'  onclick='goDetail(" + e.gdNo + ")'>" + e.gdPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<span>원</span></td>";
				viewList += "<td class='hover' onclick='goDetail(" + e.gdNo + ")'>" + e.gdCnt + "</td>";

				if (e.gdYn == 'Y') {
					viewList += "<td><input type='checkbox' name='showCheck' checked='checked' value='" + e.gdNo + "'></td>";
				}
				if (e.gdYn == 'N') {
					viewList += "<td><input type='checkbox' name='showCheck' value='" + e.gdNo + "'></td>";
				}
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
				} else {
					pageList += '>' + num
				}

				pageList += '</span>';
			}

			if (endpage < maxPage) {
				/*endpage가 maxPage보다 작아야 실행 가능*/
				pageList += '<span class="page mr6" onclick="goPage(' + (endpage + 1) + ',1)">' + '&gt;&gt;' + '</span>';
			}

			$("#goodsListTable").html(viewList);
			$("#pageList").html(pageList);

			$("#gdPriceComma").text(addComma($("#gdPriceComma").text()));

		},
		error: function() {
			alert("오류입니다. 관리자에게 문의해주세요");
		}
	});
}