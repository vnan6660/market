<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>권한관리</title>
<link rel="shortcut icon" href="#">
<link rel="stylesheet" href="/css/authMgt.css">
<script src="webjars/jquery/3.4.1/jquery.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript" src="/js/authMgt.js"></script>
</head>
<body>
	<c:import url="/sideMenu"></c:import>
	<main id="contents">
		<h2>권한관리</h2>
		<hr>
		<div>
			<select>
				<option>관리자</option>
				<option>사용자</option>
			</select>
			
			<table style="overflow: auto; width: 100%; margin-top: 40px;">
			<colgroup>
			<col width="20%">
			<col width="80%">
			</colgroup>
			<tr style="background-color: #ccc;">
				<th><input type="checkbox" id="allCheck"></th>
				<th><h4>메뉴명</h4></th>
			</tr>
			<tr>
				<th><input type="checkbox" name="checkbox"></th>
				<th><h4>메뉴1</h4></th>
			</tr>
			</table>
			
			<button id="menuSaveBtn">저장</button>
		</div>
	</main>

</body>
</html>