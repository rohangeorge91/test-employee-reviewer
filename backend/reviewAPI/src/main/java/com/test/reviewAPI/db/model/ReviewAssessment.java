package com.test.reviewAPI.db.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the review_assessment database table.
 * 
 */
@Entity
@Table(name="review_assessment")
@NamedQuery(name="ReviewAssessment.findAll", query="SELECT r FROM ReviewAssessment r")
public class ReviewAssessment implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;

	private String summary;

	//bi-directional many-to-one association to AssessmentYear
	@ManyToOne
	@JoinColumn(name="assessment_year")
	private AssessmentYear assessmentYearBean;

	//bi-directional many-to-one association to Member
	@ManyToOne
	@JoinColumn(name="reviewee_id")
	private Member member1;

	//bi-directional many-to-one association to Member
	@ManyToOne
	@JoinColumn(name="reviewer_id")
	private Member member2;

	//bi-directional many-to-one association to ReviewAssessmentAttribute
	@OneToMany(mappedBy="reviewAssessment")
	private List<ReviewAssessmentAttribute> reviewAssessmentAttributes;

	public ReviewAssessment() {
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSummary() {
		return this.summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public AssessmentYear getAssessmentYearBean() {
		return this.assessmentYearBean;
	}

	public void setAssessmentYearBean(AssessmentYear assessmentYearBean) {
		this.assessmentYearBean = assessmentYearBean;
	}

	public Member getMember1() {
		return this.member1;
	}

	public void setMember1(Member member1) {
		this.member1 = member1;
	}

	public Member getMember2() {
		return this.member2;
	}

	public void setMember2(Member member2) {
		this.member2 = member2;
	}

	public List<ReviewAssessmentAttribute> getReviewAssessmentAttributes() {
		return this.reviewAssessmentAttributes;
	}

	public void setReviewAssessmentAttributes(List<ReviewAssessmentAttribute> reviewAssessmentAttributes) {
		this.reviewAssessmentAttributes = reviewAssessmentAttributes;
	}

	public ReviewAssessmentAttribute addReviewAssessmentAttribute(ReviewAssessmentAttribute reviewAssessmentAttribute) {
		getReviewAssessmentAttributes().add(reviewAssessmentAttribute);
		reviewAssessmentAttribute.setReviewAssessment(this);

		return reviewAssessmentAttribute;
	}

	public ReviewAssessmentAttribute removeReviewAssessmentAttribute(ReviewAssessmentAttribute reviewAssessmentAttribute) {
		getReviewAssessmentAttributes().remove(reviewAssessmentAttribute);
		reviewAssessmentAttribute.setReviewAssessment(null);

		return reviewAssessmentAttribute;
	}

}