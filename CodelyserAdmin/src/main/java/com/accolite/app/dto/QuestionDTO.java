package com.accolite.app.dto;

import lombok.*;

import java.util.List;

@Data
public class QuestionDTO {
    private Long id;
    private String title;
    private String description;
    private String level;
    private String type;
    private Integer score;
    private List<TemplateDTO> templates;
    private List<TestCaseDTO> testcases;
}