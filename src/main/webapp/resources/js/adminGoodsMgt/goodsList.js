/*
*생성자 : 김소연
*생성일 : 2021.12.14
* 물품목록
*/
var curDate;

$(function() {
	init();
	attachEvent();
});

var init = function() {

	//상품 구분에 맞는 상품분류 값 가져오기(베스트도서로 상품 구분값 setting)
	getGoodsSeparate("bestBook");

	//서버시간 가져오기
	getServerTime();
	
	//가져온 서버시간  startDate와 endDate에 넣기
	$("#startDt").attr('value',curDate.toISOString().substring(0, 10));
	$("#endDt").attr('value',curDate.toISOString().substring(0, 10));
}

var attachEvent = function() {

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

	//맨위에 있는 전체삭제 체크박스를 클릭했을 때 실행
	$("input[name = allDelCheck]").change(function() {
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

	});

	//맨위에 있는 전체개시 체크박스를 클릭했을 때 실행
	$("input[name = allShowCheck]").change(function() {
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
	
	xmlHttp.open('HEAD',window.location.href.toString(),false);
	xmlHttp.setRequestHeader('Content-Type','text/html');
	xmlHttp.send('');
	
	var serverDate = xmlHttp.getResponseHeader('Date');
	
	curDate = new Date(serverDate);
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
			$("#goodsSeparate").append("<option value=''>전체</option>");
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