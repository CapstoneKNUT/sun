package org.zerock.b01.service;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.zerock.b01.domain.Board;
import org.zerock.b01.dto.BoardDTO;
import org.zerock.b01.dto.PageRequestDTO;
import org.zerock.b01.dto.PageResponseDTO;
import org.zerock.b01.dto.PlaceDTO;
import static org.junit.jupiter.api.Assertions.*;


import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@Log4j2
class BoardServiceImplTest2 {

    @Autowired
    private BoardService boardService; // BoardService 인스턴스를 주입받음


    // board 테이블에 데이터 넣기
    @Test
    void register() {
        // Given: 게시물 DTO를 생성
        BoardDTO boardDTO = BoardDTO.builder()
                .title("let's go")
                .content("요즘 날씨 참 춥죠? 저도 그렇게 생각해요.")
                .writer("힝힝구")
                .build();

        // When: 게시물 등록 메서드를 호출
        Long result = boardService.register(boardDTO); // BoardService 인스턴스를 통해 호출

        // Then: 결과가 null이 아님을 확인
        assertNotNull(result, "게시물이 정상적으로 등록되었습니다.");
        log.info("등록된 게시물 번호: " + result); // 등록된 게시물 번호를 로그로 출력
    }

    // 리뷰 보기
    @Test
    void readOne() {
        Long bno = 4L;

        // 주입된 boardService 인스턴스를 사용
        BoardDTO boardDTO = boardService.readOne(bno);

        log.info(boardDTO);
    }

    // 리뷰 리스트
    @Test
    void testList() {
        // Given
        PageRequestDTO pageRequestDTO = new PageRequestDTO();
        pageRequestDTO.setPage(1); // 첫 번째 페이지
        pageRequestDTO.setSize(10); // 페이지당 10개의 게시물

        // When
        PageResponseDTO<BoardDTO> responseDTO = boardService.list(pageRequestDTO);

        // Then
        assertNotNull(responseDTO); // responseDTO가 null이 아닌지 확인
        assertEquals(10, responseDTO.getSize()); // 요청한 페이지당 개수 10개 확인
        assertTrue(responseDTO.getTotal() >= 3); // 총 개수가 3개 이상이어야 함
        List<BoardDTO> dtoList = responseDTO.getDtoList();
        assertEquals(3, dtoList.size()); // 실제 데이터 개수에 맞게 수정
    }

    // 리뷰 삭제
    @Test
    void remove() {
        Long bno = 2L;
        boardService.remove(bno);
    }


}
