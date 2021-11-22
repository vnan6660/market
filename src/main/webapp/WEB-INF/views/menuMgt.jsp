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
			<li id="menuList"></li>
		</ul>
		<table>
			<tr>
				<td>메뉴명</td>
				<td><input id="menuId"  type="text"></td>
			</tr>
			<tr>
				<td>상위메뉴명</td>
				<td>
					<select>
						<option>없음</option>
					</select>
				</td>
			</tr>
			<tr>
				<td>정렬순서</td>
				<td><input id="menuSn" type="text"></td>
			</tr>
			<tr>
				<td colspan="2">
					<button id="menuSaveBtn">저장</button>
					<button id="menuDelBtn">삭제</button>
				</td>
			</tr>
		</table>
		</div>
	</main>
	
</body>
</html>