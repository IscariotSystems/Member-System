package com.isacariotsystems.MemberSystem.service;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.isacariotsystems.MemberSystem.entity.Attendance;
import com.isacariotsystems.MemberSystem.entity.User;
import com.isacariotsystems.MemberSystem.repository.UserRepository;

@Service
public class SocialScoreService {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AttendanceService attendanceService;
    // 24 * 60 * 60 * 1000 for day
    @Scheduled(fixedDelay = 60000)
    public void updateSocialScores() {
        List<User> userList = userService.allUsers();
        for (User user : userList) {
            LocalDate dateJoined = user.getInvitationDate();
            List<Attendance> userAttendances = attendanceService.getConfirmedAttendanceByUser(user.getUserId());

            int daysAttended = userAttendances.size();
            
            long weeksDifference = ChronoUnit.WEEKS.between(dateJoined, LocalDate.now());
            if (weeksDifference > 0 && daysAttended > 0){
                int daysRequiredByRank = user.getRank().getDaysRequired();
            
                Long daysRequired = weeksDifference*daysRequiredByRank;
                double socialScore = truncateToTwoDecimalPlaces((double)daysAttended/daysRequired);
                user.setSocialScore(socialScore);
                userRepository.save(user);
            }else{
                break;
            }
        }
    }

    // Helper Function
    private static double truncateToTwoDecimalPlaces(double number) {
        DecimalFormat decimalFormat = new DecimalFormat("#.##");

        String formattedNumber = decimalFormat.format(number);

        return Double.parseDouble(formattedNumber);
    }
}
