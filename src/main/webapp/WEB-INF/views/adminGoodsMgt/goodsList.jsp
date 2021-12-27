<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
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
					<input type="date" id="startDt">
					<p style="display: inline;"> ~ </p>
					<input type="date" id="endDt">
				</div>
				<div id="selectWrap">
					<h5>상품구분</h5>
					<select id="goodsGroup">
						<option value="optAll">전체</option>
						<option value="bestBook">베스트도서</option>
						<option value="newBook">신간도서</option>
						<option value="localBook">국내도서</option>
						<option value="foreignBook">외국도서</option>
					</select>
					
					<h5>상품분류</h5>
					<select id="goodsSeparate">
					</select>
				
					<select id="goodsNmNbrm">
						<option value="optAll">전체</option>
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
			<button id="goDelBtn" class="btnXSmall hover">상품삭제</button>
			<button id="goShowBtn" class="btnXSmall hover" style="float: right;">상품개시</button>
			</div>
			<div>
				<table id="goodsListTable">
					<colgroup>
						<col width="5%;">
						<col width="5%;">
						<col width="10%;">
						<col width="10%;">
						<col width="20%;">
						<col width="20%;">
						<col width="10%;">
						<col width="10%;">
						<col width="5%;">
					</colgroup>
					<tr>
						<th><input type="checkbox" name="allDelCheck" onchange="allDelCheck()"></th>
						<th>NO</th>
						<th>상품구분</th>
						<th>상품분류</th>
						<th>상품이미지</th>
						<th>상품이름</th>
						<th>상품가격</th>
						<th>재고</th>
						<th><input type="checkbox" name="allShowCheck" onchange="allShowCheck()"></th>
					</tr>
						<c:forEach items="${reList}" var="vo">
						<tr>
							<td><input type="checkbox" name="delCheck" value="${vo.gdNo}"></td>
							<td class="hover" onclick="goDetail(${vo.gdNo})">${vo.gdNo}</td>
							<td class="hover" onclick="goDetail(${vo.gdNo})">${vo.gdGpNm}</td>
							<td class="hover" onclick="goDetail(${vo.gdNo})">${vo.gdSpNm}</td>
							<td class="img hover" onclick="goDetail(${vo.gdNo})"><img alt="이미지없음" src="data:image/png;base64,${vo.gdImgStr}"></td>
							<td class="hover" onclick="goDetail(${vo.gdNo})">${vo.gdNm}</td>
							<td class="hover" onclick="goDetail(${vo.gdNo})"><fmt:formatNumber value="${vo.gdPrice}" pattern="#,###"/><span>원</span></td>
							<td class="hover" onclick="goDetail(${vo.gdNo})">${vo.gdCnt}</td>
							<td>
								<c:if test="${vo.gdYn == 'Y'}">
								<input type="checkbox" name="showCheck" checked="checked" value="${vo.gdNo}">
								</c:if>
								<c:if test="${vo.gdYn == 'N'}">
								<input type="checkbox" name="showCheck" value="${vo.gdNo}">
								</c:if>
							</td>
						</tr>
						</c:forEach>
				</table>
					<button id="goRegForm" class="btnSmall hover">물품등록</button>
			</div>
		</div>
		<div id="pageList">
			<c:forEach var="cnt" begin="${startpage}" end="${endpage}">
			<input type="hidden" id="hdThisPage" value="${cnt}">
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
		<form id="searchForm">
				<input type="hidden" name="gdNo"/>
				<input type="hidden" name="startDt"/>
				<input type="hidden" name="endDt"/>
				<input type="hidden" name="selectOptValOne"/>
				<input type="hidden" name="selectOptValTwo"/>
				<input type="hidden" name="selectOptValThree"/>
				<input type="hidden" name="searchVal"/>
				<input type="hidden" name="page"/>
			<c:if test="${goList == 't'}">
				<input type="hidden" id="returnT" value="t">
				<input type="hidden" id="returnStdt" value="${searchVO.startDt}"/>
				<input type="hidden" id="returnEdDt" value="${searchVO.endDt}"/>
				<input type="hidden" id="returnSptValOne" value="${searchVO.selectOptValOne}"/>
				<input type="hidden" id="returnSptValTwo" value="${searchVO.selectOptValTwo}"/>
				<input type="hidden" id="returnSptValThree" value="${searchVO.selectOptValThree}"/>
				<input type="hidden" id="returnSearchVal" value="${searchVO.searchVal}"/>
				<input type="hidden" id="returnPage" value="${searchVO.page}"/>
			</c:if>
		</form>
	</main>
</body>
</html>