$(function() {
	attachEvent();
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

	});

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