<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div  style="display:inline-block ;background-color: grey; width: 200px; min-height: 575px;">
	<img id="homeIcon" alt="homeIcon" src="/images/home.svg" width="60px" style="padding: 15px;" onclick="goHome()">
	<ul style="margin: 0;">
		<li onclick="location.href='/menuMgt'">임시 메뉴관리</li>
		<li>메뉴2</li>
	</ul>
</div>
<img style="position:absolute; padding: 20px 0;" alt="logo" src="/images/logo.png" onclick="goHome()">