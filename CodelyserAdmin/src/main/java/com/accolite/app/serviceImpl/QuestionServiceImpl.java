package com.accolite.app.serviceImpl;

import com.accolite.app.convertor.ConvertorService;
import com.accolite.app.dto.QuestionDTO;
import com.accolite.app.entity.Question;
import com.accolite.app.exception.ApiRequestException;
import com.accolite.app.repository.QuestionRepository;
import com.accolite.app.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {
    private final ConvertorService service;
    @Autowired
    QuestionRepository questionRepository;

    @Override
    public String saveQuestion(QuestionDTO questionDTO) {
        try {
            if (questionDTO.getId() == null) {
                Question question=questionRepository.save(service.convertQuestiontoEntity(questionDTO));
                if (questionDTO.getTemplates() != null)
                    question.setTemplates(service.convertTemplatesToEntity(questionDTO.getTemplates(), question));
                questionRepository.save(question);
            } else {
                Question question = questionRepository.findById(questionDTO.getId()).get();
                if (questionDTO.getTestcases() != null)
                    question.setTestCases(service.convertTestcasesToEntity(questionDTO.getTestcases(), question));
                questionRepository.save(question);
            }
            return "Question Saved";
        } catch (DataIntegrityViolationException e) {
            throw new ApiRequestException("Duplicate Question", HttpStatus.BAD_REQUEST);
        }

    }

    @Override
    public List<QuestionDTO> getQuestions() {
        List<Question> questions = questionRepository.findAll();
        List<QuestionDTO> list = new ArrayList<>();
        questions.forEach(
                (x) -> {
                    list.add(service.convertQuestionToDTO(x));
                }
        );
        return list;
    }

}
