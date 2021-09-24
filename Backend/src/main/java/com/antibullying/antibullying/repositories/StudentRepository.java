package com.antibullying.antibullying.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.antibullying.antibullying.beans.Student;

public interface StudentRepository extends JpaRepository<Student,Integer>{
	public Student findByPhone(String phone);
}
