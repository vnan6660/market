package com.service.questTotalBoard;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.questTotalBoard.NoticeDao;
import com.vo.common.SearchVO;
import com.vo.questTotalBoard.NoticeVO;


/**
 * 공지사항 ServiceImpl
 * 생성자 : 김소연
 * 생성일 : 2021.12.02
 *
 */
@Service
public class NoticeServiceImpl implements NoticeService {
	
	@Autowired
	private NoticeDao noticeDao; 

	/* 공지사항 글 저장*/
	@Override
	public void writeNotice(NoticeVO vo) {
		noticeDao.insertNotice(vo);
	}

	/* 공지사항목록불러오기 */
	@Override
	public List<NoticeVO> getNoticeList(SearchVO vo) {
		return noticeDao.selectNoticeList(vo);
	}

	/* 공시사항디테일불러오기 */
	@Override
	public NoticeVO getNotcieDetail(int ntcNo) {
		return noticeDao.selectNotcieDetail(ntcNo);
	}

	/* 공지사항 글 삭제*/
	@Override
	public void deleteNotice(int ntcNo) {
		noticeDao.deleteNotice(ntcNo);
	}

	/* 공지사항 글 수정*/
	@Override
	public void updateNotice(NoticeVO vo) {
		noticeDao.updateNotice(vo);
	}

	/* 검색글카운트 */
	@Override
	public int getListCount(SearchVO vo) {
		return noticeDao.selectListCount(vo);
	}


}
