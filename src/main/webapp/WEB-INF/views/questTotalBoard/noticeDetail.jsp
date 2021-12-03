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
	<c:import url="/sideMenu/sideMenuPage"></c:import>
	<main id="contents">
		<h2>공지사항상세</h2>
		<hr>
		<div>
			<div id="ntcListWrap">
				<ul id="noticeUl">
					<li>
						<span id="orgSubject"><c:out value="${noticeOne.ntcSj}" /></span>
						<input type="text" id="updSubject" value="<c:out value="${noticeOne.ntcSj}"/>">
					</li>
					<li>
						<span><c:out value="${noticeOne.ntcWrt}" /></span>
					</li>
					<li>
						<span id="orgText"><c:out value="${noticeOne.ntcText}" /></span>
						<textarea id="updText" rows="20" cols="50"><c:out value="${noticeOne.ntcText}"/></textarea>
					</li>
				</ul>
			</div>
			<input type="hidden" id="ntcNo" value="${noticeOne.ntcNo}">
			<button id="goNoticeList" class="btnSmallList hover">목록</button>
			<button id="ntcDelBtn" class="btnSmall hover">삭제</button>
			<button id="ntcUpdBtn" class="btnSmall hover">수정</button>
			<button id="ntcUpdDoneBtn" class="btnSmall hover">수정완료</button>
		</div>
	</main>
</body>
</html>