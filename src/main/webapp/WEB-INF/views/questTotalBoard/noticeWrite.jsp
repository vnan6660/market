<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>공지사항등록</title>
<link rel="shortcut icon" href="#">
<link rel="stylesheet" href="/css/questTotalBoard/notice.css">
<script src="/webjars/jquery/3.4.1/jquery.js"></script>
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/questTotalBoard/notice.js"></script>
</head>
<body>
	<c:import url="/sideMenu"></c:import>
	<main id="contents">
		<h2>공지사항 글쓰기</h2>
		<hr>
		<div id="ntcWriteWrap">
			<form action="/write/notice" method="post" id="writeFromData">
				<input id="subject" name="ntcSj" placeholder="제목을 입력하세요">
				<textarea id="writeText" name="ntcText" placeholder="내용을 입력하세요"></textarea>
			</form>
			<button id="saveWriteFrom" class="btnSmall">저장</button>
		</div>

	</main>
</body>
</html>