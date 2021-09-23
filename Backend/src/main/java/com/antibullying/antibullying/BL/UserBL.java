package com.antibullying.antibullying.BL;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.antibullying.antibullying.repositories.UserRepository;
@Service
public class UserBL {
	@Autowired
	UserRepository userRepo;
	
}
