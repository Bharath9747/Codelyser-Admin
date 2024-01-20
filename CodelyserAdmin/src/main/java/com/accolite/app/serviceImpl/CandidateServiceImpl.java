package com.accolite.app.serviceImpl;

import com.accolite.app.dto.CandidateDTO;
import com.accolite.app.service.CandidateService;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

@Service
public class CandidateServiceImpl implements CandidateService {


    @Override
    public List<CandidateDTO> uploadData(MultipartFile file) {
        if (file.isEmpty()) {
            return null;
        }
        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            List<CandidateDTO> list = new ArrayList<>();
            Sheet sheet = workbook.getSheetAt(0);

            int rowCount = sheet.getPhysicalNumberOfRows();
            for (int i = 1; i < rowCount; i++) {
                Row row = sheet.getRow(i);
                CandidateDTO candidateDTO = new CandidateDTO();
                candidateDTO.setName(row.getCell(0).toString());
                candidateDTO.setEmail(row.getCell(1).toString());
                candidateDTO.setPassword(hashPassword(row.getCell(2).toString()));
                list.add(candidateDTO);
            }
            return list;
        } catch (IOException e) {

            return null;
        }

    }
    public static String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");

            byte[] passwordBytes = password.getBytes();

            byte[] hashedBytes = digest.digest(passwordBytes);

            StringBuilder hexStringBuilder = new StringBuilder();
            for (byte b : hashedBytes) {
                hexStringBuilder.append(String.format("%02x", b));
            }

            return hexStringBuilder.toString();
        } catch (NoSuchAlgorithmException e) {

            return null;
        }
    }

}
