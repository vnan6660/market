<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>메인</title>
<script src="webjars/jquery/3.4.1/jquery.js"></script>
<link rel="stylesheet" href="/css/common/userMain.css">
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/common/userMain.js"></script>
</head>
<body>
	<c:import url="/sideMenu/sideMenuPage"></c:import>
	<main id="contents" style="height: 1000px;">
		<div id="leftContents">
			<div id="leftSlideShow">
				<!-- 슬라이드쇼 -->
				<div id="slides" class="tabcontent">
					<div id="eventPrice">
						<img alt="슬라이드이미지1" src="/images/slideImg1.jpg">
						<img alt="슬라이드이미지2" src="/images/slideImg2.jpg">
						<img alt="슬라이드이미지3" src="/images/slideImg3.jpg">
					</div>
					<div id="gift">
						<img alt="증정품1" style="background-color: #fff" src="/images/search.svg">
						<img alt="증정품2" style="background-color: #fff" src="/images/question.svg">
					</div>
					<button id="prev">&lang;</button>
					<button id="next">&rang;</button>
					
				</div>
				<div id="tabNav">
						<a href="#eventPrice" id="epTab" class="active">이벤트/특가</a>
						<a href="#gift" id="gfTab">증정품</a>
				</div>
			</div>
			<div id="leftDown">
				<div>
					<!--이건 베스트,신간 적용할것-->
						<div id="bestSeller">
							<!-- 베스트 셀러 -->
							<div id="bestSellerTab">
								<ul style="display: flex;">
									<li style="font-weight: 700;">베스트셀러</li>
									<li>전문서적</li>
									<li>일반서적</li>
									<li>외국어</li>
									<li>아동</li>
									<li>잡지</li>
									<li>IT</li>
									<li>수험서</li>
								</ul>
							</div>
						</div>
						<div id="issueBook">
							<!--  화제의 신간 -->
						</div>
				</div>
			</div>
		</div>
	</main>
	<footer>
		<c:import url="/footer/footerPage"></c:import>
	</footer>
</body>

</html>