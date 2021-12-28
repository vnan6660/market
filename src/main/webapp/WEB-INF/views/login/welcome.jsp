<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>page</title>
<script src="/webjars/jquery/3.4.1/jquery.js"></script>
<link rel="stylesheet" href="/css/login/join.css">
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/login/join.js"></script>
</head>
<body>
<c:import url="/sideMenu/sideMenuPage"></c:import>
	<main id="contents-welcome" class="info">
		<ul class="flex">
			<li>
				<h2 id="welcomeTxt">Page의 회원이 되신걸 환영합니다!</h2>
			</li>
			<li>
				<a href="/login/loginPage"><button class="hover w100 btnCss">로그인</button></a>
			</li>
			<li>
				<a href="/"><button class="hover w100 btnCss">메인페이지 이동</button></a>
			</li>
		</ul>
	</main>
</body>

</html>
