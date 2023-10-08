package com.isacariotsystems.MemberSystem.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // Indicates that this class is mapped to a database table
@Data // Lombok generates getters and setters for all fields
@AllArgsConstructor // Generates a constructor with all fields
@NoArgsConstructor // Generates a default constructor
public class Member {
    
    @Id // Indicates that this field is the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Specifies how the primary key is generated
    private Long memberId; // Unique identifier for the member
}
