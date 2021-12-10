/*
*생성자 : 김소연
*생성일 : 2021.11.27
*권한관리
*/

$(function() {
	init();
	attachEvent();
});

/*페이지 로딩될때 즉시 실행시킬 것*/
var init = function() {
	getAuthList("adminOpt");
}

/*이벤트 함수*/
var attachEvent = function() {

	//권한자 selectBox 변경시 event
	$("#authSelect").change(function() {
		getAuthList($("#authSelect option:selected").val());
	});

	/*저장버튼을 누르면 db에 각 selectBox에 맞는 값 update*/
	$('#menuSaveBtn').click(function() {
		saveOpt($("#authSelect option:selected").val());
	});

}




//맨위에 있는 체크박스를 클릭시 아래에 있는 체크박스 전체선택또는 전체해제
var allcheck = function() {

	/*맨위에있는 체크박스 선택 또는 해제 상태*/
	var allcheckStatus = $('input:checkbox[id=allCheck]').is(":checked");


	if (allcheckStatus == true) {
		/*맨위에 있는 체크박스가 선택일때 아래에 있는 체크박스들을 disabled 제외하고 전체선택으로 바꿈*/
		$("input[name = checkbox]").each(function() {
			$("input[name = checkbox]:not(:disabled)").prop("checked", true);
		});
	} else {
		/*맨위에 있는 체크박스가 해제일때 아래에 있는 체크박스들을 disabled 제외하고 전체해제으로 바꿈*/
		$("input[name = checkbox]").each(function() {
			$("input[name = checkbox]:not(:disabled)").prop("checked", false);
		});
	}
}

var underCheck = function(e) {
	/*상위메뉴 미체크시 하위메뉴도 같이 미체크로 변경*/
	if (!e.checked) {
		if (e.attributes.hasmenuupcd.value == "none") {
			var hasmenuupcd = e.attributes.hasmenucd.value;
			$("input[name = checkbox][hasmenuupcd = " + hasmenuupcd + "]:not(:disabled)").prop("checked", false);
		}
	}
}

/*파라미터로 들어오는 selectBox값에 맞는 권한관리 목록 가져오기*/
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
				var hasMenuUpcd = "";
				var disabledYn = ">";
				if (e.menuUpCd != null) {
					hasMenuUpcd = "hasmenucd = 'none' hasmenuupcd = '" + e.menuUpCd + "'";
				} else {
					hasMenuUpcd = "hasmenucd = '" + e.menuCd + "'" + "hasmenuupcd = 'none'";
				}
				if (e.menuCd == "menuTotalMgt" || e.menuCd == "menuMgt" || e.menuCd == "authMgt") {
					disabledYn = "disabled = 'disabled'>";
				}
				/*관리자 권한 관리일때*/
				if (e.adminYn != null) {
					if (e.adminYn == "Y") {
						/*db값이 Y일떄 체크*/
						viewList += "<th><input type='checkbox' name='checkbox' value='" + e.menuId + "'onChange=underCheck(this) checked='checked'" + hasMenuUpcd + disabledYn + "</th>";
					} else {
						/*db값이 N일떄 체크안함*/
						viewList += "<th><input type='checkbox' name='checkbox' value='" + e.menuId + "'onChange=underCheck(this)" + hasMenuUpcd + disabledYn + "</th>";
						checkF += 1;
					}

				}
				/*사용자 권한 관리일때*/
				if (e.userYn != null) {
					if (e.userYn == "Y") {
						/*db값이 Y일떄 체크*/
						viewList += "<th><input type='checkbox' name='checkbox' value='" + e.menuId + "'onChange=underCheck(this) checked='checked'"+ hasMenuUpcd + disabledYn + "</th>";
					} else {
						/*db값이 N일떄 체크안함*/
						viewList += "<th><input type='checkbox' name='checkbox' value='" + e.menuId + "'onChange=underCheck(this)"+ hasMenuUpcd + disabledYn + "</th>";
						checkF += 1;
					}
				}

				var rowerText = e.menuUpCd == null ? "" : "-</span>";

				viewList += "<th>" + rowerText + e.menuNm + "</th>";
				viewList += "</tr>";
			});

			$("#authTable").html(viewList);

			if (checkF == 0) {
				/*리스트를 불러온 후 아래에 있는 체크박스가 전채 선택되었을 떄 맨위의 체크박스를 체크*/
				$("input[id = allCheck]").attr("checked", true);
			}
		}
	});
}

/*저장버튼을 누르면 db에 각 selectBox에 맞는 값 update*/
var saveOpt = function(authVal) {
	var optList = [];
	/*아래 체크박스가 현재 체크되어있는지 확인 후 되어있으면 list에 넣음*/
	$("input[name = checkbox]").filter(function() {
		if (this.checked) {
			optList.push(this.defaultValue);
		}
	});

	var optParam = {};
	optParam.optList = optList;
	optParam.authSelect = authVal;

	if (confirm('저장하시겠습니까?')) {
		$.ajax({
			url: '/authMgt/updateAuthMgtList',
			type: 'POST',
			data: JSON.stringify(optParam),
			contentType: 'application/json',
			success: function() {
				alert("저장완료되었습니다");
				location.reload();
			}
		});
	}
}