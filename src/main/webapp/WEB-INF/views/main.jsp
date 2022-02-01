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
	<main id="contentsWrap">
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
			<div id="leftDown" style="margin-top: 12px;">
				<div style="display: flex;">
					<!--이건 베스트,신간 적용할것-->
						<div id="bestSeller">
							<!-- 베스트 셀러 -->
							<div id="bestSellerTab">
								<ul>
									<li style="font-weight: 700;">베스트셀러</li>
									<li class="hover" style="font-weight: 700; position: absolute; right: 694px;">+</li>
								</ul>
								<ul>
									<li class="hover"><input type="hidden" value="special">전문서적</li>
									<li class="hover"><input type="hidden" value="general">일반서적</li>
									<li class="hover"><input type="hidden" value="foreign">외국어</li>
									<li class="hover"><input type="hidden" value="child">아동</li>
									<li class="hover"><input type="hidden" value="magazine">잡지</li>
									<li class="hover"><input type="hidden" value="it">IT</li>
									<li class="hover"><input type="hidden" value="exam">수험서</li>
								</ul>
							</div>
							<ul></ul>
						</div>
						<div id="recommendBook">
							<div id="recommendTab">
								<ul>
									<li style="font-weight: 700;">추천도서</li>
								</ul>
								<ul>
									<li class="hover"><input type="hidden" value="newBook">신간도서</li>
									<li class="hover"><input type="hidden" value="localBook">국내도서</li>
									<li class="hover"><input type="hidden" value="foreignBook">외국도서</li>
								</ul>
							</div>
							<ul style="border: 1px solid; height: 90%;">
								<li id="recomnImg" style="margin-top: 23px;">
									<input type="hidden" id="recomnGdNo">
									<img class="hover" alt="이미지없음" style="width: 80%; height:220px; padding: 1em; margin-left: 30px;">
								</li>
								<li id="recomnGdNm" style="text-align: center;">
								</li>
								<li style="margin:10px 0;text-align: center;">
									<button id="recomndReload" class="hover" type="button">추천새로고침&nbsp;&#x21BA;</button>
								</li>
							</ul>
							<form id="searchForm">
								<input type="hidden" name="gdNo"/>
								<input type="hidden" name="selectOptValTwo"/>
								<input type="hidden" name="selectOptValThree"/>
								<input type="hidden" name="page"/>
							</form>
						</div>
				</div>
			</div>
		</div>
		<div id="bestRank">
			<h4 style="text-align: center;">베스트 셀러</h4>
			<input id="oneRank" type="button" value="1~5위">
			<input id="sixRank" type="button" value="6~10위">
			<ul id="bestRankListOne">
			</ul>
			<ul id="bestRankListTwo" style="display: none">
			</ul>
		</div>
	</main>
	<footer>
		<c:import url="/footer/footerPage"></c:import>
	</footer>
</body>
</html>