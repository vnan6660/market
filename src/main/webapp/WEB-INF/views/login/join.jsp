<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원가입</title>
<script src="/webjars/jquery/3.4.1/jquery.js"></script>
<link rel="stylesheet" href="/css/login/join.css">
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/login/join.js"></script>
</head>
<body>
<c:import url="/sideMenu/sideMenuPage"></c:import>
	<main id="contentsWrap" class="join">
	<form action="/login/doJoin" method="post" onsubmit="return validation();">
	<input type="hidden" id="csPhone" name="csPhone">
	<input type="hidden" id="csEmail" name="csEmail">
		<div class="table-wrap">
			<ul class="join-info">
				<li><h3>기본정보</h3></li>
				<li>*필수입력사항</li>
			</ul>
				<table>
					<tr>
						<th>회원구분*</th>
						<td><input type="radio" id="csGrade" name="csGrade" checked="checked"> 개인회원</td>
					</tr>
					<tr>
						<th>아이디*</th>
						<td>
							<input type="text" id="csId" name="csId" placeholder="아이디" maxlength="16"> (영문소문자/숫자 조합, 4~16자)
							<div id="csIdCheck"></div>
						</td>
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
							<input id="csNm" name="csNm" type="text" maxlength="10">
							<div id="csNmConfirm"></div>
						</td>
					</tr>
					<tr>
						<th>주소</th>
						<td>
							<ul>
								<li><input type="text" id="csAddrOne" name="csAddrOne" placeholder="기본 주소" maxlength="30" style="width:307px"></li>
								<li><input type="text" id="csAddrTwo" name="csAddrTwo" placeholder="상세 주소" maxlength="30" style="width:307px"></li>
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
							</select>
							- <input type="text" class="w90 phone" id="csPhoneTwo" name="csPhoneTwo" maxlength="4"> 
							- <input type="text" class="w90 phone" id="csPhoneThree" name="csPhoneThree" maxlength="4">
							<div id="phoneChk"></div>
						</td>
					</tr>
					<tr>
						<th>이메일*</th>
						<td>
							<input type="text" class="w150" id="csEmailOne" name="csEmailOne" maxlength="12"> @ 
							<input type="text" class="w150" id="csEmailWriteInput" name="csEmailWriteInput" maxlength="12">
							<select class="w150" id="csEmailTwo" name="csEmailTwo">
								<option value="선택" id="hidden">선택</option>
								<option value="naver.com">naver.com</option>
								<option value="daum.net">daum.net</option>
								<option value="gmail.com">gmail.com</option>
								<option value="hanmail.net">hanmail.net</option>
								<option value="kakao.com">kakao.com</option>
								<option value="직접입력" id="csEmailWrite">직접입력</option>
							</select>
							<div id="csEmailChk"></div>
						</td>
					</tr>
				</table>
				<h3>추가정보</h3>
				<table>
					<tr>
						<th>생년월일*</th>
						<td>
							<select id="yearBox" name="csBirthYear"></select>
							년
							<select id="month" name="csBirthMonth">
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
							</select>
							월
							<select id="day" name="csBirthDay">
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
								<option value="13">13</option>
								<option value="14">14</option> 
								<option value="15">15</option> 
								<option value="16">16</option> 
								<option value="17">17</option> 
								<option value="18">18</option> 
								<option value="19">19</option> 
								<option value="20">20</option> 
								<option value="21">21</option> 
								<option value="22">22</option> 
								<option value="23">23</option> 
								<option value="24">24</option> 
								<option value="25">25</option>
								<option value="26">26</option>
								<option value="27">27</option>
								<option value="28">28</option>
								<option value="29">29</option>
								<option value="30">30</option>
								<option value="31">31</option>
							</select>
							일
							<div id="ageConfirm"></div>
						</td>
					</tr>
				</table>
			</div>
			<div class="join-btn-wrap">
				<input id="joinBtn" type="submit" class="hover" value="회원가입">
			</div>
		</form>
	</main>
	<footer>
		<c:import url="/footer/footerPage"></c:import>
	</footer>
</body>

</html>
