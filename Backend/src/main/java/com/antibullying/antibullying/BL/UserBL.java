package com.antibullying.antibullying.BL;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.antibullying.antibullying.beans.User;
import com.antibullying.antibullying.repositories.UserRepository;
@Service
public class UserBL {
	@Autowired
	UserRepository userRepo;
	public List<User> getAll(){
		return userRepo.findAll();
	}
	public boolean addUser(String email,String name,String phoneNumber) {
		User user = new User();
		user.setEmail(email);
		user.setName(name);
		user.setPhoneNumber(phoneNumber);
		userRepo.save(user);
		return true;
	}
}
