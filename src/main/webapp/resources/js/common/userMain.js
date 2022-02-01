/*
*생성자 : 김소연
*생성일 : 2022.01.06
*사용자 메인
*/
var current = 0;
var nowTab = 'epTab';
var beforeRecomnClick = 'newBook';
var beforeRand;

$(function() {
	//초기설정함수
	userMainInit();
	userMainAttachEvent();
});

//초기설정함수
var userMainInit = function() {
	//현재 이미지 보여줌
	showSlides(nowTabInfo(), current);

	//베스트셀러Rank불러오기
	bestSellerLoad();

	//베스트셀러 모음 불러오기
	bestSellerLoad('special');

	//신간도서불러오기
	recommendLoad('newBook', 'notReload');

	$('.tabcontent > div').hide().filter(':first').show();

	var mainHeight = $("#contentsWrap").outerHeight(true);
	$("#sideUlWrap").css("height", mainHeight + "px");

}

//이벤트함수
var userMainAttachEvent = function() {

	//탭클릭시
	$("#tabNav a").click(function() {
		//현재 클릭한 tabId
		nowTab = $(this).attr("id");
		$('.tabcontent > div').hide().filter(this.hash).show();

		//tabnav a 에있는 active라고 지어진 Class지우기
		$('#tabNav a').removeClass('active');

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

	//1~5위 버튼 클릭시
	$("#oneRank").click(function() {
		$("#bestRankListTwo").hide();
		$("#bestRankListOne").show();
	});

	//6~10위 버튼 클릭시
	$("#sixRank").click(function() {
		$("#bestRankListOne").hide();
		$("#bestRankListTwo").show();
	});

	//베스트셀러탭클릭시
	$("#bestSellerTab ul li").click(function() {
		//li의 첫번째 태그에의 값 가져오기
		var bestTabVal = this.childNodes[0].defaultValue;

		//+버튼을 눌렀을때 실행
		if (typeof bestTabVal == 'undefined') {
			location.href = '/bestBook/bestBookPage';

			//bestTabVal에 맞는 베스트셀러 불러오기	
		} else {
			bestSellerLoad(bestTabVal);
		}
	});

	//추천도서탭클릭시
	$("#recommendTab ul li").click(function() {
		//li의 첫번째 태그에의 값 가져오기
		var recommendTabVal = this.childNodes[0].defaultValue;

		beforeRecomnClick = recommendTabVal;


		if (typeof recommendTabVal != 'undefined') {
			//recommendTabVal에 맞는 추천도서 불러오기	
			recommendLoad(recommendTabVal, 'notReload');
		}
	});

	//추천도서새로고침 누르면 실행
	$("#recomndReload").click(function() {

		//beforeRecomnClick에 맞는 추천도서 불러오기
		recommendLoad(beforeRecomnClick, 'reload');
	});

	//추천도서 이미지 클릭시
	$("#recomnImg img").click(function() {
		var recomnGdNo = $("#recomnGdNo").val();

		//상품상세페이지가기
		goDetail(recomnGdNo,beforeRecomnClick);
	});
	
	//베스트 도서 이미지 클릭시
	$("#bestRankListOne div img, #bestRankListTwo div img").click(function() {
		
		var bestBookGdNo =  $(this).parent().siblings().filter('input[id = bestBookGdNo]')[0].defaultValue;
		
		//상품상세페이지가기
		goDetail(bestBookGdNo);
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

//베스트셀러불러오기
var bestSellerLoad = function(code) {
	$.ajax({
		url: '/common/getBestSeller'
		, async: false
		, success: function(res) {
			var bestRankResult;
			var bestRankListOne = "";
			var bestRankListTwo = "";

			var bestRes;
			var bestResList = "";

			if (typeof code == 'undefined') {
				//베스트 랭킹담기
				if (res.length > 1) {
					//selQty Desc순으로 정렬
					bestRankResult = res.sort(function(a, b) {
						return b.selQty - a.selQty;
						//정렬된 것을 10개만 가져오기
					}).filter(function(e, i) {
						return i < 10;
					});
				} else {
					bestRankResult = res.filter(function(e, i) {
						return i < 10;
					});
				}

				$.each(bestRankResult, function(i, e) {
					if (i < 5) {
						bestRankListOne += "<li>"
						bestRankListOne += "<div>" + (i + 1) + "</div>";
						bestRankListOne += "<div style='width: 50%'>";
						bestRankListOne += "<input type='hidden' id='bestBookGdNo' value='"+e.gdNo+"'>";
						bestRankListOne += "<span class='hover'><img alt='이미지없음' src='data:image/png;base64," + e.gdImg + "'></span>";
						bestRankListOne += "</div>";
						bestRankListOne += "<div style='width: 50%;display: flex;flex-direction: column; '>";
						bestRankListOne += "<span>" + e.gdNm + "</span>";
						bestRankListOne += "<span>" + e.gdWr + "</span>";
						bestRankListOne += "</div>";
						bestRankListOne += "</li>"
					} else {
						bestRankListTwo += "<li>"
						bestRankListTwo += "<div>" + (i + 1) + "</div>";
						bestRankListTwo += "<div style='width: 50%'>";
						bestRankListTwo += "<input type='hidden' id='bestBookGdNo' value='"+e.gdNo+"'>";
						bestRankListTwo += "<span class='hover'><img alt='이미지없음' src='data:image/png;base64," + e.gdImg + "'></span>";
						bestRankListTwo += "</div>";
						bestRankListTwo += "<div style='width: 50%;display: flex;flex-direction: column; '>";
						bestRankListTwo += "<span>" + e.gdNm + "</span>";
						bestRankListTwo += "<span>" + e.gdWr + "</span>";
						bestRankListTwo += "</div>";
						bestRankListTwo += "</li>"
					}

				});

				$("#bestRank #bestRankListOne").html(bestRankListOne);
				$("#bestRank #bestRankListTwo").html(bestRankListTwo);
			}

			if (typeof code != 'undefined') {
				bestRes = res.filter(function(e, i) {
					return e.gdSp == code;
				});

				$.each(bestRes, function(i, e) {
					var ee= "ffff";
					bestResList += "<li>";
					bestResList += "<div onclick='goDetail("+e.gdNo+")'>";
					bestResList += "<span class='hover'><img alt='이미지없음' src='data:image/png;base64," + e.gdImg + "'></span>";
					bestResList += "</div>";
					bestResList += "<div style='display: flex;flex-direction: column; '>";
					bestResList += "<span>" + e.gdNm + "</span>";
					bestResList += "<span>" + e.gdWr + "</span>";
					bestResList += "</div>";
					bestResList += "</li>";
				});

				$("#bestSeller > ul").html(bestResList);

			}

		}
		, error: function() {
			alert("오류입니다. 관리자에게 문의해주세요");
		}
	});
}

var recommendLoad = function(upCd, doReload) {
	$.ajax({
		url: '/common/getRecomnSeller'
		, data: {
			"gpCd": upCd
		}
		, async: false
		, success: function(res) {
			let randNum = rand(res.length, 'notReload');

			if (doReload == 'notReload') {
				beforeRand = randNum;
			}

			//전에 랜덤 숫자와 같은 숫자일때 한번더 랜덤 돌리기
			if (doReload == 'reload') {
				if(beforeRand == randNum){
					randNum = rand(res.length, 'reload');
				}
				beforeRand = randNum;
			}

			let beforeRecomnNm = "";
			if (beforeRecomnClick == 'newBook') {
				beforeRecomnNm = '신간도서';
			}
			if (beforeRecomnClick == 'localBook') {
				beforeRecomnNm = '국내도서';
			}
			if (beforeRecomnClick == 'foreignBook') {
				beforeRecomnNm = '외국도서';
			}

			let resVal = res.filter(function(e, i) {
				return i == randNum;
			});

			$("#recomnImg > img").attr("src", 'data:image/png;base64,' + resVal[0].gdImg);
			$("#recomnGdNm").html("[" + beforeRecomnNm + "]" + resVal[0].gdNm);
			$("#recomnGdNo").val(resVal[0].gdNo);
		}
		, error: function() {
			alert("오류입니다. 관리자에게 문의해주세요");
		}
	});
}

//res에 대한 랜덤 정수 숫자 구하기
var rand = function(max, doReload) {

	var randResult = Math.floor(Math.random() * max);

	if (doReload == 'reload') {
		while (beforeRand == randResult) {
			if (beforeRand != randResult) {
				break;
			}
			randResult = Math.floor(Math.random() * max);
		}
	}

	return randResult;
}

//상품상세 페이지 가기
var goDetail = function(gdNo,upCd) {
	
	if(typeof upCd == 'undefined'){
		upCd = "bestBook";
	}
	searchParam = {};
	$("input[name = gdNo]").val(gdNo);
	$("input[name = selectOptValTwo]").val("optAll");
	$("input[name = selectOptValThree]").val("optAll");
	$("input[name = page]").val(1);
	$('#searchForm').attr("action", "/" + upCd + "List/" + upCd + "Detail");
	$('#searchForm').attr("method", "POST");
	$('#searchForm').submit();
}

