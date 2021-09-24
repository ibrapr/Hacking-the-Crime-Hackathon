package com.antibullying.antibullying.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.antibullying.antibullying.BL.UserBL;
import com.antibullying.antibullying.beans.User;

@RequestMapping("User")
@RestController
public class UserController {
	@Autowired
	UserBL userBL;
	
	@PostMapping("addUser")
	public boolean addUser(String email,String name,String phoneNumber, int password)  {
		return userBL.addUser(email, name, phoneNumber,password);
	}
	
	@GetMapping("validate")
	public User validate(String email, int password) {
		return userBL.validate(email, password);
	}
}
