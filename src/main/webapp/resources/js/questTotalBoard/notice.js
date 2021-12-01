/**
*생성자 : 김소연
*생성일 : 2021.12.01
*공지사항
*/
$(function() {
	attachEvent();
});

var attachEvent = function() {
	$("#goWriteForm").click(function() {
		location.href = "/write/notice";
	});
	
	$("#goNoticeList").click(function() {
		location.href = "/notice";
	});
	
	$("#goSearch").click(function() {
		/*검색쿼리작성하기*/
	});

	$("#saveWriteFrom").click(function() {
		if (confirm("저장하시겠습니까?")) {
			/*$.ajax({
				url: '',
				type: 'POST',
				data: $('#writeFromData').serialize()
			});*/
		}
	});
}

