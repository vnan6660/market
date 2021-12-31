/**
*장바구니js
*생성자 : 김혜경
*생성일 : 2021.12.28
*/
$(function() {
	var mainHeight = $("#contents").outerHeight(true);
	$("#sideUlWrap").css("height", mainHeight + "px");
	
	//checkBox 관련 function()
	check();
	
});

//checkBox 관련 function()
function check(){
	var chkObj = document.getElementsByName("rowCheck");
	console.log(chkObj);
	var rowCnt = chkObj.length;
	
	$("input[name='allCheck']").click(function(){
		var chk_listArr = $("input[name = 'rowCheck']");
		for(var i=0; i<chk_listArr.length; i++){
			chk_listArr[i].checked = this.checked;
		}
	});
	$("input[name='rowCheck']").click(function(){
		if($("input[name='rowCheck']:checked").length == rowCnt){
			$("input[name='allCheck']")[0].checked =  true;
		}else{
			$("input[name='allCheck']")[0].checked = false;
		}
	});
}



//삭제버튼 눌렀을 때
function delCartFn(){
	var valueArr = new Array();
	var list = $("input[name = 'rowCheck']");
	for(var i = 0; i<list.length;i++){
		if(list[i].checked){
			valueArr.push(list[i].value);
		}
	}
	
	//삭제버튼 눌렀을 때 시작
	if(valueArr.length == 0){
		alert("상품을 선택해주세요.");
	}else{
		if(confirm("삭제하시겠습니까?") == true){
			$.ajax({
				url: '/myCart/delCart',
				type: "POST",
				traditional : true,
				data:{valueArr: valueArr},
				success: function() {
					alert("삭제되었습니다.");
					location.href = "/myCart/myCartPage";
				},
				//오류났을때 처리
				error: function() {
					alert("오류입니다. 관리자에게 문의해주세요");
				}
			});
		}else{
			alert("취소되었습니다.");
			return false;
		}
	}
}

//주문버튼 눌렀을 때 함수
function cartBuyPage(){
	location.href="/myCartBuy/myCartBuyPage";
}