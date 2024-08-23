package org.zerock.dao;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.zerock.w1.dao.TodoDAO;
import org.zerock.w1.domain.TodoVO;

import java.util.List;
import java.time.LocalDate;

public class TodoDAOTests {
    private TodoDAO todoDAO;

    @BeforeEach
    public void ready(){
        todoDAO = new TodoDAO();
    }
    @Test
    public void testTime() throws Exception{
        System.out.println(todoDAO.getTime());
    }

    @Test
    public void testInsert() throws Exception{
        TodoVO todoVO = TodoVO.builder()
                .title("Sample Title...")
                .dueDate(LocalDate.of(2024,8,23))
                .finished(true)
                .build();
        todoDAO.insert(todoVO);
    }

    @Test
    public void testList() throws Exception{
        List<TodoVO> list = todoDAO.selectAll();
        list.forEach(vo -> System.out.println(vo));
    }
}
