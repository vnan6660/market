/**
*생성자 : 김소연
*생성일 : 2022.01.14
*주문정보상세
*/

$(function() {
	myOrderDetailInit();
	myOrderDetailAttachEvent();
});

var myOrderDetailInit = function(){
	var eValueSum = 0;
	$("input[name = tempOdAmt]").filter(function(i,e){
		eValueSum += Number(e.value);
	});
	var totalSum = String(eValueSum).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	$("#tempOdAmtSum").text(totalSum);
}
var myOrderDetailAttachEvent = function(){
	
	//목록버튼 누르면 실행
	$("#orderListBtn").click(function(){
		$("#searchForm").attr("action","/myOrder/goMyOrderListPage");
		$("#searchForm").attr("method","post");
		$("#searchForm").submit();
	});
}

