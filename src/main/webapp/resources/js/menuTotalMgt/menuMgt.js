/*
*생성자 : 김소연
*생성일 : 2021.11.27
*메뉴관리
*/

$(function() {
	init();
	attachEvent();
});

var init = function() {
	$("#blankTable").show();
	$("#writeTable").hide();

}
var attachEvent = function() {

	//관리자화면에 사용여부가 N인경우 사용자화면 사용여부도 N으로 선택
	$("#adminSelect").change(function() {
		if ($("#adminSelect option:selected").val() == "N") {
			$("#userSelect").val("N").prop("selected", true);
		}
	});

	//사용자화면 사용여부를 변경시 관리자화면에 사용여부가 N인경우 사용자화면 사용여부도 N으로 선택
	$("#userSelect").change(function() {
		if ($("#adminSelect option:selected").val() == "N") {
			$("#userSelect").val("N").prop("selected", true);
		}
	});

	//input Type이 number에서 들어오는 값이 숫자가 아닌경우 빈값으로 변경 
	$("input[type = number]").keyup(function() {
		$(this).val($(this).val().replace(/[^0-9]/gi, ""));
	});


	//새로운 메뉴 만들기 클릭시
	$("#plusMenu").click(function() {

		$("#blankTable").hide();
		$("#writeTable").show();

		/*상위메뉴명 selectbox의 없을을 selected값으로 설정*/
		$("#menuUpCd").val("").prop("selected", true);
		/*사용여부의 관리자 selectbox의 Y값을 selected값으로 설정*/
		$("#adminSelect").val("Y").prop("selected", true);
		/*사용여부의 사용자 selectbox의 Y값을 selected값으로 설정*/
		$("#userSelect").val("Y").prop("selected", true);

		/*menuId가 비어있지 않을 수도 있으니 "" 넣음*/
		$("#menuId").val("");

		/*새로운 메뉴 만들때는 삭제버튼 숨김*/
		$("#menuDelBtn").hide();

		/*새로운 메뉴 만들때는 저장버튼 재위치*/
		$("#menuSaveBtn").css("margin-left", "40%");

		/*menuNm,menuCd,menuSn 가 비어있지 않을 수도 있으니 "" 넣음*/
		$("#menuNm, #menuCd, #menuSn").val("");
	});

	//저장버튼 클릭시 
	$("#menuSaveBtn").click(function() {
		var emptyCheck = valiCheck();
		var menuId = $("#menuId").val();
		var menuCd = $("#menuCd").val();

		if (emptyCheck == 0) {
			/*저장버튼을 클리했을 때 success시 기존 메뉴들과 비교해서 menuId 또는 menuCd가 있는지 조회해서 있으면 update,없으면 insert로*/
			$.ajax({
				url: '/menuMgt/validationMenuMgt',
				type: 'GET',
				success: function(res) {
					var idDuplList = res.filter((ele) => {
						return ele.menuId == menuId;
					})
					var cdDuplList = res.filter((ele) => {
						return ele.menuCd == menuCd;
					})

					//메뉴Id값이 중복되지 않는경우 실행(저장)
					if (idDuplList.length == 0) {

						//코드값이 중복되는지 확인하여 없으면 save 있으면 메세지 띄우기
						cdDuplList.length == 0 ? saveMenuInfo() : alertMesg();
					}

					//메뉴Id값이 중복되는 경우 실행(수정)
					if (idDuplList.length != 0) {

						//코드값이 중복되는지 확인하여 없으면 update 있으면 메세지 띄우기
						cdDuplList.length == 0 ? updateMenuInfo(idDuplList[0].menuId) : alertMesg();
					}
				},
				error: function() {
					alert("오류입니다. 관리자에게 문의해주세요");
				}
			});
		} else {
			alert("필수 사항을 입력해주세요");
		}

	});

	/*메뉴 삭제 후 다시 원래 페이지로 돌아오기*/
	$("#menuDelBtn").click(function() {
		var menuId = $("#menuId").val();

		if (confirm('삭제하시겠습니까?')) {
			$.ajax({
				url: '/menuMgt/deleteMenuMgt',
				type: 'GET',
				data: { "menuId": menuId },
				success: function() {
					alert("삭제되었습니다");
					location.reload();
				},
				error: function() {
					alert("오류입니다. 관리자에게 문의해주세요");
				}
			});
		}
	});
}


/*메뉴 정보 insert 후 다시 원래 페이지로 돌아오기*/
var saveMenuInfo = function() {

	if (confirm('저장하시겠습니까?')) {
		$.ajax({
			url: '/menuMgt/setMenuMgt',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				"menuNm": $("#menuNm").val(),
				"menuCd": $("#menuCd").val(),
				"menuUpCd": $("#menuUpCd option:selected").val(),
				"menuSn": $("#menuSn").val(),
				"adminYn": $("#adminSelect option:selected").val(),
				"userYn": $("#userSelect option:selected").val()
			}),
			success: function() {
				alert("저장되었습니다");
				location.reload();
			},
			error: function() {
				alert("오류입니다. 관리자에게 문의해주세요");
			}
		});
	}
}
var alertMesg = function() {
	alert("코드값이 존재합니다. 다른 코드를 적어주세요");
}
/*메뉴 정보 update 후 다시 원래 페이지로 돌아오기*/
var updateMenuInfo = function(menuId) {
	if (confirm('변경하시겠습니까?')) {
		$.ajax({
			url: '/menuMgt/updateMenuMgt',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				"menuId": menuId,
				"menuNm": $("#menuNm").val(),
				"menuCd": $("#menuCd").val(),
				"menuUpCd": $("#menuUpCd option:selected").val(),
				"menuSn": $("#menuSn").val(),
				"adminYn": $("#adminSelect option:selected").val(),
				"userYn": $("#userSelect option:selected").val()
			}),
			success: function() {
				alert("변경되었습니다");
				location.reload();
			},
			error: function() {
				alert("오류입니다. 관리자에게 문의해주세요");
			}
		});
	}
}
//메뉴 클릭시 해당 메뉴정보 가져오기와서 오른쪽에table에 내용 뿌리기
menuClick = function(menuId) {

	$("#blankTable").hide();
	$("#writeTable").show();

	/*메뉴삭제버튼 보이기*/
	$("#menuDelBtn").show();

	/*메뉴삭제버튼 재위치*/
	$("#menuSaveBtn").css("margin-left", "19%");
	$.ajax({
		url: '/menuMgt/getMenuMgt',
		type: 'GET',
		data: { "menuId": menuId },
		success: function(res) {
			$("#menuId").val(res[0].menuId),
				$("#menuNm").val(res[0].menuNm),
				$("#menuCd").val(res[0].menuCd),
				$("#menuSn").val(res[0].menuSn),
				$("#menuUpCd").val(res[0].menuUpCd).prop("selected", true),
				$("#adminSelect").val(res[0].adminYn).prop("selected", true),
				$("#userSelect").val(res[0].userYn).prop("selected", true);
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

//input 빈값 체크
var valiCheck = function() {
	var emptyCheck = 0;
	$("input[name = valiCheck]").each(function() {
		if ($(this).val() == "") {
			$(this).css("border", "1px solid red");
			emptyCheck += 1;
			if (emptyCheck == 1) {
				$(this).focus();
			}
		} else {
			$(this).css("border", "1px solid black");
		}
	});
	return emptyCheck;
};