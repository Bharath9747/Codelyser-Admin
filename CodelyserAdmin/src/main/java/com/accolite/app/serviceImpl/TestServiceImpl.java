package com.accolite.app.serviceImpl;

import com.accolite.app.dto.TestDTO;
import com.accolite.app.entity.Question;
import com.accolite.app.entity.Test;
import com.accolite.app.repository.QuestionRepository;
import com.accolite.app.repository.TestRepository;
import com.accolite.app.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TestServiceImpl implements TestService {
    @Autowired
    TestRepository testRepository;
    @Autowired
    QuestionRepository questionRepository;

    @Override
    public String saveTest(TestDTO testDTO) {
        Test test = new Test();
        test.setTitle(testDTO.getTitle());
        test.setTotalScore(testDTO.getTotalScore());
        test.setQuestions(getQuestion(testDTO.getQuestionIds()));
        testRepository.save(test);
        return "Test Saved";
    }

    @Override
    public List<TestDTO> getTest() {

        return convertTestToDTO(testRepository.findAll());
    }

    private List<TestDTO> convertTestToDTO(List<Test> tests) {
        List<TestDTO> testDTO = new ArrayList<>();
        tests.forEach(
                x->{
                    TestDTO dto = new TestDTO();
                    dto.setTitle(x.getTitle());
                    dto.setTotalScore(x.getTotalScore());
                    testDTO.add(dto);
                }
        );
        return testDTO;
    }

    private List<Question> getQuestion(List<Long> questionIds) {
        List<Question> questions=new ArrayList<>();
        for (Long id : questionIds) {
            questions.add(questionRepository.findById(id).get());
        }
        return questions;
    }
}
