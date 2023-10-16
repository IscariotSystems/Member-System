package com.isacariotsystems.MemberSystem.service;

import java.util.List;
import java.util.Optional;

import com.isacariotsystems.MemberSystem.entity.Branch;


public interface BranchService {
    
    public Branch saveBranch(Branch branch);

    public List<Branch> allBranches();

    public Optional<Branch> findBranchById(Long branchId);

    public void deleteBranchById(Long branchId);

    public Branch updateBranch(Long branchId, Branch branch);
    
}