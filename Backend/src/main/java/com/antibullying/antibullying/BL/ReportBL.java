package com.antibullying.antibullying.BL;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.antibullying.antibullying.beans.Report;
import com.antibullying.antibullying.beans.Student;
import com.antibullying.antibullying.repositories.ReportRepository;
import com.antibullying.antibullying.repositories.StudentRepository;
@Service
public class ReportBL {
	@Autowired
	ReportRepository reportRepo;
	@Autowired
	StudentRepository studentRepo;
	public List<Report> getAll(){
		return reportRepo.findAll();
	}
	public boolean addReport(String phone,String subject, String content, boolean status) {
		Student student = studentRepo.findByPhone(phone);
		if(student==null) {
			System.out.println("here");
			student = new Student();
			student.setPhone(phone);
		}
		Report report = new Report();
		report.setContent(content);
		report.setStatus(false);
		report.setSubject(subject);
		report.setExplanation("");
		reportRepo.save(report);
		studentRepo.save(student);
		student.addReport(report);
		studentRepo.save(student);
		return true;
	}
	public boolean updateStatus(Integer id,boolean status) {
		Report report = reportRepo.getById(id);
		if(report == null) {
			return false;
		}
		report.setStatus(status);
		reportRepo.save(report);
		return true;
	}
	
}	
