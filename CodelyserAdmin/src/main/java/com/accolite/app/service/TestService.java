package com.accolite.app.service;

import com.accolite.app.dto.TestDTO;

import java.util.List;

public interface TestService {
    String saveTest(TestDTO testDTO);

    List<TestDTO> getTest();
}
