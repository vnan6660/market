/*
*생성자 : 김소연
*생성일 : 2021.12.16
* 물품상세
*/

$(function() {
	init();
	attachEvent();
});

var init = function() {
	//작성폼,삭제버튼,저장 버튼 숨기기
	$(".writeForm, #goodsDelBtn, #goodsUpdDoneBtn,#file1, #image").hide();

	injectGpSpNm();
}

var attachEvent = function() {

	//수정버튼을 누르면 실행
	$("#goodsUpdBtn").click(function() {
		$(".writeForm, #goodsDelBtn, #goodsUpdDoneBtn").show();
		$(".viewForm, #goodsUpdBtn").hide();

		//상품구분에 디테일 정보와 맞는 값 선택되게 하기
		$("#goodsGroup").val($("#hdGp").val()).prop("selected", true);

		//선택된 값에 맞는 상품 분류 리스트 셀렉트 박스에 가져오기
		getGoodsSeparate($("#hdGp").val());

		//상품분류에 디테일 정보와 맞는 값 선택되게 하기
		$("#goodsSeparate").val($("#hdSp").val()).prop("selected", true);
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

	//상품 구분값의 selectBox의 선택값이 변할때 실행
	$("#goodsGroup").change(function() {
		//상품구분 selected된 값
		var goodsGroup = $("#goodsGroup option:selected").val();

		//상품 구분에 맞는 상품분류 값 가져오기
		getGoodsSeparate(goodsGroup);
	});
}


//상품구분,상품분류의 코드에 맞게 이름 가져와서 넣기
var injectGpSpNm = function() {
	var hdGp = $("#hdGp").val();
	var hdSp = $("#hdSp").val();

	var viewGpNm;
	var viewSpNm;

	$.ajax({
		url: '/common/getCmmnCd',
		type: 'GET',
		success: function(res) {
			res.filter(function(e) {
				//상품구분코드에 맞는 상품구분이름찾기
				if (e.cmGrcd == hdGp && e.cmUpcd == null) {
					return viewGpNm = e.cmGrnm;
				}

				//상품분휴코드에 맞는 상품분루이름찾기
				if (e.cmGrcd == hdSp && e.cmUpcd == hdGp) {
					return viewSpNm = e.cmGrnm;
				}
			});

			$("#viewGp").text(viewGpNm);
			$("#viewSp").text(viewSpNm);
		},
		error: function() {
			alert("오류입니다. 관리자에게 문의해주세요");
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
			res.filter(function(e, i) {
				return $("#goodsSeparate").append("<option value='" + res[i].cmGrcd + "'>" + res[i].cmGrnm + "</option>");
			});
		},
		error: function() {
			alert("오류입니다. 관리자에게 문의해주세요");
		}
	});
}
