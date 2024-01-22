package com.accolite.app.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TestResultDTO {
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer score;
    private Integer status;
}
