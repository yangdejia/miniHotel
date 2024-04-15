package model;

public class Admin {
	
	private String adminId;
	private String adminName;
	
	public Admin(String adminId, String adminName) {
		this.adminId = adminId;
		this.adminName = adminName;
	}

	public String getAdminId() {
		return adminId;
	}

	public void setAdminId(String adminId) {
		this.adminId = adminId;
	}

	public String getAdminName() {
		return adminName;
	}

	public void setAdminName(String adminName) {
		this.adminName = adminName;
	}
}
