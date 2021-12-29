<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>권한관리</title>
<link rel="stylesheet" href="/css/menuTotalMgt/authMgt.css">
<script src="/webjars/jquery/3.4.1/jquery.js"></script>
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/menuTotalMgt/authMgt.js"></script>
</head>
<body>
	<c:import url="/sideMenu/sideMenuPage"></c:import>
	<main id="contents">
		<h2>권한관리</h2>
		<hr>
		<div>
			<select id="authSelect">
				<option value="adminOpt">관리자</option>
				<option value="userOpt">사용자</option>
			</select>

			<table id="authTable">
			</table>

			<button id="menuSaveBtn" class="hover">저장</button>
		</div>
	</main>
	<footer>
		<c:import url="/footer/footerPage"></c:import>
	</footer>
</body>
</html>