<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>주문목록</title>
<script src="/webjars/jquery/3.4.1/jquery.js"></script>
<link rel="stylesheet" href="/css/orderMgt/orderList.css">
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/orderMgt/orderList.js"></script>
</head> 
<body>
	<c:import url="/sideMenu/sideMenuPage"></c:import>
	<main id="contents">
		<h2>주문목록</h2>
		<hr>
		<div id="myOrderUpperWrap">
		<div id="ssWrap">
				<div id="dTWrap">
					<h5>날짜유형</h5>
					<select id="dtType">
						<option value="odDt">주문날짜</option>
						<option value="trDt">발송날짜</option>
					</select>
				</div>
				<div id="dateWrap">
					<input type="date" id="startDt">
					<p style="display: inline;"> ~ </p>
					<input type="date" id="endDt">
				</div>
				<div id="selectWrap">
					<h5>배송상태</h5>
					<select id="oderState">
						<option value="optAll">전체</option>
						<option value="100">주문완료</option>
						<option value="200">주문취소</option>
						<option value="300">배송중</option>
						<option value="400">배송완료</option>
					</select>
					<select id="orderInfo">
						<option value="optAll">전체</option>
						<option value="orderNmbr">주문번호</option>
						<option value="userId">사용자ID</option>
						<option value="userNm">사용자이름</option>
					</select>
				</div>
				<div id="searchWrap">
					<input type="search" id="searchVal" placeholder="검색어를 입력해주세요" />
				</div>
				<button id="goSearch" class="hover">검색</button>
				
			</div>
			<div>
				<button id="orderCancel" class="btnXSmall hover" value="orderCancel">주문취소</button>
				<button id="transferStart" class="btnXSmall hover" value="transferStart">발송완료</button>
				<button id="transferDone" class="btnXSmall hover" value="transferDone">배송완료</button>
			</div>
			<div>
				<table id="orderListTable">
					<colgroup>
						<col width="3%;">
						<col width="3%;">
						<col width="20%;">
						<col width="20%;">
						<col width="20%;">
						<col width="12.5%;">
						<col width="12.5%;">
						<col width="10%;">
					</colgroup>
					<tr>
						<th><input type="checkbox" name="allCheck" onclick="allCheck()"></th>
						<th>No</th>
						<th>사용자ID</th>
						<th>사용자이름</th>
						<th>주문번호</th>
						<th>주문날짜</th>
						<th>발송날짜</th>
						<th>발송상태</th>
					</tr>
					<c:if test="${fn:length(list) == 0}">
						<tr><td colspan='8'>데이터가 존재하지 않습니다</td></tr>
					</c:if>
					<c:if test="${fn:length(list) > 0}">
						<c:forEach items="${list}" var="od" varStatus="status">
						
						<c:set var="odNo" value="${od.odNo}"/>
								<c:set var="odNoLength" value="${fn:length(odNo)}"/>
								<c:set var="odState" value="${od.odState}"/>
								<c:if test="${odState == '주문완료' || odState == '주문취소'}">
									<c:set var="odStateResult" value="12"/>
								</c:if>
								<c:if test="${odState == '배송중' || odState == '배송완료'}">
									<c:set var="odStateResult" value="34"/>
								</c:if>
						<tr>
							<td>
								<input type="checkbox" name="eachCheck" value="${od.odNo}">
							</td>
							<!-- 역순(=DESC) -->
							<td class="hover" onclick="goDetail(${fn:substring(odNo,0,10)},${fn:substring(odNo,10,odNoLength)},${odStateResult})">
								<c:out value="${listcount - status.index}"/>
							</td>
							<td class="hover" onclick="goDetail(${fn:substring(odNo,0,10)},${fn:substring(odNo,10,odNoLength)},${odStateResult})">
								<c:out value="${od.csId}" />
							</td>
							<td class="hover" onclick="goDetail(${fn:substring(odNo,0,10)},${fn:substring(odNo,10,odNoLength)},${odStateResult})">
								<c:out value="${od.csNm}" />
							</td>
							<td class="hover" onclick="goDetail(${fn:substring(odNo,0,10)},${fn:substring(odNo,10,odNoLength)},${odStateResult})">
								<c:out value="${od.odNo}" />
							</td>
							<td class="hover" onclick="goDetail(${fn:substring(odNo,0,10)},${fn:substring(odNo,10,odNoLength)},${odStateResult})">
								<c:out value="${od.odDate}" />
							</td>
							<td class="hover" onclick="goDetail(${fn:substring(odNo,0,10)},${fn:substring(odNo,10,odNoLength)},${odStateResult})">
								<c:out value="${od.trDate}" />
							</td>
							<td class="hover" onclick="goDetail(${fn:substring(odNo,0,10)},${fn:substring(odNo,10,odNoLength)},${odStateResult})">
								<c:out value="${od.odState}" />
							</td>
						</tr>
						</c:forEach>
					</c:if>
				</table>
			</div>
		</div>
		<div id="pageList">
				<input type="hidden" id="hdThisPage" value="1">
				<c:forEach var="cnt" begin="${startpage}" end="${endpage}">
				<c:if test="${cnt == 1}">
					<span class="page mr6" onclick="goPage(${cnt},0)" style="background-color: #eee">${cnt}</span>
				</c:if>
				<c:if test="${cnt != 1}">
					<span class="page mr6" onclick="goPage(${cnt},0)">${cnt}</span>
				</c:if>
				</c:forEach>
				<c:if test="${endpage < maxPage}">
					<span class="page mr6" onclick="goPage(${endpage}+1,0)">&gt;&gt;</span>
				</c:if>
		</div>
	</main>
	<form id="searchForm">
				<input type="hidden" name="odNo"/>
				<input type="hidden" name="startDt"/>
				<input type="hidden" name="endDt"/>
				<input type="hidden" name="selectOptValOne"/>
				<input type="hidden" name="selectOptValTwo"/>
				<input type="hidden" name="selectOptValThree"/>
				<input type="hidden" name="dtType"/>
				<input type="hidden" name="searchVal"/>
				<input type="hidden" name="page"/>
			<c:if test="${goList == 't'}">
				<input type="hidden" id="returnT" value="t">
				<input type="hidden" id="returnStdt" value="${searchVO.startDt}"/>
				<input type="hidden" id="returnEdDt" value="${searchVO.endDt}"/>
				<input type="hidden" id="returnSptValOne" value="${searchVO.selectOptValOne}"/>
				<input type="hidden" id="returnSptValTwo" value="${searchVO.selectOptValTwo}"/>
				<input type="hidden" id="returndtType" value="${dtType}"/>
				<input type="hidden" id="returnSearchVal" value="${searchVO.searchVal}"/>
				<input type="hidden" id="returnPage" value="${searchVO.page}"/>
			</c:if>
		</form>	
	<footer>
		<c:import url="/footer/footerPage"></c:import>
	</footer>
</body>
</html>