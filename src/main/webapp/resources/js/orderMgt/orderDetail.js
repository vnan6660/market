/**
*생성자 : 김소연
*생성일 : 2022.01.24
*주문상세
*/
$(function() {
	//초기설정함수
	orderDetailInit();

	//이벤트함수
	orderDetailAttachEvent();
});

//초기설정함수
var orderDetailInit = function() {
	var eValueSum = 0;
	$("input[name = tempOdAmt]").filter(function(i,e){
		eValueSum += Number(e.value);
	});
	var totalSum = String(eValueSum).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	$("#tempOdAmtSum").text(totalSum);
}

//이벤트함수
var orderDetailAttachEvent = function() {
	
	//목록버튼 누르면 실행
	$("#orderListBtn").click(function(){
		$("#searchForm").attr("action","/orderList/goOrderListPage");
		$("#searchForm").attr("method","post");
		$("#searchForm").submit();
	});
	
	//주문취소,발송중,발송완료 버튼 누를시
	$("#orderCancel, #transferStart").click(function() {
		odStateChange(this.value);
	});
}

//주문취소,발송중,발송완료 버튼 누를시
var odStateChange = function(nowOdState) {
	checkList = [];
	var odNo= $("#odNo").text();
	checkList.push(odNo);

	if (confirm('변경하시겠습니까?')) {
		$.ajax({
			url: '/orderList/odStateChange',
			type: 'GET',
			data: {
				"checkList": checkList,
				"nowOdState": nowOdState
			},
			async: false,
			success: function() {
				alert("개시정보가 변경되었습니다");
				location.reload();
			},
			error: function() {
				alert("오류입니다. 관리자에게 문의해주세요");
			}
		});
	}
}
