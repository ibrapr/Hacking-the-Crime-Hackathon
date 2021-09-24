package com.antibullying.antibullying.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.antibullying.antibullying.BL.ReportBL;
import com.antibullying.antibullying.beans.Report;
import com.antibullying.antibullying.repositories.ReportRepository;
@RestController
@RequestMapping("Report")
@CrossOrigin
public class ReportController {
	@Autowired
	ReportBL reportBL;
	
	@PostMapping("addReport")
	public boolean addReport(String phone,String subject, String content, boolean status) {
		return reportBL.addReport(phone, subject, content, status);
	}
	@PutMapping("updateStatus")
	public boolean updateStatus(Integer id,boolean status) {
		return reportBL.updateStatus(id,status);
	}
	@PutMapping("updateExplaination")
	public boolean updateExplaination(Integer id,String explanation) {
		return reportBL.updateExplaination(id,explanation);
	}
	@GetMapping("getAll")
	public List<Report> getAll(){
		return reportBL.getAll();
	}
}
