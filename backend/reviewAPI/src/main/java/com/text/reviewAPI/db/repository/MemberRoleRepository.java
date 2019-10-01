package com.text.reviewAPI.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.test.reviewAPI.db.model.MemberRole;

@Repository
public interface MemberRoleRepository extends JpaRepository<MemberRole, String> {

}
