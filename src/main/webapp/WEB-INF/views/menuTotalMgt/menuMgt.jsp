<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>메뉴관리</title>
<script src="/webjars/jquery/3.4.1/jquery.js"></script>
<link rel="stylesheet" href="/css/menuTotalMgt/menuMgt.css">
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/menuTotalMgt/menuMgt.js"></script>
</head>
<body>
	<c:import url="/sideMenu/sideMenuPage"></c:import>
	<main id="contents">
		<h2>메뉴관리</h2>
		<hr>
		<div id="newMenuWrap">
			<ul style="overflow: auto;">
				<li class="hover"><span><img id="plusBtn" alt="+button"
						src="/images/plusBtn.svg"></span> <span id="plusMenu">메뉴 추가</span></li>
				<c:forEach items="${list}" var="vo">
					<li class="menuC hover" onclick="menuClick(${vo.menuId})"><c:if
							test="${vo.menuUpCd != null}">&nbsp;&nbsp; -</c:if> <span>${vo.menuNm}(${vo.menuSn})</span>
					</li>
				</c:forEach>
			</ul>
			<table id="blankTable">
				<tr>
					<td>데이터가 없습니다 <br/>메뉴를 클릭해주시거나 새로만들기를 눌러주세요</td>
				</tr>
			</table>
			<table id="writeTable">
				<tr>
					<td><input type="hidden" id="menuId"></td>
					<td style="text-align: center;"><span style="color: red;"> * </span>표시는 필수 입력사항입니다</td>
				</tr>
				<tr>
					<td>메뉴명<span style="color: red;"> * </span></td>
					<td><input id="menuNm" name="valiCheck" type="text" maxlength="15"></td>
				</tr>
				<tr>
					<td>메뉴코드<span style="color: red;"> * </span></td>
					<td><input id="menuCd" name="valiCheck" type="text" maxlength="20"></td>
				</tr>
				<tr>
					<td>상위메뉴명</td>
					<td><select id="menuUpCd">
							<option value="">선택</option>
							<c:forEach items="${option}" var="op">
								<option value="${op.menuCd}">${op.menuNm}</option>
							</c:forEach>
					</select></td>
				</tr>
				<tr>
					<td>정렬순서<span style="color: red;"> * </span></td>
					<td><input id="menuSn" name="valiCheck" type="number" maxlength="15" oninput="maxLengthCheck(this)"></td>
				</tr>
				<tr>
					<td>사용여부</td>
					<td><span>관리자</span> <select id="adminSelect">
							<option value="Y">Y</option>
							<option value="N">N</option>
					</select> <span>사용자</span> <select id="userSelect">
							<option value="Y">Y</option>
							<option value="N">N</option>
					</select></td>
				</tr>
				<tr>
					<td colspan="2">
						<button id="menuSaveBtn" class="hover">저장</button>
						<button id="menuDelBtn" class="hover">삭제</button>
					</td>
				</tr>
			</table>
		</div>
	</main>

</body>
</html>