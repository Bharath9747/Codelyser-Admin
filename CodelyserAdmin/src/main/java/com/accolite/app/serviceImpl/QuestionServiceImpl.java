package com.accolite.app.serviceImpl;

import com.accolite.app.dto.QuestionDTO;
import com.accolite.app.entity.Question;
import com.accolite.app.repository.QuestionRepository;
import com.accolite.app.service.QuestionService;
import com.accolite.app.convertor.ConvertorService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
        if (questionDTO.getId() == null) {
            questionRepository.save(service.convertQuestiontoEntity(questionDTO));
        } else {
            Question question = questionRepository.findById(questionDTO.getId()).get();
            if (questionDTO.getTemplates() != null)
                question.setTemplates(service.convertTemplatesToEntity(questionDTO.getTemplates(), question));
            if (questionDTO.getTestcases() != null)
                question.setTestCases(service.convertTestcasesToEntity(questionDTO.getTestcases(), question));
            questionRepository.save(question);
        }
        return "Question Saved";
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
