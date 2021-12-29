<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>관리자메인</title>
<script src="webjars/jquery/3.4.1/jquery.js"></script>
<link rel="stylesheet" href="/css/common/common.css">
<script type="text/javascript" src="/js/common/common.js"></script>
</head>
<body>
	<c:import url="/sideMenu/sideMenuPage"></c:import>
	<main id="contentsMain" style="height: 600px;">
		<div style="width: 33%">
			<div id="noticeQuickMenu" style="border: 1px solid #ccc; height: 50%;">
				<div class="quickMenuTitle">
					<h3>공지사항</h3><h3 class="hover" onclick="plusBtn('notice')">+</h3>
				</div>
				<div>
				<form id="noticeSearchForm">
					<input type="hidden" name="ntcNo"/>
					<input type="hidden" name="selectOptValOne"/>
					<input type="hidden" name="page"/>
				</form>
				 <!-- 공지사항 최근 5개 불러올것 -->
				 <table id="ntcMainTable" style="width:100%;table-layout: fixed">
				 </table>
				 
				</div>
			</div>
			<div id="fnaQuickMenu" style="border: 1px solid #ccc; height: 50%;">
			</div>
		</div>
		<div style="width: 33%">2</div>
		<div style="width: 33%">3</div>
	</main>
	<footer>
		<c:import url="/footer/footerPage"></c:import>
	</footer>
</body>

</html>