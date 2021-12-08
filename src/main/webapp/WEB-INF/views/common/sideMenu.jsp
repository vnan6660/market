<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div id="sideUlWrap">
	<img id="homeIcon" class="hover" alt="homeIcon" src="/images/home.svg"
		onclick="goHome()">
	<ul id="sideUl">
		<c:forEach items="${list}" var="vo">


			<c:choose>
				<c:when test="${vo.userYn == 'N' and sessionScope.userGrade != '0'}">
				</c:when>
				<c:otherwise>
					<li class="menu"><c:if test="${vo.menuUpCd == null}">
							<span class="rootMenu">${vo.menuNm}</span>
						</c:if> <c:if test="${vo.menuUpCd != null}">
							<a href="/${vo.menuCd}/${vo.menuCd}Page"> <span
								class="nodeMenu"> <span>&nbsp;&nbsp;-</span> <span>${vo.menuNm}</span>
							</span>
							</a>
						</c:if></li>
				</c:otherwise>
			</c:choose>
		</c:forEach>

	</ul>
</div>

<img id="logoIcon" class="hover" alt="logo" src="/images/logo.png"
	onclick="goHome()">
<c:if test="${sessionScope.userId == null}">
	<button id="goLogInBtn" class="hover" onclick="goLogin()">로그인</button>
</c:if>
<c:if test="${sessionScope.userId != null}">
	<p id="userNameSpace">${sessionScope.userNm}님</p>
	<button id="goLogOutBtn" class="hover" onclick="goLogout()">로그아웃</button>
</c:if>
