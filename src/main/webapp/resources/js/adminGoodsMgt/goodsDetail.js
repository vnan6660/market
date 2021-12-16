/*
*생성자 : 김소연
*생성일 : 2021.12.16
* 물품상세
*/

$(function() {
	init();
	attachEvent();
});

var init = function(){
	
	//작성폼,삭제버튼,저장 버튼 숨기기
	$(".writeForm, #goodsDelBtn, #goodsUpdDoneBtn,#file1, #image").hide();
}

var attachEvent = function(){
	$("#goodsUpdBtn").click(function(){
		$(".writeForm, #goodsDelBtn, #goodsUpdDoneBtn").show();
		$(".viewForm, #goodsUpdBtn").hide();
		
	});
	
	//상품이미지항목에서 클릭버튼을 눌러서 이미지클릭 후 내용이 변경시
	$("#file1").change(function(input) {

		//input file태그안에 file이존재하면 실행(이미지 미리보기)
		if (input.currentTarget.files && input.currentTarget.files[0]) {
			var reader = new FileReader();

			reader.onload = function(e) {
				$('#image').attr('src', e.target.result);
			}
			reader.readAsDataURL(input.currentTarget.files[0]);
		}
		$("#image").show();
		$("#blankImage").hide();
	});
}