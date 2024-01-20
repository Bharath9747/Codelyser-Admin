package com.accolite.app.serviceImpl;

import com.accolite.app.dto.QuestionDTO;
import com.accolite.app.dto.TemplateDTO;
import com.accolite.app.dto.TestCaseDTO;
import com.accolite.app.entity.Question;
import com.accolite.app.entity.Template;
import com.accolite.app.entity.TestCase;
import com.accolite.app.repository.QuestionRepository;
import com.accolite.app.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {
    @Autowired
    QuestionRepository questionRepository;

    @Override
    public String saveQuestion(QuestionDTO questionDTO) {
        if (questionDTO.getId() == null) {
            Question question = new Question();
            question.setTitle(questionDTO.getTitle());
            question.setDescription(questionDTO.getDescription());
            question.setLevel(questionDTO.getLevel());
            question.setScore(questionDTO.getScore());
            questionRepository.save(question);
        } else {
            Question question = questionRepository.findById(questionDTO.getId()).get();
            if (questionDTO.getTemplates() != null)
                question.setTemplates(convertTemplatesToEntity(questionDTO.getTemplates(), question));
            if (questionDTO.getTestcases() != null)
                question.setTestCases(convertTestcasesToEntity(questionDTO.getTestcases(), question));
            questionRepository.save(question);
        }
        return "Question Saved";
    }

    private List<TestCase> convertTestcasesToEntity(List<TestCaseDTO> testcases,Question question) {
        return testcases.stream()
                .map(dto -> {
                    TestCase testCase = new TestCase();
                    testCase.setInput(dto.getInput());
                    testCase.setOutput(dto.getOutput());
                    testCase.setQuestion(question);
                    return testCase;
                })
                .collect(Collectors.toList());
    }

    private List<Template> convertTemplatesToEntity(List<TemplateDTO> templates, Question question) {
        return templates.stream()
                .map(dto -> {
                    Template template = new Template();
                    template.setCode(dto.getCode());
                    template.setLanguage(dto.getLanguage());
                    template.setQuestion(question);
                    return template;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<QuestionDTO> getQuestions() {
        List<Question> questions = questionRepository.findAll();
        List<QuestionDTO> list = new ArrayList<>();
        questions.forEach(
                (x) -> {
                    list.add(convertEntityToDTO(x));
                }
        );
        return list;
    }

    private QuestionDTO convertEntityToDTO(Question x) {
        QuestionDTO dto = new QuestionDTO();
        dto.setId(x.getId());
        dto.setDescription(x.getDescription());
        dto.setTitle(x.getTitle());
        if (x.getTemplates() != null)
            dto.setTemplates(convertTemplatesToDTOs(x.getTemplates()));
        if (x.getTestCases() != null)
            dto.setTestcases(convertTestCasesToDTOs(x.getTestCases()));
        return dto;
    }

    private List<TemplateDTO> convertTemplatesToDTOs(List<Template> templates) {
        return templates.stream()
                .map(template -> {
                    TemplateDTO templateDTO = new TemplateDTO();
                    templateDTO.setCode(template.getCode());
                    templateDTO.setLanguage(template.getLanguage());
                    return templateDTO;
                })
                .collect(Collectors.toList());
    }

    private List<TestCaseDTO> convertTestCasesToDTOs(List<TestCase> testCases) {
        return testCases.stream()
                .map(testCase -> {
                    TestCaseDTO testCaseDTO = new TestCaseDTO();
                    testCaseDTO.setInput(testCase.getInput());
                    testCaseDTO.setOutput(testCase.getOutput());
                    return testCaseDTO;
                })
                .collect(Collectors.toList());
    }
}
