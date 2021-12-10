package com.dao.questTotalBoard;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vo.common.SearchVO;
import com.vo.questTotalBoard.NoticeVO;

/**
 * 공지사항 DaoImpl
 * 생성자 : 김소연
 * 생성일 : 2021.12.02
 *
 */
@Repository
public class NoticeDaoImpl implements NoticeDao {
	
	@Autowired
	SqlSession sqlSession; 

	/* 공지사항 글 저장*/
	@Override
	public void insertNotice(NoticeVO vo) {
		sqlSession.insert("insertNotice", vo);
	}

	/* 공지사항목록불러오기 */
	@Override
	public List<NoticeVO> selectNoticeList(SearchVO vo) {
		return sqlSession.selectList("selectNoticeList",vo);
	}

	/* 공지사항 디테일페이지가기전 조회수 증가 */
	@Override
	public void updateVcnt(int ntcNo) {
		sqlSession.update("updateVcnt", ntcNo);
		
	}
	
	/* 공시사항디테일불러오기 */
	@Override
	public NoticeVO selectNotcieDetail(int ntcNo) {
		return sqlSession.selectOne("selectNotcieDetail",ntcNo);
	}

	/* 공지사항 글 삭제*/
	@Override
	public void deleteNotice(int ntcNo) {
		sqlSession.delete("deleteNotice", ntcNo);
	}

	/* 공지사항 글 수정*/
	@Override
	public void updateNotice(NoticeVO vo) {
		sqlSession.update("updateNotice", vo);
	}
	
	/* 검색글카운트 */
	@Override
	public int selectListCount(SearchVO vo) {
		return sqlSession.selectOne("selectListCount", vo);
	}

}
