<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>고객정보</title>
<link rel="shortcut icon" href="#">
<script src="/webjars/jquery/3.4.1/jquery.js"></script>
<link rel="stylesheet" href="/css/csMgt/csInfo.css">
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/csMgt/csInfo.js"></script>
</head>
<body>
	<c:import url="/sideMenu/sideMenuPage"></c:import>
	<main id="contents">
		<h2>고객정보</h2>
		<hr>
		<div id="csInfoUpperWrap">
			<div id="ssWrap">
				<select id="userGradeSelectWrap">
					<option value="optCsID">회원</option>
					<option value="optCsNm">탈퇴</option>
				</select>
				<select id="userInfoSelectWrap">
					<option value="optCsID">사용자ID</option>
					<option value="optCsNm">사용자이름</option>
				</select>

				<div id="searchWrap">
					<input type="search" id="searchVal" placeholder="검색어를 입력해주세요" />
				</div>
				<button id="goSearch" class="hover">검색</button>
			</div>
			<div id="csListWrap">
				<table id="csInfoTable">
					<colgroup>
						<col width="10%;">
						<col width="25%;">
						<col width="25%;">
						<col width="25%;">
						<col width="15%;">
					</colgroup>
					<tr>
						<th>NO</th>
						<th>사용자ID</th>
						<th>사용자이름</th>
						<th>가입날짜</th>
						<th>회원구분</th>
					</tr>
					
				</table>
			</div>
		</div>
	</main>
</body>
</html>