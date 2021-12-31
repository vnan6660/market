<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>마이페이지</title>
<script src="/webjars/jquery/3.4.1/jquery.js"></script>
<link rel="stylesheet" href="/css/myTotalInfo/myCartBuy.css">
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/myTotalInfo/myCartBuy.js"></script>
</head>
<body>
<c:import url="/sideMenu/sideMenuPage"></c:import>
<main id="contents" class="info">
<form id="myCartBuyForm">
	<div class="table-wrap">
		<div class="myinfo">
			<h3>상품정보</h3>
		</div>
		<div style="width:800px;table-layout: fixed">
			<!-- 상품 리스트 테이블 -->
			<table>
				<colgroup>
					<col style="width:120px">
					<col style="width:300px">
					<col style="width:130px">
					<col style="width:130px">
					<col style="width:130px">
				</colgroup>
				<thead>
					<tr>
						<th>
							상품이미지
						</th>
						<th>
							상품정보
						</th>
						<th>
							수량
						</th>
						<th>
							배송비
						</th>
						<th>
							판매가
						</th>
					</tr>
				</thead>
				<tbody>
				<c:forEach items="${cartList}" var="vo">
					<tr>
						<td>
							<input type="hidden" name="cartNo" id="cartNo" value="${vo.cartNo}">
							<input type="hidden" name="gdNo" id="gdNo" value="${vo.gdNo}">
							<img id="img"class="hover" alt="이미지없음" src="data:image/png;base64,${vo.gdImgStr}">
						</td>
						<td id="bookInfo">
							<ul>
								<li>${vo.gdNm}</li>
							</ul>
						</td>
						<td>
							<div style="text-align: center; width: 100%;">${vo.gdQty}</div>
						</td>
						<td>
							무료배송
						</td>
						<td>
							<input type="hidden" id="gdPrice" value="${vo.gdPrice}">
							<fmt:formatNumber value="${vo.gdPrice}" pattern="#,###" type="number"/>원
						</td>
					</tr>
					<c:set var="total" value="${total + vo.gdPrice}" />
				</c:forEach>
				</tbody>
				<tfoot>
					<tr>
						<td id="tFoot" colspan="6">
							<span>합계:</span>
							<span id="redSpan"><fmt:formatNumber value="${total}" pattern="#,###" type="number"/>원</span>
						</td>
					</tr>
				</tfoot>
			</table>
			
			<!-- 주문자정보 테이블 -->
			<h3>주문자 정보</h3>
			<table>
			<colgroup>
				<col style="width:120px">
				<col style="width:30px">
				<col style="width:650px">
			</colgroup>
			<c:forEach items="${csInfo}" var="csInfo">
				<tr>
					<th>이름</th>
					<td class="borderTop"></td>
					<td class="textLeft borderTop">
						<input id="csNm" name="csNm" type="text" value="${csInfo.csNm}">
					</td>
				</tr>
				<tr>
					<th>핸드폰</th>
					<td><input type="hidden" name="csPhone" id="csPhone"></td>
					<td class="textLeft">
						<select class="w70" id="csPhoneOne">
							<option id="hideCsPhoneOne">${csInfo.csPhone.substring(0,3)}</option>
							<option value="010">010</option>
							<option value="011">011</option>
							<option value="016">016</option>
							<option value="017">017</option>
							<option value="018">018</option>
							<option value="019">019</option>
						</select>
						 - <input class="w70" type="text" id="csPhoneTwo" value="${csInfo.csPhone.substring(3,7)}">
						 - <input class="w70" type="text" id="csPhoneThree" value="${csInfo.csPhone.substring(7,11)}">
					</td>
				</tr>
				<tr>
					<th>이메일</th>
					<td><input name="csEmail" type="hidden" id="csEmail"></td>
					<td class="textLeft">
						<input type="hidden" id="hiddenEmail" value="${csInfo.csEmail}">
						<input type="text" class="w160" id="csEmailOne" name="csEmailOne" maxlength="20"> @ 
						<input type="text" class="w160" id="csEmailWriteInput" name="csEmailWriteInput" maxlength="15">
						<select class="w160" id="csEmailTwo" name="csEmailTwo">
							<option value="naver.com">naver.com</option>
							<option value="daum.net">daum.net</option>
							<option value="gmail.com">gmail.com</option>
							<option value="hanmail.net">hanmail.net</option>
							<option value="kakao.com">kakao.com</option>
							<option value="직접입력" id="csEmailWrite">직접입력</option>
							<option id="hiddenEmailTwo"></option>
						</select>
						<div id="csEmailChk"></div>
					</td>
				</tr>
				<tr>
					<th>주소</th>
					<td></td>
					<td class="textLeft">
						<ul>
							<li style="margin-bottom: 20px;">
								<div style="font-size: 12px">기본주소</div>
								<input id="csAddrOne" name="csAddrOne" class="w460" type="text" value="${csInfo.csAddrOne}">
							</li>
							<li>
								<div style="font-size: 12px">상세주소</div>
								<input id="csAddrTwo" name="csAddrTwo" class="w460" type="text" value="${csInfo.csAddrTwo}">
							</li>
						</ul>
					</td>
				</tr>
			</c:forEach>
			</table>
			
			<!-- 결제하기 -->
			<div id="orderBtn">
				<button class="hover" id="goPay">구매하기</button>
			</div>
		</div>
	</div>
</form>
</main>
<footer>
	<c:import url="/footer/footerPage"></c:import>
</footer>
</body>

</html>	