<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>상품등록</title>
<link rel="shortcut icon" href="#">
<script src="/webjars/jquery/3.4.1/jquery.js"></script>
<link rel="stylesheet" href="/css/adminGoodsMgt/goodsReg.css">
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/adminGoodsMgt/goodsDetail.js"></script>
</head>
<body>
	<c:import url="/sideMenu/sideMenuPage"></c:import>
	<main id="contents">
		<h2>상품상세</h2>
		<hr>
		<div id="goodsRegWrap">
			<form id="goodsForm">
				<table>
					<colgroup>
						<col width="20%">
						<col width="80%">
					</colgroup>
					<tr>
						<td>상품구분/상품분류</td>
						<td>
							<div class="viewForm">
							<input id="hdGp" type="hidden" value="${goodsVO.gdGp}">
							<input id="hdSp" type="hidden" value="${goodsVO.gdSp}">
							<span id="viewGp"></span><span>/</span><span id="viewSp"></span>
							</div>
							<div class="writeForm">
								<select id="goodsGroup" name="gdGp">
									<option value="bestBook">베스트도서</option>
									<option value="newBook">신간도서</option>
									<option value="localBook">국내도서</option>
									<option value="foreignBook">외국도서</option>
								</select>
								<select id="goodsSeparate" name="gdSp">
								</select>
							</div>
						</td>
					</tr>
					
					<tr>
						<td>상품이름</td>
						<td>
							<div class="viewForm">
								<c:out value="${goodsVO.gdNm}"></c:out>
							</div>
							<div class="writeForm">
								<input type="text" name="gdNm" maxlength="50" value="${goodsVO.gdNm}">
							</div>
						</td>
					</tr>
					<tr>
						<td>재고</td>
						<td>
							<div class="viewForm">
								<c:out value="${goodsVO.gdCnt}"></c:out>
							</div>
							<div class="writeForm">
								<input type="number" name="gdCnt" value="${goodsVO.gdCnt}">
							</div>
						</td>
					</tr>
					<tr>
						<td>상품개제</td>
						
						<td>
							<div class="viewForm">
									<span id="gdYn">${goodsVO.gdYn}</span>
								</div>
							<div class="writeForm">
								<select id="gdYnSelect" name="gdYn">
									<option value="Y">Y</option>
									<option value="N">N</option>
								</select>
							</div>
						</td>
					</tr>
					<tr>
						<td>상품이미지</td>
						<td id="img1Wrap">
							<div class="viewForm img">
								<img alt="이미지없음" src="data:image/png;base64,${goodsVO.gdImgStr}">
							</div>
							<div class="writeForm">
								<label for="file1">
									<a>클릭</a>
								</label>
								<input id="file1" name="gdImgFile" type="file">
								<!-- 상세에 원래 파일이 없을경우-->
								<c:if test="${goodsVO.gdImgStr == null}">
									<span id="blankImage">파일이 없습니다.<br/> 등록해 주세요</span>
								</c:if>
								<!-- 상세에 원래 파일이 있는경우-->
								<c:if test="${goodsVO.gdImgStr != null}">
									<img id="orginImg" alt="이미지없음" src="data:image/png;base64,${goodsVO.gdImgStr}" width="250px;" height="250px;">
								</c:if>
								<img id="image" src="" alt="이미지" width="250px;" height="250px;"/>
								
							</div>
						</td>
					</tr>
					<tr>
						<td>상세정보</td>
						<td id="goodsDetailInfo">
							<div class="viewForm">
							<p>${goodsVO.gdPage}쪽,${goodsVO.gdThick}mm,${goodsVO.gdWr}작가,${goodsVO.gdPb}출판사</p>
							</div>
							<div class="writeForm">
								<input type="text" name="gdPage" placeholder="쪽" value="${goodsVO.gdPage}">
								<input type="text" name="gdThick" placeholder="mm" value="${goodsVO.gdThick}">
								<input type="text" name="gdWr" placeholder="작가" value="${goodsVO.gdWr}">
								<input type="text" name="gdPb" placeholder="출판사" value="${goodsVO.gdPb}">
							</div>
						</td>
					</tr>
					<tr>
						<td>상품설명</td>
						<td>
							<div class="viewForm">
							<c:out value="${goodsVO.gdDc}"></c:out>
							</div>
							<div class="writeForm">
								<textarea name="gdDc" rows="5" cols="50" maxlength="500">${goodsVO.gdDc}</textarea>
							</div>
						</td>
					</tr>
					<tr>
						<td>상세설명</td>
						<td>
							<div class="viewForm img">
								<img alt="이미지없음" src="data:image/png;base64,${goodsVO.gdDetlStr}">
							</div>
							<div class="writeForm">
								<input id="file2" name="gdDetlFile" type="file">
							</div>
						</td>
					</tr>
				</table>
				<input type="hidden" id="gdNo" name="gdNo" value="${goodsVO.gdNo}">
				<button type="button" id="goodsListBtn" class="btnSmallList hover">목록</button>
				
				<button type="button" id="goodsDelBtn" class="btnSmallList hover">삭제</button>
				<button type="button" id="goodsUpdBtn" class="btnSmallList hover">수정</button>
				<button type="button" id="goodsUpdDoneBtn" class="btnSmallList hover">저장</button>
			</form>
		</div>
	</main>
</body>
</html>