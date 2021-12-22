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
<link rel="stylesheet" href="/css/userBook/bookList.css">
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/userBook/foreignBook.js"></script>
</head>
<body>
<c:import url="/sideMenu/sideMenuPage"></c:import>
<main id="contents-bestBook-list" class="join">
	<h2>외국 도서</h2>
	<hr>
	<!-- 본문리스트 -->
	<div class="contents-wrap">
		<!-- select, 검색 -->
		<div class="flex h30" id="ssWrap">
			<div id="selectWrap">
				<select id="goodsSeparate">
				</select>
			
				<select class="mr10" id="goodsNmNbrm">
					<option value="optAll">전체</option>
					<option value="gdsName">상품이름</option>
				</select>
			</div>
			<div id="searchWrap">
				<input type="search"  class="mr5" id="searchVal" placeholder="검색어를 입력해주세요" />
			</div>
			<button id="goSearch" class="hover">검색</button>
		</div>
		
		<!-- 상품리스트 박스 -->
		<div class="bestBook-list-wrap">
			<div class="flexTable">
				<table id="bestBookTable">
					<colgroup>
						<col width="200px;">
						<col width="800px;">
						<col width="150px;">
					</colgroup>
					<c:forEach items="${reList}" var="vo">
					<tr>
						<td>
							<img id="img" class="img hover" onclick="goDetail(${vo.gdNo})" alt="이미지없음" src="data:image/png;base64,${vo.gdImgStr}">
						</td>
						<td valign="top" class='hover' onclick="goDetail(${vo.gdNo})">
							<ul>
								<li class="li hover"><span id="imgNm" class="hover f14">${vo.gdNm}</span></li>
								<li class="li hover"><span class="hover f12">${vo.gdWr}(지은이)   |   </span><span class="hover gdInfo f12" onclick="goDetail(${vo.gdNo})">${vo.gdPb}(출판사)</span></li>
								<li class="li hover"><span id="gdDc" class="hover f14">${vo.gdDc}</span></li>
								<li class="li hover f14 imgPrice"><span><fmt:formatNumber value="${vo.gdPrice}" pattern="#,###"/>원</span></li>
							</ul>
						</td>
						<td >
							<button id="cartBtn">장바구니</button>
						</td>
					</tr>
				</c:forEach>
				</table>
			</div>
		</div>
	</div>
	<!-- 페이징 -->
	<div id="pageList" class="mt10">
		<c:forEach var="cnt" begin="${startpage}" end="${endpage}">
		<c:if test="${cnt == 1}">
			<span class="page mr6" onclick="goPage(${cnt},0)" style="background-color: #eee">${cnt}</span>
		</c:if>
		<c:if test="${cnt != 1}">
			<span class="page mr6" onclick="goPage(${cnt},0)">${cnt}</span>
		</c:if>
		</c:forEach>
		<c:if test="${endpage < maxPage}">
			<span class="page mr6" onclick="goPage(${endpage}+1,0)">&gt;&gt;</span>
		</c:if>
 	</div>
</main>
</body>
</html>
