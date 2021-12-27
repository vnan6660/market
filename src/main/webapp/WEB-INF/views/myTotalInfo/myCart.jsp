<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>마이페이지</title>
<link rel="shortcut icon" href="#">
<script src="/webjars/jquery/3.4.1/jquery.js"></script>
<link rel="stylesheet" href="/css/myTotalInfo/myCart.css">
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/myTotalInfo/myCart.js"></script>
</head>
<body>
<c:import url="/sideMenu/sideMenuPage"></c:import>
	<main id="contents" class="info">
		<div class="table-wrap">
			<div class="myinfo">
				<h3>장바구니</h3>
			</div>
			<!-- 선택주문/삭제버튼 -->
			<div id="delBtn">
				<button>삭제</button>
			</div>
			
			<!-- 장바구니 상품 리스트 테이블 -->
			<div style="width:800px;table-layout: fixed">
				<table>
					<colgroup>
						<col style="width:30px">
						<col style="width:120px">
						<col style="width:300px">
						<col style="width:130px">
						<col style="width:130px">
						<col style="width:130px">
					</colgroup>
					<thead>
						<tr>
							<th>
								<input type="checkbox" checked="checked">
							</th>
							<th>
								상품이미지
							</th>
							<th>
								상품정보
							</th>
							<th>
								수량
							</th>
							<th>
								배송비
							</th>
							<th>
								판매가
							</th>
						</tr>
					</thead>
					<tbody>
					<c:forEach items="${cartList}" var="vo">
						<tr>
							<td>
								<input type="checkbox" checked="checked">
							</td>
							<td>
								<img id="img"class="hover" alt="이미지없음" src="data:image/png;base64,${vo.gdImgStr}">
							</td>
							<td id="bookInfo">
								<ul>
									<li>${vo.gdSp}</li>
									<li>${vo.gdNm}</li>
								</ul>
							</td>
							<td>
								<input type="number" style="width: 30px;">
							</td>
							<td>
								무료배송
							</td>
							<td>
								${vo.gdPrice}원
							</td>
						</tr>
					</c:forEach>
					</tbody>
					<tfoot>
						<tr>
							<td id="tFoot" colspan="6">
								<span>합계:</span>
								<span id="redSpan">999999원</span>
							</td>
						</tr>
					</tfoot>
				</table>
			</div>
			
			<!-- 전체주문버튼 -->
			<div id="orderBtn">
				<button>목록</button>
				<button>주문</button>
			</div>
			
			
			
			
			
			
			
			
			
			
		</div>
	</main>
</body>

</html>	