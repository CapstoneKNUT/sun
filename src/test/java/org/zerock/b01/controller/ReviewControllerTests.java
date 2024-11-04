package org.zerock.b01.controller;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.zerock.b01.domain.Review;

import java.util.ArrayList;
import java.util.List;

@Log4j2
public class ReviewControllerTests {

    // 테스트 데이터 저장을 위한 리스트
    private List<Review> reviewRepository = new ArrayList<>();


    @Test
    public void testSelectAll() {
        // 모든 리뷰를 조회
        List<Review> reviews = reviewRepository;

        // 각 리뷰를 로그에 출력
        for (Review review : reviews) {
            log.info(review);
        }
    }
}
