<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>마이페이지</title>
<script src="/webjars/jquery/3.4.1/jquery.js"></script>
<link rel="stylesheet" href="/css/myTotalInfo/pwChk.css">
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/myTotalInfo/myInfo.js"></script>
</head>
<body>
<c:import url="/sideMenu/sideMenuPage"></c:import>
	<main id="contentsWrap" class="info">
	<input type="hidden" id="csId" name="csId" value="${csInfo.csId}">	
		<div class="table-wrap" style="width:750px;table-layout: fixed">
			<ul class="myinfo">
				<li><h3>비밀번호 확인</h3></li>
			</ul>
				<table>
					<tr>
						<th>아이디</th>
						<td>${csInfo.csId}</td>
					</tr>
					
					<tr>
						<th>비밀번호*</th>
						<td><input type="password" id="pwChkInput" maxlength="16"></td>
					</tr>
				</table>
			</div>
			<ul class="flex">
				<li>
					<div>
						<button class="hover ml100 btnCss" id="pwChkBtn">확인</button>
					</div>
				</li>
				<li>
					<div>
						<button class="hover ml100 btnCss" id="pwChkBtnCancle">취소</button>
					</div>
				</li>
			</ul>
			
	</main>
	<footer>
		<c:import url="/footer/footerPage"></c:import>
	</footer>
</body>

</html>
