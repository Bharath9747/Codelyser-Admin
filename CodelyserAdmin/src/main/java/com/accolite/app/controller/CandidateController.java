package com.accolite.app.controller;

import com.accolite.app.dto.CandidateDTO;
import com.accolite.app.dto.QuestionDTO;
import com.accolite.app.entity.Candidate;
import com.accolite.app.service.CandidateService;
import com.accolite.app.service.QuestionService;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/candidate")
@CrossOrigin("http://localhost:4200")
public class CandidateController {
    @Autowired
    CandidateService candidateService;
    @PostMapping("/upload")
    public List<CandidateDTO> uploadData(@RequestParam("file") MultipartFile file){
        return candidateService.uploadData(file);


    }
}
