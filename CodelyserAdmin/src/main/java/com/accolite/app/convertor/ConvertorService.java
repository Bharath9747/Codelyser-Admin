package com.accolite.app.convertor;

import com.accolite.app.dto.*;
import com.accolite.app.entity.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConvertorService {
    public Question convertQuestiontoEntity(QuestionDTO questionDTO) {
        Question question = new Question();
        question.setTitle(questionDTO.getTitle());
        question.setDescription(questionDTO.getDescription());
        question.setLevel(questionDTO.getLevel());
        question.setScore(questionDTO.getScore());
        return question;
    }

    public List<TestCase> convertTestcasesToEntity(List<TestCaseDTO> testcases, Question question) {
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

    public List<Template> convertTemplatesToEntity(List<TemplateDTO> templates, Question question) {
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

    public QuestionDTO convertQuestionToDTO(Question question) {
        QuestionDTO dto = new QuestionDTO();
        dto.setId(question.getId());
        dto.setDescription(question.getDescription());
        dto.setTitle(question.getTitle());
        dto.setScore(question.getScore());
        dto.setLevel(question.getLevel());
        if (question.getTemplates() != null)
            dto.setTemplates(convertTemplatesToDTOs(question.getTemplates()));
        if (question.getTestCases() != null)
            dto.setTestcases(convertTestCasesToDTOs(question.getTestCases()));
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

    public List<TestDTO> convertTestToDTO(List<Test> tests) {
        List<TestDTO> testDTO = new ArrayList<>();
        tests.forEach(
                x -> {
                    TestDTO dto = new TestDTO();
                    dto.setId(x.getId());
                    dto.setTitle(x.getTitle());
                    dto.setTotalScore(x.getTotalScore());
                    List<QuestionDTO> list = new ArrayList<>();
                    x.getQuestions().forEach(
                            question->{
                                list.add(convertQuestionToDTO(question));
                            }
                    );
                    dto.setQuestions(list);
                    testDTO.add(dto);
                }
        );
        return testDTO;
    }
    public List<Candidate> convertCandidateToEntity(List<CandidateDTO> candidates, Test test) {
        List<Candidate> list = new ArrayList<>();
        candidates.forEach(
                x -> {
                    Candidate candidate = new Candidate();
                    candidate.setName(x.getName());
                    candidate.setEmail(x.getEmail());
                    candidate.setPassword(x.getPassword());
                    candidate.setTest(test);
                    list.add(candidate);
                }
        );
        return list;
    }



    public TestDTO convertTestToDTO(Test test) {

        TestDTO dto = new TestDTO();
        dto.setId(test.getId());
        dto.setTitle(test.getTitle());
        dto.setTotalScore(test.getTotalScore());
        return dto;
    }
}
