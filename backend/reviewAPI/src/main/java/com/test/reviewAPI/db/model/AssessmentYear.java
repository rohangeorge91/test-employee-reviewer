package com.test.reviewAPI.db.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the assessment_year database table.
 * 
 */
@Entity
@Table(name="assessment_year")
@NamedQuery(name="AssessmentYear.findAll", query="SELECT a FROM AssessmentYear a")
public class AssessmentYear implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private String year;

	//bi-directional many-to-one association to ReviewAssessment
	@OneToMany(mappedBy="assessmentYearBean")
	private List<ReviewAssessment> reviewAssessments;

	public AssessmentYear() {
	}

	public String getYear() {
		return this.year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public List<ReviewAssessment> getReviewAssessments() {
		return this.reviewAssessments;
	}

	public void setReviewAssessments(List<ReviewAssessment> reviewAssessments) {
		this.reviewAssessments = reviewAssessments;
	}

	public ReviewAssessment addReviewAssessment(ReviewAssessment reviewAssessment) {
		getReviewAssessments().add(reviewAssessment);
		reviewAssessment.setAssessmentYearBean(this);

		return reviewAssessment;
	}

	public ReviewAssessment removeReviewAssessment(ReviewAssessment reviewAssessment) {
		getReviewAssessments().remove(reviewAssessment);
		reviewAssessment.setAssessmentYearBean(null);

		return reviewAssessment;
	}

}