<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div
	style="display: inline-block; background-color: grey; width: 200px; min-height: 575px;">
	<img id="homeIcon" alt="homeIcon" src="/images/home.svg" width="60px"
		style="padding: 15px;" onclick="goHome()">
	<ul id="sideUl">
		<c:forEach items="${list}" var="vo" varStatus="st">
			<li class="menu">
				<c:if test="${vo.menuUpCd == null}">
					<span class="rootMenu">${vo.menuNm}</span>
				</c:if>
			    <c:if test="${vo.menuUpCd != null}">
					<span class="nodeMenu" onclick="location.href='/'+'${vo.menuCd}'">
					    <span>&nbsp;&nbsp;-</span>
						<span>${vo.menuNm}</span>
					</span>
				</c:if> 
			</li>
		</c:forEach>

	</ul>
</div>
<img style="position: absolute; padding: 20px 0;" alt="logo"
	src="/images/logo.png" onclick="goHome()">