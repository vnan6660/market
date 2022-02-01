<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>관리자메인</title>
<script src="webjars/jquery/3.4.1/jquery.js"></script>
<link rel="stylesheet" href="/css/common/adminMain.css">
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/common/adminMain.js"></script>
</head>
<body>
	<c:import url="/sideMenu/sideMenuPage"></c:import>
	<main id="contentsMain" style="height: 600px;">
		<div class="adminQuickWrap">
			<div id="noticeQuickMenu" style="border: 1px solid #ccc; height: 100%;">
				<div class="quickMenuTitle">
					<h3>공지사항</h3>
					<h3 class="hover" onclick="plusBtn('notice')">+</h3>
				</div>
				<div>
					<form id="noticeSearchForm">
						<input type="hidden" name="ntcNo" /> 
						<input type="hidden" name="selectOptValOne" /> <input type="hidden" name="page" />
					</form>
					<!-- 공지사항 최근 5개 불러올것 -->
					<table id="ntcMainTable" style="width: 100%; table-layout: fixed; border-collapse: collapse;">
					</table>
				</div>
			</div>
			<!-- <div id="fnaQuickMenu"
				style="margin-top: 50px; border: 1px solid #ccc; height: 50%;">
				<div class="quickMenuTitle">
					<h3>질의응답</h3>
					<h3 class="hover" onclick="plusBtn('fna')">+</h3>
				</div>
				<div>
					<form id="fnaSearchForm"></form>
					질의응답 최근 5개 불러올것
					<table id="fnaMainTable" style="width: 100%; table-layout: fixed">
					</table>
				</div>
			</div> -->
		</div>
		<div class="adminQuickWrap">
			<div id="orderMgtQuickMenu" style="border: 1px solid #ccc; height: 100%;">
				<div class="quickMenuTitle">
					<h3>주문목록</h3>
					<h3 class="hover" onclick="plusBtn('orderMgt')">+</h3>
				</div>
				<div>
					<form id="orderMgtSearchForm"></form>
					<!-- 주문관리 불러올것 -->
					<div class="tab">
						<ul class="tabnav">
							<li><a href="#tab1" class="active hover">주문완료</a></li>
							<li><a href="#tab2" class="hover">배송중</a></li>
							<li><a href="#tab3" class="hover">배송완료</a></li>
						</ul>
						<div class="tabcontent">
							<div id="tab1">
							<!-- 주문완료 탭내용  -->
							<table style="width: 97%; table-layout: fixed; border-collapse: collapse;">
							</table>
							</div>
							<div id="tab2">
							<!-- 배송중 탭내용  -->
							<table style="width: 97%; table-layout: fixed; border-collapse: collapse;">
							</table>
							</div>
							<div id="tab3">
							<!-- 배송완료 탭내용  -->
							<table style="width: 97%; table-layout: fixed; border-collapse: collapse;">
							</table>
							</div>
							<form id="odSearchForm">
								<input type="hidden" name="odNo" /> 
								<input type="hidden" name="startDt" /> 
								<input type="hidden" name="endDt" /> 
								<input type="hidden" name="selectOptValOne" />
								<input type="hidden" name="selectOptValTwo" />
								<input type="hidden" name="selectOptValThree" />
								<input type="hidden" name="dtType" />
								<input type="hidden" name="page" />
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="adminQuickWrap">
			<div>
				<span class="thirdSessionOrderAmt">금주 주문량</span>
				<div class="thirdSessionColor">
				<table id="weekOrderAmt" style="table-layout: fixed">
					<colgroup>
						<col width="17%">
						<col width="17%">
						<col width="17%">
						<col width="17%">
						<col width="17%">
						<col width="17%">
						<col width="17%">
					</colgroup>
					<tr>
						<td class="boldFont">월</td>
						<td class="boldFont">화</td>
						<td class="boldFont">수</td>
						<td class="boldFont">목</td>
						<td class="boldFont">금</td>
						<td class="boldFont">토</td>
						<td class="boldFont">일</td>
					</tr>
					<tr id="weekQty">
					</tr>
				</table>
				</div>
			</div>
			<div>
				<span class="thirdSessionMoneyAmt">금주 판매금액</span>
				<div class="thirdSessionColor">
				<table id="weekMoneyAmt" style="table-layout: fixed">
					<colgroup>
						<col width="80px;">
						<col width="80px;">
						<col width="80px;">
						<col width="80px;">
					</colgroup>
					<tr>
						<td class="boldFont">월</td>
						<td class="boldFont">화</td>
						<td class="boldFont">수</td>
						<td class="boldFont">목</td>
					</tr>
					<tr id="weekAmt4">
					</tr>
					<tr>
						<td class="boldFont">금</td>
						<td class="boldFont">토</td>
						<td class="boldFont" colspan="1">일</td>
					
					</tr>
					<tr id="weekAmt3">
					</tr>
				</table>
				</div>
			</div>
			<div>
				<span class="thirdSessionOrderAmt">월 주문량</span>
				<div class="thirdSessionColor">
				<table id="yearOrderAmt" style="table-layout: fixed">
					<colgroup>
						<col width="80px;">
						<col width="80px;">
						<col width="80px;">
						<col width="80px;">
					</colgroup>
					<tr>
						<td class="boldFont">1월</td>
						<td class="boldFont">2월</td>
						<td class="boldFont">3월</td>
						<td class="boldFont">4월</td>
					</tr>
					<tr id="yearQty4">
					</tr>
					<tr>
						<td class="boldFont">5월</td>
						<td class="boldFont">6월</td>
						<td class="boldFont">7월</td>
						<td class="boldFont">8월</td>
					</tr>
					<tr id="yearQty8">
					</tr>
					<tr>
						<td class="boldFont">9월</td>
						<td class="boldFont">10월</td>
						<td class="boldFont">11월</td>
						<td class="boldFont">12월</td>
					</tr>
					<tr id="yearQty12">
					</tr>
				</table>
				</div>
			</div>
			<div>
				<span class="thirdSessionMoneyAmt">월 판매금액</span>
				<div class="thirdSessionColor">
				<table id="yearMoneyAmt" style="table-layout: fixed">
					<colgroup>
						<col width="100px;">
						<col width="85px;">
						<col width="85px;">
						<col width="85px;">
					</colgroup>
					<tr>
						<td class="boldFont">1월</td>
						<td class="boldFont">2월</td>
						<td class="boldFont">3월</td>
						<td class="boldFont">4월</td>
					</tr>
					<tr id="yearAmt4">
					</tr>
					<tr>
						<td class="boldFont">5월</td>
						<td class="boldFont">6월</td>
						<td class="boldFont">7월</td>
						<td class="boldFont">8월</td>
					</tr>
					<tr id="yearAmt8">
					</tr>
					<tr>
						<td class="boldFont">9월</td>
						<td class="boldFont">10월</td>
						<td class="boldFont">11월</td>
						<td class="boldFont">12월</td>
					</tr>
					<tr id="yearAmt12">
					</tr>
				</table>
				</div>
			</div>
		</div>
	</main>
	<footer>
		<c:import url="/footer/footerPage"></c:import>
	</footer>
</body>

</html>