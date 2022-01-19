package com.dao.questTotalBoard;

import java.util.List;

import com.vo.common.SearchVO;
import com.vo.questTotalBoard.NoticeVO;


/**
 * 공지사항 Dao
 * 생성자 : 김소연
 * 생성일 : 2021.12.02
 *
 */
public interface NoticeDao {
	
	//공지사항 글 저장
	void insertNotice(NoticeVO vo);

	//공지사항목록불러오기
	List<NoticeVO> selectNoticeList(SearchVO vo);

	//공지사항 디테일페이지가기전 조회수 증가
	void updateVcnt(int ntcNo);
	
	//공시사항디테일불러오기
	NoticeVO selectNotcieDetail(int ntcNo);

	//공지사항 글 삭제
	void deleteNotice(int ntcNo);

	//공지사항 글 수정
	void updateNotice(NoticeVO vo);

	//검색글카운트
	int selectListCount(SearchVO vo);

	


}
