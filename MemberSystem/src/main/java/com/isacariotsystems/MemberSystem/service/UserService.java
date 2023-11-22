package com.isacariotsystems.MemberSystem.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.isacariotsystems.MemberSystem.entity.User;

public interface UserService {
    public User saveUser(User user);

    public List<User> allUsers();

    public Optional<User> findUserById(Long userId);

    public void deleteUserById(Long userId);

    public User updateUser(Long userId, User user);

    public User updateUserFirstName(Long userId, String firstName);

    public User updateUserLastName(Long userId, String lastName);

    public User updateUserAddress(Long userId, String address);

    public User updateUserPhoneNumber(Long userId, String phoneNumber);

    public Optional<List<User>> findUsersBySuperiorId(Long superiorId);

    public Optional<List<User>> findUsersByBranch(Long branchId);

    public Optional<List<User>> findUsersByRank(Long rankId);
    
    public Optional<List<User>> findUsersByDate(LocalDate date);

    UserDetailsService userDetailsService();

    public Optional<List<User>> findUsersByFirstName(String firstName);
}
