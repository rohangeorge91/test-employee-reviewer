package com.test.reviewAPI.db.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the review_attribute database table.
 * 
 */
@Entity
@Table(name="review_attribute")
@NamedQuery(name="ReviewAttribute.findAll", query="SELECT r FROM ReviewAttribute r")
public class ReviewAttribute implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private String name;

	private String description;

	@Column(name="order_by")
	private int orderBy;

	//bi-directional many-to-one association to ReviewAssessmentAttribute
	@OneToMany(mappedBy="reviewAttribute")
	private List<ReviewAssessmentAttribute> reviewAssessmentAttributes;

	public ReviewAttribute() {
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getOrderBy() {
		return this.orderBy;
	}

	public void setOrderBy(int orderBy) {
		this.orderBy = orderBy;
	}

	public List<ReviewAssessmentAttribute> getReviewAssessmentAttributes() {
		return this.reviewAssessmentAttributes;
	}

	public void setReviewAssessmentAttributes(List<ReviewAssessmentAttribute> reviewAssessmentAttributes) {
		this.reviewAssessmentAttributes = reviewAssessmentAttributes;
	}

	public ReviewAssessmentAttribute addReviewAssessmentAttribute(ReviewAssessmentAttribute reviewAssessmentAttribute) {
		getReviewAssessmentAttributes().add(reviewAssessmentAttribute);
		reviewAssessmentAttribute.setReviewAttribute(this);

		return reviewAssessmentAttribute;
	}

	public ReviewAssessmentAttribute removeReviewAssessmentAttribute(ReviewAssessmentAttribute reviewAssessmentAttribute) {
		getReviewAssessmentAttributes().remove(reviewAssessmentAttribute);
		reviewAssessmentAttribute.setReviewAttribute(null);

		return reviewAssessmentAttribute;
	}

}