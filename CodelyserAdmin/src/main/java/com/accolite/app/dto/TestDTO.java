package com.accolite.app.dto;

import lombok.Data;

import java.util.List;

@Data
public class TestDTO {
    private Long id;
    private String title;
    private Integer totalScore;
    private List<Long> questionIds;
    private List<CandidateDTO> candidates;
}
