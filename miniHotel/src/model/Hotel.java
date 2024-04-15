package model;

import java.util.List;

public class Hotel {
	 private int id;
	    private String name;
	    private String telephone;
	    private List<Room> rooms;
	    private List<Staff> staffs;
	    
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getTelephone() {
			return telephone;
		}
		public void setTelephone(String telephone) {
			this.telephone = telephone;
		}
		public List<Room> getRooms() {
			return rooms;
		}
		public void setRooms(List<Room> rooms) {
			this.rooms = rooms;
		}
		public List<Staff> getStaffs() {
			return staffs;
		}
		public void setStaffs(List<Staff> staffs) {
			this.staffs = staffs;
		}
	    
}
