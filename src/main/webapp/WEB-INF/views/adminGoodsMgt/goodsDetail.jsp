<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
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
				<div id="essential"><span style="color: red;"> * </span>표시는 필수 입력사항입니다</div>
				<table style="width:900px;table-layout: fixed">
					<colgroup>
						<col style="width:200px">
						<col style="width:700px">
					</colgroup>
					<tr>
						<td>상품구분/상품분류<span style="color: red;"> * </span></td>
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
						<td>상품이름<span style="color: red;"> * </span></td>
						<td>
							<div class="viewForm">
								<c:out value="${goodsVO.gdNm}"></c:out>
							</div>
							<div class="writeForm">
								<input type="text" name="gdNm" maxlength="30" value="${goodsVO.gdNm}">
							</div>
						</td>
					</tr>
					<tr>
						<td>상품가격<span style="color: red;"> * </span></td>
						<td>
							<div class="viewForm">
								<fmt:formatNumber value="${goodsVO.gdPrice}" pattern="#,###"/>
								<span>원</span>
							</div>
							<div class="writeForm">
								<input type="number" name="gdPrice" maxlength="10" oninput="maxLengthCheck(this)" value="${goodsVO.gdPrice}">
								<span>원</span>
							</div>
						
							
						</td>
					</tr>
					<tr>
						<td>재고<span style="color: red;"> * </span></td>
						<td>
							<div class="viewForm">
								<c:out value="${goodsVO.gdCnt}"></c:out>
							</div>
							<div class="writeForm">
								<input type="number" name="gdCnt" maxlength="15" oninput="maxLengthCheck(this)" value="${goodsVO.gdCnt}">
							</div>
						</td>
					</tr>
					<tr>
						<td>상품개시<span style="color: red;"> * </span></td>
						
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
						<td>상품이미지<span style="color: red;"> * </span></td>
						<td id="img1Wrap">
							<div class="viewForm img">
								<img alt="이미지없음" src="data:image/png;base64,${goodsVO.gdImgStr}" onerror="this.style.display='none'">
							</div>
							<div class="writeForm">
								<label for="file1">
									<a>클릭</a>
								</label>
								<input id="file1" name="gdImgFile" type="file" accept=".jpg, .png, .jpeg" onchange="chkFileType(this)">
								<!-- 상세에 원래 파일이 없을경우-->
								<c:if test="${goodsVO.gdImgStr == null}">
									<span id="blankImage">파일이 없습니다.<br/> 등록해 주세요</span>
								</c:if>
								<!-- 상세에 원래 파일이 있는경우-->
								<c:if test="${goodsVO.gdImgStr != null}">
									<img id="orginImg" alt="이미지없음" src="data:image/png;base64,${goodsVO.gdImgStr}" width="250px;" height="250px;" onerror="this.style.display='none'">
								</c:if>
								<img id="image" src="" alt="이미지" width="250px;" height="250px;"/>
								
							</div>
						</td>
					</tr>
					<tr>
						<td>상세정보<span style="color: red;"> * </span></td>
						<td id="goodsDetailInfo">
							<div class="viewForm">
							<p>${goodsVO.gdPage}쪽,${goodsVO.gdThick}mm,${goodsVO.gdWr}작가,${goodsVO.gdPb}출판사</p>
							</div>
							<div class="writeForm">
								<input type="number" name="gdPage" placeholder="쪽" maxlength="25" oninput="maxLengthCheck(this)" value="${goodsVO.gdPage}">쪽
								<input type="number" name="gdThick" placeholder="mm" maxlength="25" oninput="maxLengthCheck(this)" value="${goodsVO.gdThick}">mm
								<input type="text" name="gdWr" placeholder="작가" maxlength="16" value="${goodsVO.gdWr}"> 작가
								<input type="text" name="gdPb" placeholder="출판사" maxlength="16" value="${goodsVO.gdPb}">출판사
							</div>
						</td>
					</tr>
					<tr>
						<td>상품설명<span style="color: red;"> * </span></td>
						<td>
							<div class="viewForm">
							<div style="width:100%; word-wrap:break-word;">${goodsVO.gdDc}</div>
							</div>
							<div class="writeForm">
								<textarea name="gdDc" rows="5" cols="50" maxlength="1300">${goodsVO.gdDc}</textarea>
							</div>
						</td>
					</tr>
					<tr>
						<td>상세설명</td>
						<td>
							<div class="viewForm img">
								<img src="data:image/png;base64,${goodsVO.gdDetlStr}" onerror="this.style.display='none'">
							</div>
							<div class="writeForm">
								<label for="file2" id="gdDetlLabel">
									<input id="file2Btn" type="button" value="파일 선택"><span style="margin-left: 8px; font-size: 13px;">${goodsVO.gdDetlNm}</span>
								</label>
								<input id="file2" name="gdDetlFile" type="file" accept=".jpg, .png, .jpeg" onchange="chkFileType(this)" style="display: none;">
							</div>
						</td>
					</tr>
				</table>
				<div style="width:977px;table-layout: fixed">
					<input type="hidden" id="gdNo" name="gdNo" value="${goodsVO.gdNo}">
					<button type="button" id="goodsListBtn" class="btnSmallList hover">목록</button>
					<button type="button" id="goodsUpdDoneBtn" class="btnSmallList hover">저장</button>
					<button type="button" id="goodsDelBtn" class="btnSmallList hover">삭제</button>
					<button type="button" id="goodsUpdBtn" class="btnSmallList hover">수정</button>
				</div>
				
			</form>
		</div>
	</main>
</body>
</html>