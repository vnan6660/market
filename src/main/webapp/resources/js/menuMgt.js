$(function() {
	attachEvent();
});

var attachEvent = function() {
	$("#plusMenu").click(function() {
		$("#menuDelBtn").hide();
		$("#menuSaveBtn").css("margin-left", "40%");
		$("#menuNm, #menuCd, #menuSn").val("");
	});

	$("#menuSaveBtn").click(function() {
		$.ajax({
			url: "/MenuInfo",
			type: "POST",
			dataType: "Json",
			data: JSON.stringify({
				"menuNm": $("#menuNm").val(),
				"menuCd": $("#menuCd").val(),
				"menuUpCd": $("#menuUpCd option:selected").val(),
				"menuSn": $("#menuSn").val(),
				"adminYn": $("#adminSelect option:selected").val(),
				"userYn": $("#userSelect option:selected").val()
			}),
			contentType: 'application/json'
		});
		
	});
}