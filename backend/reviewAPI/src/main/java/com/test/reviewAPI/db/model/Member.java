package com.test.reviewAPI.db.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the member database table.
 * 
 */
@Entity
@Table(name="member")
@NamedQuery(name="Member.findAll", query="SELECT m FROM Member m")
public class Member implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="user_id")
	private String userId;

	private String name;

	//bi-directional many-to-one association to MemberRole
	@ManyToOne
	@JoinColumn(name="role")
	private MemberRole memberRole;

	//bi-directional many-to-one association to ReviewAssessment
	@OneToMany(mappedBy="member1")
	private List<ReviewAssessment> reviewAssessments1;

	//bi-directional many-to-one association to ReviewAssessment
	@OneToMany(mappedBy="member2")
	private List<ReviewAssessment> reviewAssessments2;

	public Member() {
	}
	
	public String getUserId() {
		return this.userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public MemberRole getMemberRole() {
		return this.memberRole;
	}

	public void setMemberRole(MemberRole memberRole) {
		this.memberRole = memberRole;
	}

	public List<ReviewAssessment> getReviewAssessments1() {
		return this.reviewAssessments1;
	}

	public void setReviewAssessments1(List<ReviewAssessment> reviewAssessments1) {
		this.reviewAssessments1 = reviewAssessments1;
	}

	public ReviewAssessment addReviewAssessments1(ReviewAssessment reviewAssessments1) {
		getReviewAssessments1().add(reviewAssessments1);
		reviewAssessments1.setMember1(this);

		return reviewAssessments1;
	}

	public ReviewAssessment removeReviewAssessments1(ReviewAssessment reviewAssessments1) {
		getReviewAssessments1().remove(reviewAssessments1);
		reviewAssessments1.setMember1(null);

		return reviewAssessments1;
	}

	public List<ReviewAssessment> getReviewAssessments2() {
		return this.reviewAssessments2;
	}

	public void setReviewAssessments2(List<ReviewAssessment> reviewAssessments2) {
		this.reviewAssessments2 = reviewAssessments2;
	}

	public ReviewAssessment addReviewAssessments2(ReviewAssessment reviewAssessments2) {
		getReviewAssessments2().add(reviewAssessments2);
		reviewAssessments2.setMember2(this);

		return reviewAssessments2;
	}

	public ReviewAssessment removeReviewAssessments2(ReviewAssessment reviewAssessments2) {
		getReviewAssessments2().remove(reviewAssessments2);
		reviewAssessments2.setMember2(null);

		return reviewAssessments2;
	}

}