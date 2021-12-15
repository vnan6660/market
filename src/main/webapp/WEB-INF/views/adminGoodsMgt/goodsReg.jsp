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
<script type="text/javascript" src="/js/adminGoodsMgt/goodsReg.js"></script>
</head>
<body>
	<c:import url="/sideMenu/sideMenuPage"></c:import>
	<main id="contents">
		<h2>상품등록</h2>
		<hr>
		<div id="goodsRegWrap">
			<form action="/goodsReg/setGoodsReg" method="post" enctype="multipart/form-data">
				<table>
					<colgroup>
						<col width="20%">
						<col width="80%">
					</colgroup>
					<tr>
						<td>상품구분/상품분류</td>
						<td>
							<select id="goodsGroup" name="gdGp">
								<option value="bestBook">베스트도서</option>
								<option value="newBook">신간도서</option>
								<option value="localBook">국내도서</option>
								<option value="foreignBook">외국도서</option>
							</select>
							<select id="goodsSeparate" name="gdSp">
							</select>
						</td>
					</tr>
					
					<tr>
						<td>상품이름</td>
						<td>
							<input type="text" name="gdNm" maxlength="50">
						</td>
					</tr>
					<tr>
						<td>재고</td>
						<td>
							<input type="number" name="gdCnt">
						</td>
					</tr>
					<tr>
						<td>상품이미지</td>
						<td id="img1Wrap">
							<label for="file1">
								<a>클릭</a>
							</label>
							<input id="file1" name="gdImgFile" type="file">
							<span id="blankImage">파일이 없습니다.<br/> 등록해 주세요</span>
							<img id="image" src="" alt="이미지" width="250px;" height="250px;"/>
						</td>
					</tr>
					<tr>
						<td>상세정보</td>
						<td id="goodsDetailInfo"><input type="text" name="gdPage" placeholder="쪽"><input type="text" name="gdThick" placeholder="mm"><input type="text" name="gdWr" placeholder="작가"><input type="text" name="gdPb" placeholder="출판사"></td>
					</tr>
					<tr>
						<td>상품설명</td>
						<td><textarea name="gdDc" rows="5" cols="50" maxlength="500"></textarea></td>
					</tr>
					<tr>
						<td>상세설명</td>
						<td><input id="file2" name="gdDetlFile" type="file"></td>
					</tr>
				</table>
				<button type="button" id="goodsListBtn" class="btnSmallList hover">목록</button>
				<button type="submit" id="goodsRegBtn" class="btnSmallList hover">저장</button>
			</form>
		</div>
	</main>
</body>
</html>