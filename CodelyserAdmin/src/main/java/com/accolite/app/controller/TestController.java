package com.accolite.app.controller;

import com.accolite.app.dto.TestDTO;
import com.accolite.app.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/test")
@CrossOrigin("http://localhost:4200")

public class TestController {
    @Autowired
    TestService testService;

    @PostMapping("/save")
    public ResponseEntity<Map<String, String>> saveQuestion(@RequestBody TestDTO testDTO) {
        String res = testService.saveTest(testDTO);
        Map<String, String> response = new HashMap<>();
        response.put("result", res);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public List<TestDTO> getTest() {
        return testService.getTest();
    }
}
