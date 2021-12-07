/*
*생성자 : 김소연
*생성일 : 2021.11.27
*메뉴관리
*/

$(function() {
	attachEvent();
});

var attachEvent = function() {
	//새로운 메뉴 만들기 클릭시
	$("#plusMenu").click(function() {
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
		var menuId = $("#menuId").val();
		var menuCd = $("#menuCd").val();
		
		/*저장버튼을 클리했을 때 success시 menuId 또는 menuCd가 있는지 조회해서 있으면 update,없으면 insert로*/
		$.ajax({
			url: '/menuMgt/validationMenuMgt',
			type: 'GET',
			success: function(res) {
				var list = res.filter((ele) => {
					return ele.menuId == menuId || ele.menuCd == menuCd;
				})
				list.length == 0 ? saveMenuInfo() : typeof menuId == 'undefined' || menuId == '' ? alertMesg() : updateMenuInfo(list[0].menuId);
			}
		});
	});

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
					location.href = "/menuMgt/menuMgtPage";
				}
			});
		}
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
					location.href = "/menuMgt/menuMgtPage";
				}
			});
		}
	}

	/*메뉴 삭제 후 다시 원래 페이지로 돌아오기*/
	$("#menuDelBtn").click(function() {
		var menuId = $("#menuId").val();

		if (confirm('삭제하시겠습니까?')) {
			$.ajax({
				url: '/menuMgt/deleteMenuMgt',
				type: 'GET',
				data: { "menuId": menuId },
				success: function() {
					location.href = "/menuMgt/menuMgtPage";
				}
			});
		}
	});
}

//메뉴 클릭시 해당 메뉴정보 가져오기와서 오른쪽에table에 내용 뿌리기
menuClick = function(menuId) {
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
		}
	});
}