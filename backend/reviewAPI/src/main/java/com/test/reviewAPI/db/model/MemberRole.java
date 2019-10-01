package com.test.reviewAPI.db.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the member_role database table.
 * 
 */
@Entity
@Table(name="member_role")
@NamedQuery(name="MemberRole.findAll", query="SELECT m FROM MemberRole m")
public class MemberRole implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String role;

	private String description;

	//bi-directional many-to-one association to Member
	@OneToMany(mappedBy="memberRole")
	private List<Member> members;

	public MemberRole() {
	}

	public String getRole() {
		return this.role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Member> getMembers() {
		return this.members;
	}

	public void setMembers(List<Member> members) {
		this.members = members;
	}

	public Member addMember(Member member) {
		getMembers().add(member);
		member.setMemberRole(this);

		return member;
	}

	public Member removeMember(Member member) {
		getMembers().remove(member);
		member.setMemberRole(null);

		return member;
	}

}