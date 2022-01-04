/*
*생성자 : 김소연
*생성일 : 2021.12.16
* 물품상세
*/

$(function() {
	goodsDetailInit();
	goodsDetailAttachEvent();
});

var goodsDetailInit = function() {
	//작성폼,삭제버튼,저장 버튼 숨기기
	$(".writeForm, #goodsDelBtn, #goodsUpdDoneBtn,#file1, #image").hide();

	//상품구분,상품분류의 코드에 맞게 이름 가져와서 넣기
	injectGpSpNm();
}

var goodsDetailAttachEvent = function() {

	$("#file2Btn").click(function(e) {
		e.preventDefault();
		$("#gdDetlLabel").click();

	});
	
	$("#file2").change(function(){
		$("#file2Btn").hide();
		$("#file2Btn").siblings().hide();
		$("#file2").show();
	});

	//목록버튼 누르면 실행
	$("#goodsListBtn").click(function() {
		$("#searchForm").attr("action","/goodsList/goGoodsListPage");
		$("#searchForm").attr("method","post");
		$("#searchForm").submit();
	});

	//수정버튼을 누르면 실행
	$("#goodsUpdBtn").click(function() {
		//수정하는 폼, 삭제버튼, 저장 버튼은 보이기
		$(".writeForm, #goodsDelBtn, #goodsUpdDoneBtn").show();
		//값보여주는 폼, 수정 버튼은 숨김
		$(".viewForm, #goodsUpdBtn").hide();

		//상품구분에 디테일 정보와 맞는 값 선택되게 하기
		$("#goodsGroup").val($("#hdGp").val()).prop("selected", true);

		//선택된 값에 맞는 상품 분류 리스트 셀렉트 박스에 가져오기
		getGoodsSeparate($("#hdGp").val());

		//상품분류에 디테일 정보와 맞는 값 선택되게 하기
		$("#goodsSeparate").val($("#hdSp").val()).prop("selected", true);

		//상품개시에 디테일 정보와 맞는 값 선택되게 하기
		$("#gdYnSelect").val($("#gdYn").text()).prop("selected", true);

		//상세설명에 이미지 파일이 없을시
		gdDetailFileExist();

	});

	//수정 완료 버튼을 눌렀을 때 실행
	$("#goodsUpdDoneBtn").click(function() {
		var emptyCheck = 0;

		$(".writeForm input").each(function(i, e) {

			if (e.name != 'gdDetlFile' && $(this).val() == "") {
				if (e.name != 'gdImgFile') {
					emptyCheck += 1;
				}
				if (emptyCheck == 1) {
					$(this).focus();
					return alert("필수 입력사항을 입력해주세요");
				}
			}
		});

		//빈값이 없을 경우에만 실행
		if (emptyCheck == 0) {
			if (confirm('저장하시겠습니까?')) {
				$.ajax({
					url: '/goodsList/updateGoods',
					type: 'POST',
					enctype: 'multipart/form-data',
					contentType: false,//false 꼭 작성해야함
					processData: false,//false 꼭 작성해야함
					data: new FormData($('#goodsForm')[0]),
					success: function() {
						alert("저장되었습니다");
						$("#searchForm").attr("action","/goodsList/detailGoodsSearch");
						$("#searchForm").attr("method","post");
						$("#searchForm").submit();
					},
					error: function() {
						alert("오류입니다. 관리자에게 문의해주세요");
					}
				})
			}
		}


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
		$("#blankImage ,#orginImg").hide();
	});

	//상품 구분값의 selectBox의 선택값이 변할때 실행
	$("#goodsGroup").change(function() {

		//상품구분 selected된 값
		var goodsGroup = $("#goodsGroup option:selected").val();

		//상품 구분에 맞는 상품분류 값 가져오기
		getGoodsSeparate(goodsGroup);
	});

	//삭제버튼을 클릭시 실행
	$("#goodsDelBtn").click(function() {

		//상품 번호의 값
		var delNoList = [$("#gdNo").val()];

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
	});

	//input Type이 number에서 들어오는 값이 숫자가 아닌경우 빈값으로 변경 
	$("input[type = number]").keyup(function() {
		$(this).val($(this).val().replace(/[^0-9]/gi, ""));
	});

}


//상품구분,상품분류의 코드에 맞게 이름 가져와서 넣기
var injectGpSpNm = function() {
	//숨겨진 상품 구분값
	var hdGp = $("#hdGp").val();
	//숨겨진 상품 분류값
	var hdSp = $("#hdSp").val();

	//viewGp에 넣어질 값
	var viewGpNm;
	//viewSp에 넣어질 값
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

var gdDetailFileExist = function() {
	var fiel2Exist = $("#file2").parents(".writeForm").siblings(".viewForm").children();
	if (fiel2Exist.attr('src').substring(22) == "") {

	}
}