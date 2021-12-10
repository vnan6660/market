<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
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
				<table id="csInfoTable">
					<colgroup>
						<col width="30%;">
						<col width="70%;">
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
						<td>${csOne.csAddrOne},${csOne.csAddrTwo}</td>
					</tr>
					<tr>
						<td>휴대전화</td>
						<td>${csOne.csPhoneOne}-${csOne.csPhoneTwo}-${csOne.csPhoneThree}</td>
					</tr>
					<tr>
						<td>이메일</td>
						<td>${csOne.csEmailOne}@${csOne.csEmailTwo}</td>
					</tr>
					<tr>
						<td>생년월일</td>
						<td>${csOne.csBirthYear}년${csOne.csBirthMonth}월${csOne.csBirthDay}일</td>
					</tr>
				</table>
			</div>
			<h3 class="mt10">구매이력</h3>
			<div id="buyHistoryList">
			
			</div>
		</div>
	</main>
</body>
</html>