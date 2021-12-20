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
			<form id="goodsForm">
				<div id="essential"><span style="color: red;"> * </span>표시는 필수 입력사항입니다</div>
				<table>
					<colgroup>
						<col width="30%">
						<col width="70%">
					</colgroup>
					<tr>
						<td>상품구분/상품분류<span style="color: red;"> * </span></td>
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
						<td>상품이름<span style="color: red;"> * </span></td>
						<td>
							<input type="text" name="gdNm" maxlength="30">
						</td>
					</tr>
					<tr>
						<td>재고<span style="color: red;"> * </span></td>
						<td>
							<input type="number" name="gdCnt" maxlength="15" oninput="maxLengthCheck(this)">
						</td>
					</tr>
					<tr>
						<td>상품개시<span style="color: red;"> * </span></td>
						<td>
							<select id="gdYn" name="gdYn">
								<option value="Y">Y</option>
								<option value="N">N</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>상품이미지<span style="color: red;"> * </span></td>
						<td id="img1Wrap">
							<label for="file1">
								<a>클릭</a>
							</label>
							<input id="file1" name="gdImgFile" type="file" accept=".jpg, .png, .jpeg" onchange="chkFileType(this)">
							<span id="blankImage">파일이 없습니다.<br/> 등록해 주세요</span>
							<img id="image" src="" alt="이미지" width="250px;" height="250px;"/>
						</td>
					</tr>
					<tr>
						<td>상세정보<span style="color: red;"> * </span></td>
						<td id="goodsDetailInfo">
							<input type="number" name="gdPage" placeholder="쪽" maxlength="25" oninput="maxLengthCheck(this)">쪽
							<input type="number" name="gdThick" placeholder="mm" maxlength="25" oninput="maxLengthCheck(this)">mm
							<input type="text" name="gdWr" placeholder="작가" maxlength="16">작가
							<input type="text" name="gdPb" placeholder="출판사" maxlength="16">출판사
						</td>
					</tr>
					<tr>
						<td>상품설명<span style="color: red;"> * </span></td>
						<td><textarea name="gdDc" rows="5" cols="50" maxlength="1300"></textarea></td>
					</tr>
					<tr>
						<td>상세설명</td>
						<td><input id="file2" name="gdDetlFile" type="file" multiple="multiple" accept=".jpg, .png, .jpeg" onchange="chkFileType(this)"></td>
					</tr>
				</table>
				<button type="button" id="goodsListBtn" class="btnSmallList hover">목록</button>
				<button type="button" id="goodsRegBtn" class="btnSmallList hover">저장</button>
			</form>
		</div>
	</main>
</body>
</html>