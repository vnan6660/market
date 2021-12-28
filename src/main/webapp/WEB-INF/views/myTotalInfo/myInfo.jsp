<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>마이페이지</title>
<link rel="shortcut icon" href="#">
<script src="/webjars/jquery/3.4.1/jquery.js"></script>
<link rel="stylesheet" href="/css/myTotalInfo/myInfo.css">
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/myTotalInfo/myInfo.js"></script>
</head>
<body>
<c:import url="/sideMenu/sideMenuPage"></c:import>
	<main id="contents-myinfo" class="info">
		<div class="table-wrap">
			<ul class="myinfo">
				<li><h3>기본정보</h3></li>
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
						<th>이름</th>
						<td>${csInfo.csNm}</td>
					</tr>
					<tr>
						<th>주소</th>
						<td>
							<ul>
								<li>${csInfo.csAddrOne}</li>
								<li>${csInfo.csAddrTwo}</li>
							</ul>
						</td>
					</tr>
					<tr>
						<th>휴대전화</th>
						<td>
							${csInfo.csPhone.substring(0,3)} - ${csInfo.csPhone.substring(3,7)} - ${csInfo.csPhone.substring(7,11)}
						</td>
					</tr>
					<tr>
						<th>이메일</th>
						<td>
							${csInfo.csEmail}
						</td>
					</tr>
				</table>
				<h3>추가정보</h3>
				<table>
					<tr>
						<th>생년월일</th>
						<td>
							${csInfo.csBirthYear}년 ${csInfo.csBirthMonth}월 ${csInfo.csBirthDay}일
						</td>
					</tr>
				</table>
			</div>
			<div class="join-btn-wrap">
				<button class="hover" id="updateInfoBtn">회원정보수정</button>
			</div>
	</main>
</body>

</html>
