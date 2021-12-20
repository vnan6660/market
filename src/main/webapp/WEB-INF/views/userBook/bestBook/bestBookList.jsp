<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>page</title>
<link rel="shortcut icon" href="#">
<script src="webjars/jquery/3.4.1/jquery.js"></script>
<link rel="stylesheet" href="/css/userBook/bestBook/bestBookList.css">
<script type="text/javascript" src="/js/common/common.js"></script>
</head>
<body>
<c:import url="/sideMenu/sideMenuPage"></c:import>
<main id="contents-bestBook-list" class="join">
	<h2>베스트 도서</h2>
	<hr>
	
	<!-- 본문리스트 -->
	<div>
		<!-- select, 검색 -->
		<div class="wrap-select-search flex">
			<div class="wrap-select">
				<select>
					<option>선택</option>
				</select>
				<select id="goodsNmNbrm">
					<option value="">전체</option>
					<option value="gdsName">상품이름</option>
					<option value="gdsNmbr">상품번호</option>
				</select>
			</div>
			<div class="wrap-search flex">
				<input type="search" id="searchVal" placeholder="검색어를 입력해주세요" />
				<button id="goSearch" class="hover">검색</button>
			</div>
		</div>
		
		<!-- 상품리스트 박스 -->
		<div class="bestBook-list-wrap">
			<div class="flex">
				<div>
					<img src="/images/bestBook/k962835911_1.jpg">
					<div>상품이름</div>
					<div>4500원</div>
				</div>
				<div>
					<img src="/images/bestBook/k962835911_1.jpg">
					<div>상품이름</div>
					<div>4500원</div>
				</div>
				<div>
					<img src="/images/bestBook/k962835911_1.jpg">
					<div>상품이름</div>
					<div>4500원</div>
				</div>
				<div>
					<img src="/images/bestBook/k962835911_1.jpg">
					<div>상품이름</div>
					<div>4500원</div>
				</div>
			</div>
			<div class="flex">
				<div>
					<img src="/images/bestBook/k472835717_1.jpg">
					<div>상품이름</div>
					<div>4500원</div>
				</div>
				<div>
					<img src="/images/bestBook/k472835717_1.jpg">
					<div>상품이름</div>
					<div>4500원</div>
				</div>
				<div>
					<img src="/images/bestBook/k472835717_1.jpg">
					<div>상품이름</div>
					<div>4500원</div>
				</div>
				<div>
					<img src="/images/bestBook/k472835717_1.jpg">
					<div>상품이름</div>
					<div>4500원</div>
				</div>
			</div>
		</div>
		
	
	<!-- 페이징 -->
	<div>
	</div>
</main>
</body>
</html>
