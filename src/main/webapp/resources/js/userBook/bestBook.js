/*
*생성자 : 김혜경
*생성일 : 2021.12.21
*수정자 : 김소연
*수정일 : 2022.01.08  
*베스트도서 js
*/
var searchParam = {};
var nowPage = 1; //처음페이지는 1페이지
$(function(){
	//초기설정함수
	init();
	
	//검색
	$("#goSearch").click(function() {
		//페이지가 1페이지인 검색함수
		goPage(1,1);
	});
	
	//목록버튼 누르면 실행
	$("#bestBookListBtn").click(function() {
		$("#searchForm").attr("action","/bestBook/bestBookPage");
		$("#searchForm").attr("method","post");
		$("#searchForm").submit();
	});
	selectOptValTwo = $("#goodsSeparate option:selected").val();//상품분류값
	selectOptValThree = $("#goodsNmNbrm option:selected").val()
	
});

//초기설정함수
var init = function() {
	var mainHeight = $("#contentsWrap").outerHeight(true);
	$("#sideUlWrap").css("height", mainHeight + "px");
	
	//상품 구분에 맞는 상품분류 값 가져오기(베스트도서로 상품 구분값 setting)
	getGoodsSeparate("bestBook");
	
	//상세페이지에서 목록버튼 클릭해서 돌아왔을시만 실행
	if($("#returnT").val() == 't'){
		$("#goodsSeparate").val($("#returnSptValTwo").val()).prop("selected", true);
		$("#goodsNmNbrm").val($("#returnSptValThree").val()).prop("selected", true);
		$("#searchVal").val($("#returnSearchVal").val());
		goPage($("#returnPage").val(), 1);
	}
}

//상품상세 페이지 가기
var goDetail = function(gdNo) {
	//gdNo를 사용해서 상품번호에 맞는 상세페이지로 가야한다.
	//location.href = "/bestBook/bestBookDetail/" + gdNo;
	searchParam = {};
	$("input[name = gdNo]").val(gdNo);
	$("input[name = selectOptValTwo]").val($("#goodsSeparate option:selected").val());
	$("input[name = selectOptValThree]").val($("#goodsNmNbrm option:selected").val());
	$("input[name = searchVal]").val($("#searchVal").val());
	$("input[name = page]").val($("#hdThisPage").val());
	$('#searchForm').attr("action","/bestBookList/bestBookDetail");
	$('#searchForm').attr("method","POST");
	$('#searchForm').submit();
}

//상품 구분(bestBook, newBook,,,)에 맞는 상품분류 값(전문, 수험, 잡지,,,) 가져오기
var getGoodsSeparate = function(goodsGroup) {
	//selectBox안에 있는 하위요소만 삭제
	$("#goodsSeparate *").remove();

	$.ajax({
		url: '/goodsReg/goodsSeparate',
		type: "GET",
		data: {
			"goodsGroup": goodsGroup
		},
		async : false,
		success: function(res) {
			$("#goodsSeparate").append("<option value='optAll'>전체</option>"); //전체 선택값 추가
			res.filter(function(e, i) {//fliter로 전체값을 순회하면서 #goodsSeparate에 option값을 넣는다.
				return $("#goodsSeparate").append("<option value='" + res[i].cmGrcd + "'>" + res[i].cmGrnm + "</option>");
			});
		},
		//오류났을때 처리
		error: function() {
			alert("오류입니다. 관리자에게 문의해주세요");
		}
	});
}

