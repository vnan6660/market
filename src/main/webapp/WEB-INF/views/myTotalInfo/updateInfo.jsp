<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>마이페이지</title>
<script src="/webjars/jquery/3.4.1/jquery.js"></script>
<link rel="stylesheet" href="/css/myTotalInfo/updateInfo.css">
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/myTotalInfo/updateInfo.js"></script>
</head>
<body>
<c:import url="/sideMenu/sideMenuPage"></c:import>
	<main id="contentsWrap" class="info">
	<form id="updateInfoForm" name="updateInfoForm">
		<input type="hidden" id="csPhone" name="csPhone">	
		<input type="hidden" id="csEmail" name="csEmail">	
		<input type="hidden" id="csId" name="csId" value="${csInfo.csId}">	
		<input type="hidden" id="csGrade" name="csGrade" value="${csInfo.csGrade}">	
		<div class="table-wrap">
			<ul class="myinfo">
				<li><h3>회원정보수정</h3></li>
			</ul>
				<table>
					<tr>
						<th>회원구분</th>
						<td>${csInfo.csGrade}</td>
					</tr>
					<tr>
						<th>아이디</th>
						<td>${csInfo.csId}</td>
					</tr>
					<tr>
						<th>비밀번호*</th>
						<td>
							<input type="password" id="csPs" name="csPs" placeholder="비밀번호" maxlength="16"> (영문소문자/숫자/특수문자 조합, 8자~16자)
							<div id="csPwCheck"></div>
						</td>
					</tr>
					<tr>
						<th>비밀번호 확인*</th>
						<td>
							<input type="password" id="csPsConfirm" placeholder="비밀번호 확인" maxlength="16">
							<div id="csPwConfirm"></div>
						</td>
					</tr>
					<tr>
						<th>이름*</th>
						<td>
							<input id="csNm" value="${csInfo.csNm}" name="csNm" type="text" maxlength="10">
							<div id="csNmConfirm"></div>
						</td>
					</tr>
					<tr>
						<th>주소</th>
						<td>
							<ul>
								<li><input type="text" value="${csInfo.csAddrOne}" id="csAddrOne" name="csAddrOne" placeholder="기본 주소" maxlength="30" style="width:307px" ></li>
								<li><input type="text" value="${csInfo.csAddrTwo}" id="csAddrTwo" name="csAddrTwo" placeholder="상세 주소" maxlength="30" style="width:307px"></li>
							</ul>
						</td>
					</tr>
					<tr>
						<th>휴대전화*</th>
						<td>
							<select class="w90" id="csPhoneOne" name="csPhoneOne">
								<option value="010">010</option>
								<option value="011">011</option>
								<option value="016">016</option>
								<option value="017">017</option>
								<option value="018">018</option>
								<option value="019">019</option>
								<option id="hideCsPhoneOne">${csInfo.csPhone.substring(0,3)}</option>
							</select>
							- <input type="text" value="${csInfo.csPhone.substring(3,7)}" class="w90 phone" id="csPhoneTwo" name="csPhoneTwo" maxlength="4"> 
							- <input type="text" value="${csInfo.csPhone.substring(7,11)}" class="w90 phone" id="csPhoneThree" name="csPhoneThree" maxlength="4">
							<div id="phoneChk"></div>
						</td>
					</tr>
					<tr>
						<th>이메일*</th>
						<td>
							<input type="hidden" id="hiddenEmail" value="${csInfo.csEmail}">
							<input type="text" class="w150" id="csEmailOne" name="csEmailOne" maxlength="20"> @ 
							<input type="text" class="w150" id="csEmailWriteInput" name="csEmailWriteInput" maxlength="15">
							<select class="w150" id="csEmailTwo" name="csEmailTwo">
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
				</table>
				<h3>추가정보</h3>
				<table>
					<tr>
						<th>생년월일</th>
						<td>
							<select id="yearBox" name="csBirthYear">
								<option id="hideBirthYear">${csInfo.csBirthYear}</option>
							</select>
							년
							<select id="month" name="csBirthMonth">
								<c:forEach var="i" begin="1" end="12" step="1">
								    <option <c:out value="${i}" />>${i}</option>
								</c:forEach>
								<option id="hideBirtMonth">${csInfo.csBirthMonth}</option>
							</select>
							월
							<select id="day" name="csBirthDay">
								<c:forEach var="i" begin="1" end="31" step="1">
								    <option <c:out value="${i}" />>${i}</option>
								</c:forEach>
								<option id="hideBirthDay">${csInfo.csBirthDay}</option>
							</select>
							일
							<div id="ageConfirm"></div>
						</td>
					</tr>
				</table>
			</div>
			<div class="updateInfobtn-wrap">
				<input id="updateInfoBtn" type="button" class="hover" value="회원정보수정">
			</div>
		</form>
	</main>
	<footer>
		<c:import url="/footer/footerPage"></c:import>
	</footer>
</body>

</html>
