package com.antibullying.antibullying.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.antibullying.antibullying.BL.ReportBL;
@RestController
@RequestMapping("Report")
public class ReportController {
	@Autowired
	ReportBL reportBL;
	
	@PostMapping("addReport")
	public boolean addReport(String subject, String content, boolean status) {
		return true;
	}
	@PutMapping("updateStatus")
	public boolean updateStatus(boolean status) {
		return true;
	}
	
}
