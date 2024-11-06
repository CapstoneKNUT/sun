package org.zerock.b01.service;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import org.zerock.b01.domain.Board;
import org.zerock.b01.dto.BoardDTO;
import org.zerock.b01.repository.BoardRepository;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@Log4j2
class BoardServiceImplTest {

    @Autowired
    private BoardService boardService;

    @Autowired
    private BoardRepository boardRepository;

    @BeforeEach
    public void setup() {
        // 테스트에 필요한 초기 데이터 세팅이 있다면 여기에 추가
        // 예: memberRepository.save(new Member(...));
    }

    // 게시물 삽입 테스트
    @Test
    @Transactional // 트랜잭션을 사용하여 테스트 후 데이터 정리
    public void testRegister() {
        // Given: BoardDTO 객체 생성
        BoardDTO boardDTO = BoardDTO.builder()
                .title("Test Title")
                .content("Test Content")
                .writer("Test Writer")
                .build();

        // When: boardService의 register 메서드를 호출하여 게시물 등록
        Long bno = boardService.register(boardDTO);

        // Then: 게시물 번호(bno)가 null이 아닌지 확인
        assertNotNull(bno, "게시물 번호가 null이 아닙니다.");

        // 저장된 Board 객체를 확인
        Board result = boardRepository.findById(bno).orElse(null);
        assertNotNull(result, "저장된 게시물이 null이 아닙니다.");
        assertEquals("Test Title", result.getTitle(), "제목이 예상과 일치하지 않습니다.");
        assertEquals("Test Content", result.getContent(), "내용이 예상과 일치하지 않습니다.");
        assertEquals("Test Writer", result.getWriter(), "작성자가 예상과 일치하지 않습니다.");

        log.info("Saved Board BNO: " + result.getBno());
    }
}
