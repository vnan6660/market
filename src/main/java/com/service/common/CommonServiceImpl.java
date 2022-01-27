package com.service.common;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.common.CommonDao;
import com.vo.adminGoodsMgt.GoodsListVO;
import com.vo.common.CmmnVO;
import com.vo.common.OrderVO;


/**
 * 공통 ServiceImpl
 * 생성자 : 김소연 
 * 생성일 : 2021.12.17
 */
@Service
public class CommonServiceImpl implements CommonService {

	@Autowired
	private CommonDao commonDao;

	//공통코드 가져오기
	@Override
	public List<CmmnVO> getCmmnCd() {
		return commonDao.selectCmmnCd();
	}

	//금주 주문량,판매금액 불러오기
	@Override
	public List<OrderVO> getThisWeekOrder(ArrayList<String> dateList) {
		List<OrderVO> reList = new ArrayList<OrderVO>();
		for (int i = 0; i < dateList.size(); i++) {
			Map<String,Object> param = new HashMap<String, Object>();
			
			param.put("startDt", dateList.get(i));
			param.put("endDt", dateList.get(i));
			param.put("dateType","week");
			OrderVO odvo = new OrderVO();
			 if("null".equals(String.valueOf(commonDao.selectOrderAmtQty(param)))) {
				 odvo.setTotalAmt(0);
				 odvo.setTotalQty(0);
			 }else{
				 odvo = commonDao.selectOrderAmtQty(param);
			 };
			 
			 odvo.setOdDate(dateList.get(i));
			 odvo.setDateType("week");
			reList.add(i,odvo);
		}
		
		return reList;
	}

	//이번년도 주문량,판매금액 불러오기
	@Override
	public List<OrderVO> getThisYearOrder() {
		LocalDate now = LocalDate.now();
		int thisYear = Integer.parseInt(String.valueOf(now).split("[-]")[0]);
		
		List<OrderVO> reList = new ArrayList<OrderVO>();
		for (int i = 0; i < 12; i++) {
			Map<String,Object> param = new HashMap<String, Object>();
			
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			Calendar startDt = Calendar.getInstance();
			//i월 1일 구하기
			startDt.set(thisYear,i, 1);
			
			Calendar endDt = Calendar.getInstance();
			//i월 말일 구하기
			endDt.set(thisYear,i, startDt.getActualMaximum(Calendar.DAY_OF_MONTH));
			
			param.put("startDt",dateFormat.format(startDt.getTime()));
			param.put("endDt",dateFormat.format(endDt.getTime()));
			param.put("dateType","year");
			
			OrderVO odvo = new OrderVO();
			 if("null".equals(String.valueOf(commonDao.selectOrderAmtQty(param)))) {
				 odvo.setTotalAmt(0);
				 odvo.setTotalQty(0);
			 }else{
				 odvo = commonDao.selectOrderAmtQty(param);
			 };
			 
			 odvo.setOdMonth((i+1)+"월");
			 odvo.setDateType("year");
			reList.add(i,odvo);
		}
		return reList;
	}

	//베스트 셀러 불러오기
	@Override
	public List<GoodsListVO> getBestSeller() {
		return commonDao.selectBestSeller();
	}

}
