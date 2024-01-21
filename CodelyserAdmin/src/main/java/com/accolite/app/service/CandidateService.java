package com.accolite.app.service;

import com.accolite.app.dto.CandidateDTO;
import com.accolite.app.dto.TestDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CandidateService {
    List<CandidateDTO> uploadData(MultipartFile file);

    String assignTest(TestDTO testDTO);

    List<CandidateDTO> getCandidates();
}
