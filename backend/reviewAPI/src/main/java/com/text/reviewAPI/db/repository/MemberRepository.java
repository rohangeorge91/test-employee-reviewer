package com.text.reviewAPI.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.test.reviewAPI.db.model.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {

}
