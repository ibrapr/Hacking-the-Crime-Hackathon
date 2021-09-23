package com.antibullying.antibullying.beans;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "Reports")
@JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler" })
public class Report {
	@Id
	@GeneratedValue
	@Column(name = "report_id")
	private int id;
	
	private String subject;
	private String content;
	private boolean status;
	private String explanation;
	public Report() {
		super();
	}
	public String getExplanation() {
		return explanation;
	}
	public void setExplanation(String explanation) {
		this.explanation = explanation;
	}
	
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public int getId() {
		return id;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((content == null) ? 0 : content.hashCode());
		result = prime * result + ((explanation == null) ? 0 : explanation.hashCode());
		result = prime * result + id;
		result = prime * result + (status ? 1231 : 1237);
		result = prime * result + ((subject == null) ? 0 : subject.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Report other = (Report) obj;
		if (content == null) {
			if (other.content != null)
				return false;
		} else if (!content.equals(other.content))
			return false;
		if (explanation == null) {
			if (other.explanation != null)
				return false;
		} else if (!explanation.equals(other.explanation))
			return false;
		if (id != other.id)
			return false;
		if (status != other.status)
			return false;
		if (subject == null) {
			if (other.subject != null)
				return false;
		} else if (!subject.equals(other.subject))
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "Report [id=" + id + ", subject=" + subject + ", content=" + content + ", status=" + status
				+ ", explanation=" + explanation + "]";
	}
	
}
