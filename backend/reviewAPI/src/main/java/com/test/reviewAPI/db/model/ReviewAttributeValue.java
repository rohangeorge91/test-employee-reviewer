package com.test.reviewAPI.db.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the review_attribute_value database table.
 * 
 */
@Entity
@Table(name="review_attribute_value")
@NamedQuery(name="ReviewAttributeValue.findAll", query="SELECT r FROM ReviewAttributeValue r")
public class ReviewAttributeValue implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String value;

	private String description;

	private int weight;

	//bi-directional many-to-one association to ReviewAssessmentAttribute
	@OneToMany(mappedBy="reviewAttributeValue")
	private List<ReviewAssessmentAttribute> reviewAssessmentAttributes;

	public ReviewAttributeValue() {
	}

	public String getValue() {
		return this.value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getWeight() {
		return this.weight;
	}

	public void setWeight(int weight) {
		this.weight = weight;
	}

	public List<ReviewAssessmentAttribute> getReviewAssessmentAttributes() {
		return this.reviewAssessmentAttributes;
	}

	public void setReviewAssessmentAttributes(List<ReviewAssessmentAttribute> reviewAssessmentAttributes) {
		this.reviewAssessmentAttributes = reviewAssessmentAttributes;
	}

	public ReviewAssessmentAttribute addReviewAssessmentAttribute(ReviewAssessmentAttribute reviewAssessmentAttribute) {
		getReviewAssessmentAttributes().add(reviewAssessmentAttribute);
		reviewAssessmentAttribute.setReviewAttributeValue(this);

		return reviewAssessmentAttribute;
	}

	public ReviewAssessmentAttribute removeReviewAssessmentAttribute(ReviewAssessmentAttribute reviewAssessmentAttribute) {
		getReviewAssessmentAttributes().remove(reviewAssessmentAttribute);
		reviewAssessmentAttribute.setReviewAttributeValue(null);

		return reviewAssessmentAttribute;
	}

}