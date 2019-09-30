package com.test.reviewAPI.db.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the review_assessment_attribute database table.
 * 
 */
@Entity
@Table(name="review_assessment_attribute")
@NamedQuery(name="ReviewAssessmentAttribute.findAll", query="SELECT r FROM ReviewAssessmentAttribute r")
public class ReviewAssessmentAttribute implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private String id;

	//bi-directional many-to-one association to ReviewAssessment
	@ManyToOne
	@JoinColumn(name="review_id")
	private ReviewAssessment reviewAssessment;

	//bi-directional many-to-one association to ReviewAttribute
	@ManyToOne
	@JoinColumn(name="attribute")
	private ReviewAttribute reviewAttribute;

	//bi-directional many-to-one association to ReviewAttributeValue
	@ManyToOne
	@JoinColumn(name="value")
	private ReviewAttributeValue reviewAttributeValue;

	public ReviewAssessmentAttribute() {
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public ReviewAssessment getReviewAssessment() {
		return this.reviewAssessment;
	}

	public void setReviewAssessment(ReviewAssessment reviewAssessment) {
		this.reviewAssessment = reviewAssessment;
	}

	public ReviewAttribute getReviewAttribute() {
		return this.reviewAttribute;
	}

	public void setReviewAttribute(ReviewAttribute reviewAttribute) {
		this.reviewAttribute = reviewAttribute;
	}

	public ReviewAttributeValue getReviewAttributeValue() {
		return this.reviewAttributeValue;
	}

	public void setReviewAttributeValue(ReviewAttributeValue reviewAttributeValue) {
		this.reviewAttributeValue = reviewAttributeValue;
	}

}