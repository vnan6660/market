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
		<h2>공지사항</h2>
		<hr>
		<div>
			<div id="ssWrap">
				<select id="selectWrap">
					<option>제목넣을곳</option>
				</select>
				<div id="searchWrap">
					<input type="search" placeholder="검색어를 입력해주세요" />
				</div>
<button id="goSearch">검색</button>
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
					<tr>
						<td>1</td>
						<td><a href="/detail/notice">제목1</a></td>
						<td>작성자1</td>
						<td>작성일1</td>
						<td>0</td>
					</tr>
				</table>
				<button id="goWriteForm" class="btnSmall">글쓰기</button>
			</div>

		</div>
	</main>
</body>
</html>