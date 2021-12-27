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
<link rel="stylesheet" href="/css/userBook/bookDetail.css">
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/userBook/bestBook.js"></script>
</head>
<body>
<c:import url="/sideMenu/sideMenuPage"></c:import>
<main id="contentsWrap" class="join">
<h2>베스트 도서</h2>
<hr>
	<div class="detailWrap">
		<!-- 도서이미지 -->
		<div>
			<ul class="flex">
				<li class="mr20">
					<img id="img" class="img hover" alt="이미지없음" src="data:image/png;base64,${goodsVO.gdImgStr}">
				</li>
				<li>
					<h3 class="mb10">${goodsVO.gdNm}</h3>
					<div class="mb10">
						<span>판매가</span> <span>${goodsVO.gdPrice}원</span>
					</div>
					<div>
						<span><button id="goCart">장바구니</button></span>
						<span><button id="goBuy">바로구매</button></span>
					</div>
				</li>
			</ul>
		</div>
		<hr>
		<!-- 상세정보 -->
		<h4>상세정보</h4>
		<div class="f15">총 페이지: ${goodsVO.gdPage}쪽</div>
		<div class="f15">책 두께: ${goodsVO.gdThick}mm</div>
		<div class="f15">작가: ${goodsVO.gdWr}</div>
		<div class="f15">출판사: ${goodsVO.gdPb}</div>
		
		<hr>
		<!-- 상품설명 -->
		<h4>상품설명</h4>
		<div class="f15">
		<c:if test=""></c:if>
			${goodsVO.gdDc}
		</div>		
		<hr>
		<!-- 상세설명 -->
		<h4>상세설명</h4>
		<div class="f15">${goodsVO.gdDetl}</div>
		<hr id="bottomHr">
	</div>
	
	
</main>
</body>
</html>
