package com.accolite.app.serviceImpl;

import com.accolite.app.convertor.ConvertorService;
import com.accolite.app.dto.TestDTO;
import com.accolite.app.entity.Question;
import com.accolite.app.entity.Test;
import com.accolite.app.exception.ApiRequestException;
import com.accolite.app.repository.QuestionRepository;
import com.accolite.app.repository.TestRepository;
import com.accolite.app.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TestServiceImpl implements TestService {
    @Autowired
    TestRepository testRepository;
    @Autowired
    QuestionRepository questionRepository;

    private final ConvertorService service;

    @Override
    public String saveTest(TestDTO testDTO) {
        try {
            Test test = new Test();
            test.setTitle(testDTO.getTitle());
            test.setTotalScore(testDTO.getTotalScore());
            List<Question> questions = new ArrayList<>();
            testDTO.getQuestions().forEach(
                    x -> {
                        questions.add(questionRepository.findById(x.getId()).get());
                    }
            );
            test.setQuestions(questions);
            testRepository.save(test);
            return "Test Saved";
        } catch (DataIntegrityViolationException e) {
            throw new ApiRequestException("Duplicate Test", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public List<TestDTO> getTest() {
        return service.convertTestToDTO(testRepository.findAll());
    }


}
