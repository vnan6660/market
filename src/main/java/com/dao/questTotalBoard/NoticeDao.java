package com.dao.questTotalBoard;

import java.util.List;

import com.vo.questTotalBoard.NoticeVO;
import com.vo.questTotalBoard.SearchVO;


/**
 * 공지사항 Dao
 * 생성자 : 김소연
 * 생성일 : 2021.12.02
 *
 */
public interface NoticeDao {
	
	/* 공지사항 글 저장*/
	void insertNotice(NoticeVO vo);

	/* 공지사항목록불러오기 */
	List<NoticeVO> selectNoticeList(SearchVO vo);

	/* 공시사항디테일불러오기 */
	NoticeVO selectNotcieDetail(int ntcNo);

	/* 공지사항 글 삭제*/
	void deleteNotice(int ntcNo);

	/* 공지사항 글 수정*/
	void updateNotice(NoticeVO vo);


}
