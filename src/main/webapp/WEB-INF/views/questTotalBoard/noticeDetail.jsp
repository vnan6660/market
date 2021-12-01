<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>공지사항</title>
<link rel="shortcut icon" href="#">
<link rel="stylesheet" href="/css/questTotalBoard/notice.css">
<script src="/webjars/jquery/3.4.1/jquery.js"></script>
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/questTotalBoard/notice.js"></script>
</head>
<body>
	<c:import url="/sideMenu"></c:import>
	<main id="contents">
		<h2>공지사항상세</h2>
		<hr>
		<div>
			<div id="ntcListWrap">
				<ul id="noticeUl">
					<li>
						<span>제목내용</span>
					</li>
					<li>
						<span>게스트일지도</span>
					</li>
					<li>
						<span>내용일지도</span>
					</li>
				</ul>
			</div>
			<button id="goNoticeList" class="btnSmallList">목록</button>
			<button class="btnSmall">삭제</button>
			<button class="btnSmall">수정</button>
		</div>
	</main>
</body>
</html>