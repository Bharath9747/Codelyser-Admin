package com.accolite.app.serviceImpl;

import com.accolite.app.convertor.ConvertorService;
import com.accolite.app.dto.CandidateDTO;
import com.accolite.app.dto.TestDTO;
import com.accolite.app.dto.TestResultDTO;
import com.accolite.app.entity.Candidate;
import com.accolite.app.entity.Test;
import com.accolite.app.entity.TestResult;
import com.accolite.app.exception.ApiRequestException;
import com.accolite.app.repository.CandidateRepository;
import com.accolite.app.repository.TestRepository;
import com.accolite.app.repository.TestResultRepository;
import com.accolite.app.service.CandidateService;
import com.accolite.app.util.UtilityService;
import lombok.RequiredArgsConstructor;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CandidateServiceImpl implements CandidateService {

    @Autowired
    TestRepository testRepository;
    @Autowired
    CandidateRepository candidateRepository;
    @Autowired
    TestResultRepository testResultRepository;

    private final ConvertorService service;

    private final UtilityService utilityService;

    @Override
    public List<CandidateDTO> uploadData(MultipartFile file) {
        if (file.isEmpty()) {
            throw  new ApiRequestException("File is Empty",HttpStatus.BAD_REQUEST);
        }
        try
        {
            Workbook workbook = new XSSFWorkbook(file.getInputStream());
            List<CandidateDTO> list = new ArrayList<>();
            Sheet sheet = workbook.getSheetAt(0);
            int rowCount = sheet.getPhysicalNumberOfRows();
            for (int i = 1; i < rowCount; i++) {
                Row row = sheet.getRow(i);
                CandidateDTO candidateDTO = new CandidateDTO();
                candidateDTO.setName(row.getCell(0).toString());
                candidateDTO.setEmail(row.getCell(1).toString());
                candidateDTO.setPassword(utilityService.hashPassword(row.getCell(2).toString()));
                list.add(candidateDTO);
            }
            return list;
        } catch (IOException e) {
            throw  new ApiRequestException("File Not Found",HttpStatus.NOT_FOUND);
        }


    }

    @Override
    public String assignTest(TestDTO testDTO) {
        try {
            Test test = testRepository.findById(testDTO.getId()).get();
            List<Candidate> candidates = test.getCandidate();
            if (candidates == null)
                test.setCandidate(service.convertCandidateToEntity(testDTO.getCandidates(), test));
            else {
                candidates.addAll(service.convertCandidateToEntity(testDTO.getCandidates(), test));
                test.setCandidate(candidates);
            }
            testRepository.save(test);
            return "Test Assigned";
        }
        catch (DataIntegrityViolationException e)
        {
            throw new ApiRequestException("Duplicate Candidate", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public List<CandidateDTO> getCandidates() {
        List<Candidate> list = candidateRepository.findAll();
        List<CandidateDTO> candidates = new ArrayList<>();
        list.forEach(
                x -> {
                    CandidateDTO dto = new CandidateDTO();
                    dto.setName(x.getName());
                    dto.setEmail(x.getEmail());
                    dto.setTest(service.convertTestToDTO(x.getTest()));
                    TestResult testResult = testResultRepository.findById(x.getId()).orElse(null);
                    if(testResult!=null)
                    {
                        TestResultDTO testResultDTO = new TestResultDTO();
                        testResultDTO.setStatus(testResult.getStatus());
                        testResultDTO.setScore(testResult.getScore());
                        dto.setTestResult(testResultDTO);
                    }
                    candidates.add(dto);
                }
        );
        return candidates;
    }



}
