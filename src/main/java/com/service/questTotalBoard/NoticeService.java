package com.service.questTotalBoard;

import java.util.List;

import com.vo.questTotalBoard.NoticeVO;
import com.vo.questTotalBoard.SearchVO;

/**
 * 공지사항 Service
 * 생성자 : 김소연
 * 생성일 : 2021.12.02
 *
 */
public interface NoticeService {
	
	/* 공지사항 글 저장*/
	void writeNotice(NoticeVO vo);

	/* 공지사항목록불러오기 */
	List<NoticeVO> getNoticeList(SearchVO vo);

	/* 공시사항디테일불러오기 */
	NoticeVO getNotcieDetail(int ntcNo);

	/* 공지사항 글 삭제*/
	void deleteNotice(int ntcNo);

	/* 공지사항 글 수정*/
	void updateNotice(NoticeVO vo);

}
