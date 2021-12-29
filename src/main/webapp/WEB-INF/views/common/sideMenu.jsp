<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div id="sideUlWrap">
	<img id="homeIcon" class="hover" alt="homeIcon" src="/images/home.svg"
		onclick="goHome(${sessionScope.userGrade})">
	<ul id="sideUl">
		<c:forEach items="${list}" var="vo">


			<c:choose>
				<c:when test="${vo.adminYn == 'N' and sessionScope.userGrade == '0'}">
					<!-- 관리자 권한을 가지고 있는데 관리자 사용여부가 N인경우-->
				</c:when>
				<c:when test="${vo.userYn == 'N' and sessionScope.userGrade != '0'}">
					<!-- 사용자 권한또는 로그인 하지않을 경우 사용자 사용여부가 N인경우-->
				</c:when>
				<c:when test="${vo.userYn == 'N' and vo.adminYn == 'N'}">
					<!-- 메뉴를 사용하지 않는 경우 -->
				</c:when>
				<c:when test="${vo.menuCd == 'myTotalInfo' and sessionScope.userGrade == null}">
					<!-- 내정보 마이페이지는 로그인하지 않으면 안보이게 하기 -->
				</c:when>
				<c:when test="${vo.menuUpCd == 'myTotalInfo' and sessionScope.userGrade == null}">
					<!-- 내정보 마이페이지는 로그인하지 않으면 안보이게 하기 -->
				</c:when>
				
				<c:otherwise>
					<li class="menu">
					<c:if test="${vo.menuUpCd == null}">
							<span class="rootMenu">${vo.menuNm}</span>
					</c:if> 
					<c:if test="${vo.menuUpCd != null}">
						<a href="/${vo.menuCd}/${vo.menuCd}Page"> 
							<span class="nodeMenu">
								<span>&nbsp;&nbsp;-</span> <span>${vo.menuNm}</span>
							</span>
						</a>
					</c:if>
					</li>
				</c:otherwise>
			</c:choose>
		</c:forEach>

	</ul>
</div>

<img id="logoIcon" class="hover" alt="logo" src="/images/logo.png"
	onclick="goHome(${sessionScope.userGrade})">
<c:if test="${sessionScope.userId == null}">
	<button id="goLogInBtn" class="hover" onclick="goLogin()">로그인</button>
</c:if>
<c:if test="${sessionScope.userId != null}">
	<p id="userNameSpace">${sessionScope.userNm}님</p>
	<button id="goLogOutBtn" class="hover" onclick="goLogout()">로그아웃</button>
</c:if>
