<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>공지사항</title>
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
						<input type="text" id="updSubject" maxlength="50" value="<c:out value="${noticeOne.ntcSj}"/>">
					</li>
					<li>
						<span><c:out value="${noticeOne.ntcWrt}" /></span>
					</li>
					<li>
						<span id="orgText"><c:out value="${noticeOne.ntcText}" /></span>
						<textarea id="updText" rows="20" cols="50" maxlength="1000"><c:out value="${noticeOne.ntcText}"/></textarea>
					</li>
				</ul>
			</div>
			<input type="hidden" id="ntcNo" value="${noticeOne.ntcNo}">
			<button id="goNoticeList" class="btnSmallList hover">목록</button>
			<c:if test="${sessionScope.userGrade == '0'}">
				<button id="ntcDelBtn" class="btnSmall hover">삭제</button>
				<button id="ntcUpdBtn" class="btnSmall hover">수정</button>
				<button id="ntcUpdDoneBtn" class="btnSmall hover">저장</button>
			</c:if>
		</div>
		<form id="searchForm">
				<input type="hidden" name="ntcNo" value="${noticeOne.ntcNo}">
				<input type="hidden" name="startDt" value="${searchVO.startDt}"/>
				<input type="hidden" name="endDt" value="${searchVO.endDt}"/>
				<input type="hidden" name="selectOptValOne" value="${searchVO.selectOptValOne}"/>
				<input type="hidden" name="selectOptValTwo" value="${searchVO.selectOptValTwo}"/>
				<input type="hidden" name="selectOptValThree" value="${searchVO.selectOptValThree}"/>
				<input type="hidden" name="searchVal" value="${searchVO.searchVal}"/>
				<input type="hidden" name="page" value="${searchVO.page}"/>
		</form>
	</main>
	<footer>
		<c:import url="/footer/footerPage"></c:import>
	</footer>
</body>
</html>