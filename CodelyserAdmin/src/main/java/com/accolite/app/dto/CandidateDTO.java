package com.accolite.app.dto;

import lombok.Data;

@Data
public class CandidateDTO {
    private Long id;
    private String name;
    private String password;
    private String email;
    private TestDTO test;
    private TestResultDTO testResult;
}
