package com.antibullying.antibullying.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.antibullying.antibullying.BL.UserBL;

@RequestMapping("User")
@RestController
public class UserController {
	@Autowired
	UserBL userBL;
	
	@PostMapping("addUser")
	public boolean addUser(String email,String name,String phoneNumber)  {
		return userBL.addUser(email, name, phoneNumber);
	}
}
