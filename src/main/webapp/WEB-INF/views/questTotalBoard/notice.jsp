<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
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
		<h2>공지사항</h2>
		<hr>
		<div id="noticeUpperWrap">
			<div id="ssWrap">
				<select id="selectWrap">
					<option value="optAll">전체</option>
					<option value="optSj">제목</option>
					<option value="optWrt">작성자</option>
					<option value="optText">내용</option>
				</select>
				<div id="searchWrap">
					<input type="search" id="searchVal" placeholder="검색어를 입력해주세요" />
				</div>
				<button id="goSearch" class="hover">검색</button>
			</div>
			<div id="ntcListWrap">
				<table id="ntcTable">
					<colgroup>
						<col width="10%;">
						<col width="50%;">
						<col width="15%;">
						<col width="15%;">
						<col width="10%;">
					</colgroup>
					<tr>
						<th>NO</th>
						<th>제목</th>
						<th>작성자</th>
						<th>작성일</th>
						<th>조회</th>
					</tr>
					<c:forEach items="${noticeList}" var="vo">
						<tr>
							<td>${vo.ntcNo}</td>
							<td class="hover" onclick="goDetail(${vo.ntcNo})">${vo.ntcSj}</td>
							<td>${vo.ntcWrt}</td>
							<td><fmt:formatDate value="${vo.ntcRegDate}"
									pattern="yyyy-MM-dd" /></td>
							<td>${vo.ntcVcnt}</td>
						</tr>
					</c:forEach>
				</table>
				<c:if test="${sessionScope.userGrade == '0'}">
					<button id="goWriteForm" class="btnSmall hover">글쓰기</button>
				</c:if>
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
			<span class="page mr6" onclick="goPage(${endpage}+1)">&gt;&gt;</span>
		</div>
	</main>
</body>
</html>