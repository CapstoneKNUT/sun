package org.zerock.b01.service;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.zerock.b01.domain.Member;
import org.zerock.b01.domain.Review;
import org.zerock.b01.dto.PageRequestDTO;
import org.zerock.b01.dto.PageResponseDTO;
import org.zerock.b01.dto.ReviewDTO;
import org.zerock.b01.repository.MemberRepository;
import org.zerock.b01.repository.ReviewRepository;

import java.util.List;
import java.util.Optional;

import static org.codehaus.groovy.runtime.DefaultGroovyMethods.any;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@SpringBootTest
@Log4j2
class ReviewServiceImplTest {

    @Autowired
    private ReviewService reviewService;
    private MemberRepository memberRepository;
    private ReviewRepository reviewRepository;

    //place의 pord째 데이터 mid값과 함께 store에 저장
    @Test
    void registerReview() {
        // 테스트용 ReviewDTO 객체 생성
        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setContent("Test review content");
        reviewDTO.setWriter("user1");

        // 메서드 호출 및 결과 검증
        Long result = reviewService.registerReview(reviewDTO);
        assertNotNull(result);  // 결과가 null이 아닌지 확인
    }


}