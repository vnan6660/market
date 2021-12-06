/*
*생성자 : 김소연
*생성일 : 2021.11.27
*권한관리
*/

$(function() {
	init();
	attachEvent();
});

var init = function() {
	getAuthList("adminOpt");
}

var attachEvent = function() {

	//권한자 selectBox 변경시 event
	$("#authSelect").change(function() {
		getAuthList($("#authSelect option:selected").val());
	});

	$('#menuSaveBtn').click(function() {
		saveOpt();
	});
}


var allcheck = function() {
	var allcheckStatus = $('input:checkbox[id=allCheck]').is(":checked");

	if (allcheckStatus == true) {
		console.log("체크됨");
		$("input[name = checkbox]").each(function() {
			$("input[name = checkbox]").prop("checked", true);
		});
	} else {
		console.log("체크해제됨");
		$("input[name = checkbox]").each(function() {
			$("input[name = checkbox]").prop("checked", false);
		});
	}
}

var getAuthList = function(authSelect) {
	$.ajax({
		url: '/authMgt/getAuthMgtList',
		data: { "authSelect": authSelect },
		success: function(res) {
			var viewList = "";
			var checkF = 0;
			viewList += "<colgroup>";
			viewList += "<col width='20%;'>";
			viewList += "<col width='80%;'>";
			viewList += "<tr>";
			viewList += "<th><input type='checkbox' id='allCheck' onchange='allcheck()'></th>";
			viewList += "<th><h4>메뉴명</h4></th>";
			viewList += "</tr>";
			$.each(res, function(i, e) {
				viewList += "<tr>";
				if (e.adminYn != null) {
					if (e.adminYn == "Y") {
						viewList += "<th><input type='checkbox' name='checkbox' value='" + e.menuId + "' checked='checked'></th>";
					} else {
						viewList += "<th><input type='checkbox' name='checkbox' value='" + e.menuId + "'></th>";
						checkF += 1;
					}
				}
				if (e.userYn != null) {
					if (e.userYn == "Y") {
						viewList += "<th><input type='checkbox' name='checkbox' value='" + e.menuId + "' checked='checked'></th>";
					} else {
						viewList += "<th><input type='checkbox' name='checkbox' value='" + e.menuId + "'></th>";
						checkF += 1;
					}
				}
				viewList += "<th>" + e.menuNm + "</th>";
				viewList += "</tr>";
			});
			$("#authTable").html(viewList);
			if (checkF == 0) {
				$("input[id = allCheck]").attr("checked", true);
			}
		}
	});
}

var saveOpt = function() {
	var www={};
		 $("input[name = checkbox]").filter(function() {
		 if(this.checked){
			 www += this.defaultValue;
			 www += "/";
		}
		console.log(www);

	});
}