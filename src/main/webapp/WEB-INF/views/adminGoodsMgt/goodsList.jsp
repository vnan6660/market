<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>상품목록</title>
<link rel="shortcut icon" href="#">
<script src="/webjars/jquery/3.4.1/jquery.js"></script>
<link rel="stylesheet" href="/css/adminGoodsMgt/goodsList.css">
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/adminGoodsMgt/goodsList.js"></script>
</head>
<body>
	<c:import url="/sideMenu/sideMenuPage"></c:import>
	<main id="contents">
	<h2>물품목록</h2>
		<hr>
		<div>
			<div id="ssWrap">
				<div id="dateWrap">
					<input type="date" id="startDate">
					<p style="display: inline;"> ~ </p>
					<input type="date" id="endDate">
				</div>
				<div id="selectWrap">
					<select id="goodsGroup">
						<option value="">전체</option>
						<option value="bestBook">베스트도서</option>
						<option value="newBook">신간도서</option>
						<option value="localBook">국내도서</option>
						<option value="foreignBook">외국도서</option>
					</select>
				
					<select id="goodsSeparate">
					</select>
				
					<select id="goodsNmNbrm">
						<option value="">전체</option>
						<option value="gdsName">상품이름</option>
						<option value="gdsNmbr">상품번호</option>
					</select>
				</div>
				<div id="searchWrap">
					<input type="search" id="searchVal" placeholder="검색어를 입력해주세요" />
				</div>
				<button id="goSearch" class="hover">검색</button>
			</div>
			<div>
			<button id="goDel()" class="btnXSmall hover">상품삭제</button>
			<button id="goShow()" class="btnXSmall hover">상품개제</button>
			</div>
			<div>
				<table id="goodsListTable">
					<colgroup>
						<col width="5%;">
						<col width="5%;">
						<col width="10%;">
						<col width="10%;">
						<col width="30%;">
						<col width="20%;">
						<col width="10%;">
						<col width="5%;">
					</colgroup>
					<tr>
						<th>삭제</th>
						<th>NO</th>
						<th>상품구분</th>
						<th>상품분류</th>
						<th>상품이미지</th>
						<th>상품이름</th>
						<th>재고</th>
						<th>개제</th>
					</tr>
						<c:forEach items="${reList}" var="vo">
						<tr>
							<td><input type="checkbox"></td>
							<td class="hover" onclick="goDetail(${vo.gdNo})">${vo.gdNo}</td>
							<td class="hover" onclick="goDetail(${vo.gdNo})">${vo.gdGpNm}</td>
							<td class="hover" onclick="goDetail(${vo.gdNo})">${vo.gdSpNm}</td>
							<td class="img hover" onclick="goDetail(${vo.gdNo})"><img alt="이미지없음" src="data:image/png;base64,${vo.gdImgStr}"></td>
							<td class="hover" onclick="goDetail(${vo.gdNo})">${vo.gdNm}</td>
							<td class="hover" onclick="goDetail(${vo.gdNo})">${vo.gdCnt}</td>
							<td>
								<c:if test="${vo.gdYn == 'Y'}">
								<input type="checkbox" checked="checked">
								</c:if>
								<c:if test="${vo.gdYn == 'N'}">
								<input type="checkbox">
								</c:if>
							</td>
						</tr>
						</c:forEach>
				</table>
					<button id="goRegForm" class="btnSmall hover">물품등록</button>
			</div>
		</div>
		<%-- <div id="pageList">
			<c:forEach var="cnt" begin="${startpage}" end="${endpage}">
			<c:if test="${cnt == 1}">
				<span class="page mr6" onclick="goPage(${cnt})" style="background-color: #eee">${cnt}</span>
			</c:if>
			<c:if test="${cnt != 1}">
				<span class="page mr6" onclick="goPage(${cnt})">${cnt}</span>
			</c:if>
				
			</c:forEach>
			<span class="page mr6" onclick="goPage(${endpage}+1)">&gt;&gt;</span>
		</div> --%>
	</main>
</body>
</html>