/*
*생성자 : 김소연
*생성일 : 2021.12.14
* 물품목록
*/

$(function() {
	init();
	attachEvent();
});

var init = function() {

	getGoodsSeparate("bestBook");
}

var attachEvent = function() {

	$("#goRegForm").click(function() {
		location.href = "/goodsReg/goodsRegPage";
	});

	$("#goDelBtn").click(function() {
		goDeleteGoods();
	});
	
	$("#goShowBtn").click(function(){
		goShowGoods();
	});
	
	//맨위에 있는 전체삭제 체크박스를 클릭했을 때 실행
	$("input[name = allDelCheck]").change(function(){
		//전체삭제 체크박스의 현재상태
		var allDelCheckStatus = $("input[name = allDelCheck]").is(":checked");
		
		//전체삭제 체크박스가 체크되어있을 때 실행
		if(allDelCheckStatus == true){
			$("input[name = delCheck]").each(function(){
				$("input[name = delCheck]").prop("checked",true);
			});
		}
		
		//전체삭제 체크박스가 해제되어있을 때 실행
		if(allDelCheckStatus == false){
			$("input[name = delCheck]").each(function(){
				$("input[name = delCheck]").prop("checked",false);
			});
		}
		
	});
	
	//맨위에 있는 전체개시 체크박스를 클릭했을 때 실행
	$("input[name = allShowCheck]").change(function(){
		//전체개시 체크박스의 현재상태
		var allShowCheckStatus = $("input[name = allShowCheck]").is(":checked");
		
		//전체개시 체크박스가 체크되어있을 때 실행
		if(allShowCheckStatus == true){
			$("input[name = showCheck]").each(function(){
				$("input[name = showCheck]").prop("checked",true);
			});
		}
		
		//전체개시 체크박스가 해제되어있을 때 실행
		if(allShowCheckStatus == false){
			$("input[name = showCheck]").each(function(){
				$("input[name = showCheck]").prop("checked",false);
			});
		}
		
	});

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


var goShowGoods = function(){
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