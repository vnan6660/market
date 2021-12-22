<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>고객정보상세</title>
<link rel="shortcut icon" href="#">
<script src="/webjars/jquery/3.4.1/jquery.js"></script>
<link rel="stylesheet" href="/css/csMgt/csInfo.css">
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/csMgt/csInfo.js"></script>
</head>
<body>
	<c:import url="/sideMenu/sideMenuPage"></c:import>
	<main id="contents">
		<h2>고객정보상세</h2>
		<hr>
		<div id="csInfoUpperWrap">
			<h3 class="mt10">고객정보</h3>
			<div id="csListWrap">
				<table id="csInfoDetailTable" style="width:900px;table-layout: fixed">
					<colgroup>
						<col style="width:200px">
						<col style="width:700px">
					</colgroup>
					<tr>
						<td>회원구분</td>
						<td>${csOne.csGrade}</td>
					</tr>
					<tr>
						<td>사용자ID</td>
						<td>${csOne.csId}</td>
					</tr>
					<tr>
						<td>사용자이름</td>
						<td>${csOne.csNm}</td>
					</tr>
					<tr>
						<td>사용자주소</td>
						<td>
							<span>${csOne.csAddrOne}</span>
							<br>
							<span>&nbsp;&nbsp;${csOne.csAddrTwo}</span>
						</td>
					</tr>
					<tr>
						<td>휴대전화</td>
						<td id="phoneNmbr">
							${fn:substring(csOne.csPhone,0,3)} -
							${fn:substring(csOne.csPhone,3,7) } -
							${fn:substring(csOne.csPhone,7,12) }
						</td>
					</tr>
					<tr>
						<td>이메일</td>
						<td>${csOne.csEmail}</td>
					</tr>
					<tr>
						<td>생년월일</td>
						<td>${csOne.csBirthYear}년${csOne.csBirthMonth}월${csOne.csBirthDay}일</td>
					</tr>
				</table>
			</div>
			<h3 class="mt10">구매이력</h3>
			<div id="buyHistoryList">
				<table id="buyHistoryTable" style="width:900px;table-layout: fixed">
					<colgroup>
						<col style="width:100px">
						<col style="width:200px">
						<col style="width:150px">
						<col style="width:150px">
						<col style="width:150px">
						<col style="width:150px">
					</colgroup>
					<tr>
						<td>NO</td>
						<td>주문번호</td>
						<td>상품이름</td>
						<td>주문날짜</td>
						<td>배송날짜</td>
						<td>발송상태</td>
					</tr>
					<tr>
						<td>1</td>
						<td>주문번호테스트1111</td>
						<td>무엇일까</td>
						<td>0000-00-00</td>
						<td> - </td>
						<td>발송완료</td>
					</tr>
				</table>
			</div>
		</div>
		<div id="pageList">
			<c:forEach var="cnt" begin="${startpage}" end="${endpage}">
			<c:if test="${cnt == 1}">
				<span class="page mr6" onclick="goPage(${cnt})" style="background-color: #eee">${cnt}</span>
			</c:if>
			<c:if test="${cnt != 1}">
				<span class="page mr6" onclick="goPage(${cnt})">${cnt}</span>
			</c:if>
			</c:forEach>
			<c:if test="${endpage < maxPage}">
				<span class="page mr6" onclick="goPage(${endpage}+1)">&gt;&gt;</span>
			</c:if>
			
		</div>
	</main>
</body>
</html>