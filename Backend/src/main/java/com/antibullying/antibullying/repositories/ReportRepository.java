package com.antibullying.antibullying.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.antibullying.antibullying.beans.Report;


public interface ReportRepository extends JpaRepository<Report,Integer> {

}
