<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>page</title>
<link rel="shortcut icon" href="#">
<script src="/webjars/jquery/3.4.1/jquery.js"></script>
<link rel="stylesheet" href="/css/userBook/bestBookList.css">
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/userBook/bestBook.js"></script>
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
				<select id="goodsGroup">
					<option value="">전체</option>
					<option value="special">전문서적</option>
					<option value="general">일반서적</option>
					<option value="foreign">외국어</option>
					<option value="child">아동</option>
					<option value="magazine">잡지</option>
					<option value="it">IT</option>
					<option value="exam">수험서</option>
				</select>
			</div>
			<div class="wrap-search flex">
				<input type="search" id="searchVal" placeholder="검색어를 입력해주세요" />
				<button id="goSearch" class="hover">검색</button>
			</div>
		</div>
		
		<!-- 상품리스트 박스 -->
		<div class="bestBook-list-wrap">
			<div class="flexTable">
			<c:forEach items="${reList}" var="vo">
				<table id="bestBookTable">
					<tr>
						<td width="200px">
							<img id="img" class="img hover" onclick="goDetail(${vo.gdNo})" alt="이미지없음" src="data:image/png;base64,${vo.gdImgStr}">
						</td>
						<td valign="top" width="800px">
							<ul>
								<li class="li"><span id="imgNm" class="hover" onclick="goDetail(${vo.gdNo})">${vo.gdNm}</span></li>
								<li class="li"><span class="hover gdInfo" onclick="goDetail(${vo.gdNo})">${vo.gdWr}(지은이)   |   </span><span class="hover gdInfo" onclick="goDetail(${vo.gdNo})">${vo.gdPb}(출판사)</span></li>
								<li class="li"><span id="gdDc" class="hover" onclick="goDetail(${vo.gdNo})">${vo.gdDc}</span></li>
								<li class="li"><span id="imgPrice" class="hover" onclick="goDetail(${vo.gdNo})"><fmt:formatNumber value="${vo.gdPrice}" pattern="#,###"/>원</span></li>
							</ul>
						</td>
						<td width="150px">
							<button id="cartBtn">장바구니</button>
						</td>
					</tr>
				</table>
			</c:forEach>
			</div>
		</div>
	</div>
	
	<!-- 페이징 -->
	<div>
	</div>
</main>
</body>
</html>
