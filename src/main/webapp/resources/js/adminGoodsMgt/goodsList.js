/*
*생성자 : 김소연
*생성일 : 2021.12.14
* 상품목록
*/

$(function() {
	init();
	attachEvent();
});

var convert = function(e){
	
}
var init = function() {
	getGoodsSeparate("bestBook");
}

var attachEvent = function() {

	$("#goRegForm").click(function() {
		location.href = "/goodsReg/goodsRegPage";
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
