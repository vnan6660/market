/*
*생성자 : 김소연
*생성일 : 2021.12.14
* 상품등록
*/

$(function() {
	init();
	attachEvent();
});

var init = function() {

	$("#file1, #image").hide();
	//베스트도서에 맞는 상품분류 값 가져오기
	getGoodsSeparate("bestBook");
}

var attachEvent = function() {
	//상품구분 selectBox가 변화되면 실행
	$("#goodsGroup").change(function() {

		//상품구분 selected된 값
		var goodsGroup = $("#goodsGroup option:selected").val();

		//상품 구분에 맞는 상품분류 값 가져오기
		getGoodsSeparate(goodsGroup);
	});


	//상품이미지항목에서 클릭버튼을 눌러서 이미지클릭 후 내용이 변경시
	$("#file1").change(function(input) {

		//input file태그안에 file이존재하면 실행(이미지 미리보기)
		if (input.currentTarget.files && input.currentTarget.files[0]) {
			var reader = new FileReader();

			reader.onload = function(e) {
				$('#image').attr('src', e.target.result);
			}
			reader.readAsDataURL(input.currentTarget.files[0]);
		}
		$("#image").show();
		$("#blankImage").hide();
	});
	
	
	$("#goodsRegBtn").click(function(){
		alert("저장버튼 누름");
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
			res.filter(function(e, i) {
				return $("#goodsSeparate").append("<option value='" + res[i].cmGrcd + "'>" + res[i].cmGrnm + "</option>");
			});
		},
		error: function() {
			alert("오류입니다. 관리자에게 문의해주세요");
		}
	});
}

