package com.antibullying.antibullying.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.antibullying.antibullying.beans.User;


public interface UserRepository extends JpaRepository<User,Integer> {

}
