/**
*장바구니js
*생성자 : 김혜경
*생성일 : 2021.12.28
*/

$(function() {

});

function check(){
	$("input[name = checkbox]").each(function() {
		if($("input[name = checkbox]").is(":checked") != true){
			$('input:checkbox[id=allCheck]').prop("checked", false);
		}	
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


//삭제버튼 눌렀을 때
function delCart(){
	
	data = {};
	
	
	
	confirm("삭제하시겠습니까?");
	if(confirm){
		$.ajax({
			url: '/myCart/delCart',
			type: "POST",
			data: data,
			success: function() {
				alert("삭제되었습니다.");
			},
			//오류났을때 처리
			error: function() {
				alert("오류입니다. 관리자에게 문의해주세요");
			}
		});
	}
	
	
}

