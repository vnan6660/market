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
<link rel="stylesheet" href="/css/myTotalInfo/pwChk.css">
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/myTotalInfo/myInfo.js"></script>
</head>
<body>
<c:import url="/sideMenu/sideMenuPage"></c:import>
	<main id="contents-pwChk" class="info">
		<div class="table-wrap">
			<ul class="myinfo">
				<li><h3>비밀번호 확인</h3></li>
			</ul>
				<table>
					<tr>
						<th>아이디</th>
						<td>${csInfo.csId}</td>
					</tr>
					
					<tr>
						<th>비밀번호</th>
						<td><input type="password" id="pwChkInput"></td>
					</tr>
				</table>
			</div>
			<ul class="flex">
				<li>
					<div class="join-btn-wrap">
						<button class="hover w100" id="pwChkBtn">확인</button>
					</div>
				</li>
				<li>
					<div class="join-btn-wrap">
						<button class="hover w100" id="pwChkBtnCancle">취소</button>
					</div>
				</li>
			</ul>
			
	</main>
</body>

</html>