//검색과 페이지 정보 같이 넘기기
var goPage = function(pageNum) {
	searchParam = {};
	searchParam.selectOptValTwo = $("#goodsSeparate option:selected").val();//상품분류값
	searchParam.selectOptValThree = $("#goodsNmNbrm option:selected").val();//상품검색값:이름
	searchParam.searchVal = $("#searchVal").val();//검색 input박스에 넣은 값
	searchParam.page = pageNum;//페이지번호
	nowPage = pageNum;//현재페이지 = 페이지번호

	$.ajax({
		url: '/bestBook/searchBestBook',
		type: 'GET',
		data: searchParam,
		success: function(res) {
			var maxPage = res.maxPage;//최대페이지
			var startpage = res.startpage;//시작페이지
			var endpage = res.endpage;//끝페이지
			var reList = res.reList;//controller에서 다시 담은 리스트
			var viewList = "";
			viewList += "<colgroup>";
			viewList += "<col width='200px;'>";
			viewList += "<col width='800px;'>";
			viewList += "<col width='150px;'>";
			viewList += "</colgroup>";

			//controller에서 다시 담은 리스트를 각 행으로 each문 돌려서 표출
			$.each(reList, function(i, e) {
				if(e.gdSp == 'exam'){
					e.gdSp = '수험서';
				}else if(e.gdSp == 'child'){
					e.gdSp = '아동';
				}else if(e.gdSp == 'foreign'){
					e.gdSp = '외국어';
				}else if(e.gdSp == 'general'){
					e.gdSp = '일반서적';
				}else if(e.gdSp == 'magazine'){
					e.gdSp = '잡지';
				}else if(e.gdSp == 'special'){
					e.gdSp = '전문서적';
				}else if(e.gdSp == 'it'){
					e.gdSp = ' IT ';
				}
				viewList += "<tr>";
				//이미지
				viewList += "<td class='img hover' onclick='goDetail(" + e.gdNo + ")'><img id='img' alt='이미지없음' src='data:image/png;base64," + e.gdImg + "'></td>";
				//책제목, 지은이, 출판사, 책 설명, 가격
				viewList += "<td  valign='top' class='hover' onclick='goDetail(" + e.gdNo + ")'>" 
								+"<ul>"
									+"<li class='hover'>" + "<span class='hover f12'>" + "["+ e.gdSp +"]"+ "</span>" + "</li>"
									+"<li class='hover li'>" + "<span id='imgNm' class='hover f14'>" + e.gdNm + "</span>" + "</li>"
									+"<li class='hover li'>" + "<span class='hover f12'>" + e.gdWr + "(지은이)" + "  |  " + "</span>" + "<span class='hover f12'>" + e.gdPb + "(출판사)"  +"</span>" + "</li>"
									+"<li class='hover li'>" + "<span id='gdDc' class='hover f14'>" + e.gdDc + "</span>" + "</li>"
									+"<c:if test='${vo.gdPrice} >= 1000'>"
										+"<li class='hover li imgPrice f14' >" + "<span class='hover' id='gdPriceComma'>"
										+ e.gdPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "원"  //1000원이상이면 천단위 콤마가 생기도록 설정
										+ "</span>" + "</li>"
									+"</c:if>"
								+"</ul>"
							+"</td>";
				//장바구니 버튼
				viewList += "<input id='sessionUserId' type='hidden' value='${sessionScope.userId}'>";
				viewList += "<td class='hover'>" 
								+ "<button id='cartBtn' onclick='addCart('${vo.gdNo}')'>" + "장바구니" + "</button>"
							+ "</td>";
			});

			var pageList = "";
			//startpage가 1보다 커야 실행가능
			if (1 < startpage) {
				pageList += '<span class="page mr6" onclick="goPage(' + (startpage - 1) + ',1)">' + '&lt;&lt;' + '</span>';
			}
			
			//startpage와 endpage가 같거나 작을때까지 for문 돌림
			for (var num = startpage; num <= endpage; num++) {
				pageList += '<span class="page mr6" onclick="goPage(' + num + ',1)"'
				if (nowPage == num) {
					pageList += ' style = "background-color: #eee" >' + num
					pageList += '<input type="hidden"  id="hdThisPage" value="' + num + '">'
				} else {
					pageList += '>' + num
				}

				pageList += '</span>';
			}

			//endpage가 maxPage보다 작아야 실행 가능
			if (endpage < maxPage) {
				/*endpage가 maxPage보다 작아야 실행 가능*/
				pageList += '<span class="page mr6" onclick="goPage(' + (endpage + 1) + ',1)">' + '&gt;&gt;' + '</span>';
			}

			//id가 pageList에 pageList를 담은 html추가
			$("#pageList").html(pageList);
			
			//id가 bestBookTabledp viewList를 담은 html추가
			$("#bestBookTable").html(viewList);
			
			var mainHeight = $("#contentsWrap").outerHeight(true);
			$("#sideUlWrap").css("height",mainHeight +"px");

		},
		//오류발생시 function()
		error: function() {
			alert("오류입니다. 관리자에게 문의해주세요");
		}
	});
}

//장바구니 넣기
function addCart(gdNo){
	var sessionUserId = $("#sessionUserId").val();
	data = {};
	data.gdNo = gdNo;//상품번호
	data.gdQty = '1';
	if(sessionUserId == ""){
			alert("로그인 후 이용가능합니다.");
			location.href = '/login/loginPage';
	}else{
		$.ajax({
			url: '/myCart/addCart',
			type: "POST",
			data: data,
			success: function() {
				alert("장바구니에 추가되었습니다.");
			},
			//오류났을때 처리
			error: function() {
				alert("오류입니다. 관리자에게 문의해주세요");
			}
		});
	}
	
}

//바로구매
function goBuy(gdNo){
	var sessionUserId = $("#sessionUserId").val();
	data = {};
	data.gdNo = gdNo;//상품번호
	data.gdQty = '1';
	if(sessionUserId == ""){
			alert("로그인 후 이용가능합니다.");
			location.href = '/login/loginPage';
	}else{
		location.href = '/myCartBuy/takeGoods?gdNo='+gdNo;
	}
	
}