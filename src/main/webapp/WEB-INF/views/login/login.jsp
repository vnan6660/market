<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>main</title>
<link rel="shortcut icon" href="#">
<script src="/webjars/jquery/3.4.1/jquery.js"></script>
<link rel="stylesheet" href="/css/login/login.css">
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/login/login.js"></script>
</head>
<body>
	<main>
		<div id="logInWrap">
		<img id="logoIcon" class="hover" alt="logo" src="/images/logo.png" onclick="goHome()"> 
			<div id="checkWrap">
				<input id="idCheck" class="check" maxlength="16"/> 
				<input id="passCheck" class="check" type="password" maxlength="16"/>
				<span id="signUpBtn" >회원가입</span>
				<div id="validCheckText"></div>
			</div>
			<button id="loginBtn">로그인</button>
		</div>
	</main>
</body>

</html>