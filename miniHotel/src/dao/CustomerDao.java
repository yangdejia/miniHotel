package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import common.DBUtil;
import common.StringUtil;
import model.Customer;

public class CustomerDao {

	public boolean addCustomer(Customer customer) {
		Connection conn = null;
		PreparedStatement ps = null;
		int num = 0;
		String sql = "";
		try {
			conn = DBUtil.getConn();
			sql = "insert into customer(first_name,last_name,birthdate,gender,telephone,email,address,is_member) values(?,?,?,?,?,?,?,?)";
			ps = conn.prepareStatement(sql);
			ps.setString(1, customer.getFirstName());
			ps.setString(2, customer.getLastName());
			ps.setDate(3, new java.sql.Date(customer.getBirthDate().getTime()));
			ps.setString(4, customer.getGender());
			ps.setString(5, customer.getTelephone());
			ps.setString(6, customer.getEmail());
			ps.setString(7, customer.getTelephone());
			ps.setBoolean(8, customer.isMember());
			num = ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.close(conn, ps, null);
		}
		if (num > 0)
			return true;
		else
			return false;
	}

	// Get total pages
	public int getTotalPage(String search) {
		int pagenums = 0;
		int count = 0;
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;

		try {
			conn = DBUtil.getConn();
			String sql = "select count(*) from customer";
			if (StringUtil.isNotEmpty(search)) {
				sql = sql + " where id like '%" + search + "%' or first_name like '%" + search + "%'";
			}
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			while (rs.next()) {
				count = rs.getInt(1);
			}
			pagenums = count % 5 == 0 ? count / 5 : count / 5 + 1;

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.close(conn, ps, rs);
		}
		return pagenums;
	}

	// query data by this page
	public ResultSet currentCustomer(int currentPage, String search) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = DBUtil.getConn();
			String sql = "select id,first_name,last_name,birthdate,gender,telephone,email,address,is_member from customer";
			if (StringUtil.isNotEmpty(search)) {
				sql = sql + " where id like '%" + search + "%' or first_name like '%" + search
						+ "%' or telephone like '%" + search + "%'";
			}
			sql = sql + " order by id DESC limit ?,?";
			ps = conn.prepareStatement(sql);
			int begin = (currentPage - 1) * 5;
			int end = begin + 5;
			ps.setInt(1, begin);
			ps.setInt(2, end);
			rs = ps.executeQuery();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.close(conn, ps, rs);
		}
		return rs;
	}

	public ResultSet getByCode(String code) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = DBUtil.getConn();
			String sql = "select * from customer where id=?";
			ps = conn.prepareStatement(sql);
			ps.setString(1, code);
			rs = ps.executeQuery();
			return rs;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return rs;
	}

	// Obtain code and name
	public ResultSet getList() {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = DBUtil.getConn();
			String sql = "select id,first_name,last_name,birth_date from customer order by id desc";
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			return rs;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return rs;
	}

	// Modify customer information
	public boolean updateCustomer(Customer customer) {
		Connection conn = null;
		PreparedStatement ps = null;
		int num = 0;
		String sql = "";
		StringBuffer sb = new StringBuffer();
		String[] arr = null;
		try {
			conn = DBUtil.getConn();
			if (StringUtil.isNotEmpty(customer.getId())) {
				if (StringUtil.isNotEmpty(customer.getFirstName())) {
					sql = "update customer set first_name='" + customer.getFirstName() + "' where id='"
							+ customer.getId() + "'";
					sb.append(sql + ",");
					System.out.println(sql);
				}
				
				if (StringUtil.isNotEmpty(customer.getLastName())) {
					sql = "update customer set last_name='" + customer.getLastName() + "' where id='"
							+ customer.getId() + "'";
					sb.append(sql + ",");
					System.out.println(sql);
				}

				if (StringUtil.isNotEmpty(customer.getGender())) {
					sql = "update customer set customer_sex='" + customer.getGender() + "' where id ='"
							+ customer.getId() + "'";
					sb.append(sql + ",");
					System.out.println(sql);
				}
				if (StringUtil.isNotEmpty(customer.getTelephone())) {
				    sql = "update customer set customer_tel='" + customer.getTelephone() + "' where id='"
				            + customer.getId() + "'";
				    sb.append(sql + ",");
				}
				if (StringUtil.isNotEmpty(customer.getEmail())) {
				    sql = "update customer set customer_email='" + customer.getEmail() + "' where id='"
				            + customer.getId() + "'";
				    sb.append(sql + ",");
				}
				if (StringUtil.isNotEmpty(customer.getAddress())) {
				    sql = "update customer set customer_address='" + customer.getAddress() + "' where id='"
				            + customer.getId() + "'";
				    sb.append(sql + ",");
				}
				if (customer.isMember()) {
				    sql = "update customer set is_member=1 where id='"
				            + customer.getId() + "'";
				    sb.append(sql + ",");
				}
				if (sb.toString().equals("")) {
					return false;
				}
				sql = sb.toString();
				sql = sql.substring(0, sql.lastIndexOf(","));
				arr = sql.split(",");
				System.out.println(arr.length);
				for (int i = 0; i < arr.length; i++) {
					ps = conn.prepareStatement(arr[i]);
					num += ps.executeUpdate();
				}
				System.out.println(num);
				if (num == arr.length) {
					return true;
				} else {
					return false;
				}
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.close(conn, ps, null);
		}
		return false;
	}

	// Delete a customer by code
	public boolean deleteCustomer(String code) {
		Connection conn = null;
		PreparedStatement ps = null;
		int num = 0;
		String sql = "";
		try {
			conn = DBUtil.getConn();
			if (StringUtil.isNotEmpty(code)) {
				sql = "delete from customer where id='" + code + "'";
				ps = conn.prepareStatement(sql);
				num = ps.executeUpdate();
				System.out.println(num);
				if (num > 0) {
					return true;
				} else {
					return false;
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.close(conn, ps, null);
		}
		return false;
	}

	// Obtain the number of accommodation customers for the day
	public int getDayCount(String day, String shop) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		int count = 0;
		try {
			conn = DBUtil.getConn();
			String sql = "SELECT COUNT(*) FROM (select  REPLACE(SUBSTR(ACCOM_INTIME FROM 6 FOR 5),'-','')day from accom,room where accom_room=room_code and room_shop='"
					+ shop + "')t where day like '%" + day + "%'";
			ps = conn.prepareStatement(sql);
			System.out.println(sql);
			rs = ps.executeQuery();
			while (rs.next()) {
				count = rs.getInt(1);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return count;
	}
}
