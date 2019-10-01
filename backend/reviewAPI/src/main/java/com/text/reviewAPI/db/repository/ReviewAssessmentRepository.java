package com.text.reviewAPI.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.test.reviewAPI.db.model.ReviewAssessment;

@Repository
public interface ReviewAssessmentRepository extends JpaRepository<ReviewAssessment, Long> {

}
