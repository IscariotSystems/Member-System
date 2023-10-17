package com.isacariotsystems.MemberSystem.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.isacariotsystems.MemberSystem.entity.Attendance;
import com.isacariotsystems.MemberSystem.entity.AttendanceID;
import com.isacariotsystems.MemberSystem.entity.Member;


@Repository
public interface AttendanceRepository extends JpaRepository<Attendance,AttendanceID> {
     List<Member> findMembersByAttendanceID_Date(LocalDate date);

     List<Attendance> findAttendanceByAttendanceID_MemberId(Long memberId);
}
