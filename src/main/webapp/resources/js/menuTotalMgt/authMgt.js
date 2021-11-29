/*
*생성자 : 김소연
*생성일 : 2021.11.27
*권한관리
*/
$(function() {
	attachEvent();
});

var attachEvent = function() {
	//전체선택체크박스에 변화가 있을 때
	$("#allCheck").change(function() {
		allcheck();
	});
}


var allcheck = function() {
	var allcheckStatus = $('input:checkbox[id=allCheck]').is(":checked");

	if (allcheckStatus == true) {
		console.log("체크됨");
		$("input[name = checkbox]").each(function() {
			if ($("input[name = checkbox]").is(":checked") == false) {
				$("input[name = checkbox]").attr("checked", true);
			}
		});
	} else {
		console.log("체크해제됨");
		$("input[name = checkbox]").each(function() {
			if ($("input[name = checkbox]").is(":checked") == true) {
				$("input[name = checkbox]").attr("checked", false);
			}
		});
	}
}


