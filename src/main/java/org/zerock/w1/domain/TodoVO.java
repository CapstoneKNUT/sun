//실제 SQL처리를 전담하는 TodoDAO. TodoService와 연동되어 사용.
package org.zerock.w1.domain;

import lombok.Builder; // 객체 생성 시에 빌더 패턴 사용하기 위해 추가.
import lombok.Getter; // VO는 주로 읽기 전용으로 사용하니까 Getter 추가함.
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Builder
@ToString
public class TodoVO {
    private Long tno;

    private String title;

    private LocalDate dueDate;

    private boolean finished;
}
