/*
*생성자 : 김소연
*생성일 : 2022.01.06
*사용자 메인
*/
var current = 0;
var nowTab = 'epTab';

$(function() {
	userMainInit();
	userMainAttachEvent();
});

var userMainInit = function() {
	//현재 이미지 보여줌
	showSlides(nowTabInfo(), current);

	$('.tabcontent > div').hide().filter(':first').show();

}

var userMainAttachEvent = function() {

	//탭클릭시
	$(".tabNav a").click(function() {
		//현재 클릭한 tabId
		nowTab = $(this).attr("id");
		$('.tabcontent > div').hide().filter(this.hash).show();

		//tabnav a 에있는 active라고 지어진 Class지우기
		$('.tabNav a').removeClass('active');

		//클릭된a(this)에 active라고 Class주기
		$(this).addClass('active');

		// 원래의 a태그의 기능 무력화
		return false;
	}).filter(':first').click();


	//이전버튼클릭시
	$("#prev").click(function() {
		preSlide(nowTabInfo());
	});

	// 다음버튼클릭시
	$("#next").click(function() {
		nextSlide(nowTabInfo());
	});
}

//탭에따른 이미지가져오기
var nowTabInfo = function() {
	var slides;
	if (nowTab == 'epTab') {
		slides = $("#slides > #eventPrice > img");
	} else {
		slides = $("#slides > #gift > img");
	}
	return slides;
};

//현재 이미지 보여줌
var showSlides = function(slides, n) {
	slides.filter(function(i, e) {
		if (i == n) {
			//n번째 인건만 화면에 보이기
			e.style.display = 'block';
		} else {
			//그 외의 이미지 화면에서 감추기
			e.style.display = 'none';
		}
	});
}

//이전버튼클릭시
var preSlide = function(slides) {
	if (current > 0) {
		//두 번째,세 번째 이미지인경우
		current -= 1;
	} else {
		//첫 번째 이미지인경우
		//마지막 이미지를 보여줘야함
		current = slides.length - 1;
	}
	showSlides(slides, current);
}

// 다음버튼클릭시
var nextSlide = function(slides) {
	if (current < slides.length - 1) {
		//첫 번째,두 번째 이미지인경우
		//current가 2보다 작으면 다음위치로 이동
		current += 1;
	} else {
		//세 번째 이미지인경우
		//첫 번째 이미지를 보여줘야함
		current = 0;
	}
	showSlides(slides, current);
}
