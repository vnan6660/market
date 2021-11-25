$(function() {
	attachEvent();
	getUpperCd();
});

var attachEvent = function() {
	//새로운 메뉴 만들기 클릭시
	$("#plusMenu").click(function() {
		$("#menuDelBtn").hide();
		$("#menuSaveBtn").css("margin-left", "40%");
		$("#menuNm, #menuCd, #menuSn").val("");
	});

	//저장버튼 클릭시 
	$("#menuSaveBtn").click(function() {
		var menuId = $("#menuId").val();
		var menuCd = $("#menuCd").val();
		/*저장버튼을 클리했을 때 menuId 또는 menuCd가 있는지 조회해서 있으면 update,없으면 insert로*/
		$.ajax({
			url: '/valiMenuCd',
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

	var updateMenuInfo = function(menuId) {
		$.ajax({
			url: '/menuInfo/upd',
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
				location.href = "/menuMgt";
			}
		});
	}

	var saveMenuInfo = function() {
		$.ajax({
			url: '/menuInfo',
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
				location.href = "/menuMgt";
			}
		});
	}

	//삭제버튼 클릭시
	$("#menuDelBtn").click(function() {
		var menuId = $("#menuId").val();

		$.ajax({
			url: '/menuInfo/del',
			type: 'GET',
			data: { "menuId": menuId },
			success: function() {
				location.href = "/menuMgt";
			}
		});
	});
}

// 메뉴 클릭시 옆에 리스트 띄우기
menuClick = function(menuId) {
	$.ajax({
		url: '/menuInfo',
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

var getUpperCd = function() {
	//console.log("실행");
	/*$.ajax({
		url: '/UpCdInfo',
		type: 'GET'
	});*/
}