/*
*생성자 : 김소연
*생성일 : 2021.12.14
* 물품등록
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

	//목록버튼 누르면 실행
	$("#goodsListBtn").click(function() {
		history.back(-1);
	});

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


	//저장버튼 클릭시 실행
	$('#goodsRegBtn').click(function() {
		var reqirefileCheck = $("input[name = gdImgFile]").val();
		var emptyCheck = 0;

		if (!reqirefileCheck) {
			alert("상품이미지를 첨부해 주세요");
			return false;
		}

		$("input").each(function(i,e) {

			if (e.name != 'gdDetlFile' && $(this).val() == "") {
				emptyCheck += 1;
				if (emptyCheck == 1) {
					$(this).focus();
				}
				return alert("필수 입력사항을 입력해주세요");
			}
		});

		//빈값이 없을 경우에만 실행
		if (emptyCheck == 0) {
			if (confirm('저장하시겠습니까?')) {
				$.ajax({
					url: '/goodsReg/setGoodsReg',
					type: 'POST',
					enctype: 'multipart/form-data',
					contentType: false,//false 꼭 작성해야함
					processData: false,//false 꼭 작성해야함
					data: new FormData($('#goodsForm')[0]),
					success: function() {
						alert("저장되었습니다");
						location.href = "/goodsList/goodsListPage";
					},
					error: function() {
						alert("오류입니다. 관리자에게 문의해주세요");
					}
				})
			}
		}

	})

	//input Type이 number에서 들어오는 값이 숫자가 아닌경우 빈값으로 변경 
	$("input[type = number]").keyup(function() {
		$(this).val($(this).val().replace(/[^0-9]/gi, ""));
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

//input이 numberType일때의 길이 체크
var maxLengthCheck = function(object) {
	if (object.value.length > object.maxLength) {
		object.value = object.value.slice(0, object.maxLength);
	}
}

//파일타입체크
var chkFileType = function(obj) {
	var file_kind = obj.value.lastIndexOf('.');
	var file_name = obj.value.substring(file_kind + 1, obj.length);
	var file_type = file_name.toLowerCase();

	var checkFileType = new Array();

	checkFileType = ['jpg', 'png', 'jpeg'];


	//checkFileType 에서 맞는 fileType이 없어서 -1이 반환될때 실행 
	if (checkFileType.indexOf(file_type) == -1) {
		alert('이미지 파일만 선택할 수 있습니다.');
		var parent_Obj = obj.parentNode
		var node = parent_Obj.replaceChild(obj.cloneNode(true), obj);
		$("input[name = " + obj.name + "]").val("");
		return false;
	}
}
