<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>메뉴관리</title>
<link rel="shortcut icon" href="#">
<link rel="stylesheet" href="/css/menuMgt.css">
<script src="webjars/jquery/3.4.1/jquery.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript" src="/js/menuMgt.js"></script>
</head>
<body>
	<c:import url="/sideMenu"></c:import>
	<main id="contents">
		<h2>메뉴관리</h2>
		<hr>
		<div id="newMenuWrap">
		<ul>
			<li>
				<span><img id="plusBtn" alt="+button" src="/images/plusBtn.svg"></span>
				<span id="plusMenu">새로운 메뉴 만들기</span>
			</li>
			<li id="menuList">
				<c:forEach items="${list}" var="vo">
				<li onclick="menuClick(${vo.menuId})">${vo.menuNm}</li>
				</c:forEach>
			</li>
		</ul>
		<table>
			<tr>
				<td>메뉴명</td>
				<td><input id="menuNm"  type="text"></td>
			</tr>
			<tr>
				<td>메뉴코드</td>
				<td><input id="menuCd"  type="text"></td>
			</tr>
			<tr>
				<td>상위메뉴명</td>
				<td>
					<select id="menuUpCd">
						<option value="none">없음</option>
					</select>
				</td>
			</tr>
			<tr>
				<td>정렬순서</td>
				<td><input id="menuSn" type="text"></td>
			</tr>
			<tr>
				<td>사용여부</td>
				<td>
					<span>관리자</span>
					<select id="adminSelect">
						<option value="Y">Y</option>
						<option value="N">N</option>
					</select>
						
					<span>사용자</span>
					<select id="userSelect">
						<option value="Y">Y</option>
						<option value="N">N</option>
					</select>
				</td>
			</tr>
			<tr>
				<td colspan="2">
				<input type="hidden" id="menuId">
					<button id="menuSaveBtn">저장</button>
					<button id="menuDelBtn">삭제</button>
				</td>
			</tr>
		</table>
		</div>
	</main>
	
</body>
</html>