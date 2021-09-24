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
	public boolean addUser(String email,String name,String phoneNumber, int password) {
		User user = new User();
		user.setEmail(email);
		user.setName(name);
		user.setPhoneNumber(phoneNumber);
		user.setCode(password);
		userRepo.save(user);
		return true;
	}
	public User validate(String email, int password) {
		User user = userRepo.findByEmail(email);
		if (user != null) {
			if (user.getCode() == password) {
				return user;
			}
		}
		return null;
	}
}
