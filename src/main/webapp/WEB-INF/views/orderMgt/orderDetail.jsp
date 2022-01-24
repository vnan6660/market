<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>주문정보</title>
<script src="/webjars/jquery/3.4.1/jquery.js"></script>
<link rel="stylesheet" href="/css/orderMgt/orderDetail.css">
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/orderMgt/orderDetail.js"></script>
</head>
<body>
	<c:import url="/sideMenu/sideMenuPage"></c:import>
	<main id="contents">
		<h2>주문상세내역</h2>
		<hr>
		<div id="myOrderDetailUpperWrap">
			<div>
				<table id="orderDetailListTable">
					<colgroup>
							<col width="20%;">
							<col width="80%;">
					</colgroup>
					<tr>
						<td>주문번호</td>
						<td id="odNo"><c:out value="${orderOne.odNo}"></c:out></td>
					</tr>
					<tr>
						<td>주문날짜</td>
						<td><c:out value="${orderOne.odDate}"></c:out></td>
					</tr>
					<tr>
						<td>상품정보</td>
						<td>
							<ul id="orderDetailListUl">
								<li style="display: flex;">
									<div style="width: 33.3%">상품이름</div>
									<div style="width: 33.3%">수량</div>
									<div style="width: 33.3%">가격</div>
								</li>
								<li id="orderGdInfo">
									<div id="orderGdNm" class="orderGdInfoDiv">
										<c:forTokens var="gdNm" items="${orderOne.gdNm}" delims="," varStatus="status">
											<div>${gdNm}</div>
										</c:forTokens>
									</div>
									<div id="orderGdQty" class="orderGdInfoDiv">
										<c:forTokens var="gdQty" items="${orderOne.gdQty}" delims="," varStatus="status">
											<div>${gdQty}</div>
										</c:forTokens>
									</div>
									<div id="orderOdAmt" class="orderGdInfoDiv">
										<c:forTokens var="odAmt" items="${orderOne.odAmt}" delims="," varStatus="status">
											<div><fmt:formatNumber value="${odAmt}" pattern="#,###"/></div>
											<input type="hidden" name="tempOdAmt" value="${odAmt}">
										</c:forTokens>
									</div>
								</li>
								<li style="display: flex;">
									<div style="width: 66.8%">총 구매금액</div>
									<div style="width: 33.2%" id="tempOdAmtSum"></div>
								</li>
							</ul>
						</td>
					</tr>
					<tr>
						<td>주소</td>
						<td><c:out value="${orderOne.rcAddrOne}"></c:out>,<c:out value="${orderOne.rcAddrTwo}"></c:out></td>
					</tr>
					<tr>
						<td>휴대번호</td>
						<td>
							${fn:substring(orderOne.rcPhone,0,3)} -
							${fn:substring(orderOne.rcPhone,3,7) } -
							${fn:substring(orderOne.rcPhone,7,12) }
						</td>
					</tr>
					<tr>
						<td>주문자</td>
						<td><c:out value="${orderOne.rcNm}"></c:out></td>
					</tr>
					<tr>
						<td>배송상태</td>
						<td><c:out value="${orderOne.odState}"></c:out></td>
					</tr>
					<tr>
						<td>배송날짜</td>
						<td><c:out value="${orderOne.trDate}"></c:out></td>
					</tr>
				</table>
			</div>
		</div>
		<div>
			<button type="button" id="orderListBtn" class="btnSmallList hover">목록</button>
			<button id="orderCancel" class="btnSmallList hover" value="orderCancel">주문취소</button>
			<button id="transferStart" class="btnSmallList hover" value="transferStart">발송완료</button>
		</div>
			
		<form id="searchForm">
				<input type="hidden" name="odNo" value="${orderOne.odNo}">
				<input type="hidden" name="startDt" value="${searchVO.startDt}"/>
				<input type="hidden" name="endDt" value="${searchVO.endDt}"/>
				<input type="hidden" name="selectOptValOne" value="${searchVO.selectOptValOne}"/>
				<input type="hidden" name="selectOptValTwo" value="${searchVO.selectOptValTwo}"/>
				<input type="hidden" name="dtType" value="${searchVO.dtType}"/>
				<input type="hidden" name="searchVal" value="${searchVO.searchVal}"/>
				<input type="hidden" name="page" value="${searchVO.page}"/>
			</form>
	</main>
	<footer>
		<c:import url="/footer/footerPage"></c:import>
	</footer>
</body>
</html>