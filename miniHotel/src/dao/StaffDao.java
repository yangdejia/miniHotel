package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import common.DBUtil;
import common.DateUtils;
import common.StringUtil;
import model.Staff;

public class StaffDao {
	DateUtils dateutil = new DateUtils();

	public boolean registerStaff(Staff staff) {
		Connection conn = null;
		PreparedStatement ps = null;
		int num = 0;
		try {
			conn = DBUtil.getConn();
			String sql = "insert into staff(staff_login,staff_name,staff_pwd,staff_type) values(?,?,?,?)";
			ps = conn.prepareStatement(sql);
			ps.setString(1, staff.getLogin());
			ps.setString(2, staff.getName());
			ps.setString(3, staff.getPwd());
			ps.setInt(4, staff.getType());
			System.out.println(staff.getLogin() + "," + staff.getName() + "," + staff.getPwd() + "," + staff.getType());
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

	public boolean addStaff(Staff staff) {
		Connection conn = null;
		PreparedStatement ps = null;
		int num = 0;
		try {
			conn = DBUtil.getConn();
			String sql = "insert into staff(staff_login,staff_name,staff_pwd,staff_type,staff_age,staff_sex,staff_time,staff_tel,staff_address,staff_remark,staff_shop) values(?,?,?,?,?,?,?,?,?,?,?)";
			ps = conn.prepareStatement(sql);
			ps.setString(1, staff.getLogin());
			ps.setString(2, staff.getName());
			ps.setString(3, staff.getPwd());
			ps.setInt(4, staff.getType());
			ps.setInt(5, staff.getAge());
			ps.setString(6, staff.getSex());
			ps.setString(7, DateUtils.parseDate(staff.getTime()));
			ps.setString(8, staff.getTel());
			ps.setString(9, staff.getAddress());
			ps.setString(10, staff.getRemark());
			ps.setString(11, staff.getShop());
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

	public boolean staffLogin(Staff staff) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		boolean flag = false;
		try {
			conn = DBUtil.getConn();
			String sql = "select * from staff where staff_login=? and staff_pwd=? and staff_type=?";
			ps = conn.prepareStatement(sql);
			ps.setString(1, staff.getLogin());
			ps.setString(2, staff.getPwd());
			ps.setInt(3, staff.getType());
			rs = ps.executeQuery();
			while (rs.next()) {
				String login = rs.getString("staff_login");
				String pwd = rs.getString("staff_pwd");
				int type = rs.getInt("staff_type");
				if (login.equals(staff.getLogin()) && pwd.equals(staff.getPwd()) && type == (staff.getType())) {
					System.out.println(login + "," + pwd);
					flag = true;
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.close(conn, ps, rs);
		}
		return flag;
	}

	public boolean isExistStaff(Staff staff) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = DBUtil.getConn();
			String sql = "select * from staff where staff_login=?";
			ps = conn.prepareStatement(sql);
			ps.setString(1, staff.getLogin());
			rs = ps.executeQuery();
			while (rs.next()) {
				String login = rs.getString("staff_login");
				if (login.equals(staff.getLogin())) {
					return true;
				} else {
					return false;
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.close(conn, ps, rs);
		}
		return false;
	}

	public Staff getById(String login) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		Staff staff = null;
		try {
			conn = DBUtil.getConn();
			String sql = "select * from staff where staff_login=?";
			ps = conn.prepareStatement(sql);
			ps.setString(1, login);
			rs = ps.executeQuery();
			while (rs.next()) {
				String slogin = rs.getString("staff_login");
				if (slogin.equals(login)) {
					staff = new Staff(slogin, rs.getString("staff_name"), rs.getString("staff_pwd"),
							rs.getInt("staff_type"), rs.getInt("staff_age"), rs.getString("staff_sex"),
							rs.getDate("staff_time"), rs.getString("staff_tel"), rs.getString("staff_address"),
							rs.getString("staff_remark"));
					return staff;
				} else {
					return null;
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.close(conn, ps, rs);
		}
		return null;
	}

	public int getTotalPage(String search, String shop) {
		int pagenums = 0;
		int count = 0;
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = DBUtil.getConn();
			System.out.println(shop);
			String sql = "select count(*) from(select * from staff where staff_shop='" + shop + "')t";
			if (StringUtil.isNotEmpty(search)) {
				sql = sql + " where staff_login like '%" + search + "%' or staff_name like '%" + search + "%'";
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

	public ResultSet currentStaff(int currentPage, String search, String shop) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = DBUtil.getConn();
			String sql = "select staff_login,staff_name,staff_age,staff_sex,staff_type,staff_time,staff_state from(select * from staff where staff_shop='"
					+ shop + "')t";
			if (StringUtil.isNotEmpty(search)) {
				sql = sql + " where  staff_login like '%" + search + "%' or staff_name like '%" + search + "%'";
			}
			sql = sql + " order by staff_time DESC limit ?,?";
			System.out.println(sql);
			ps = conn.prepareStatement(sql);
			int begin = (currentPage - 1) * 5;
			int end = begin + 5;
			ps.setInt(1, begin);
			ps.setInt(2, end);
			rs = ps.executeQuery();
		} catch (SQLException e) {
			e.printStackTrace();
		} 
		return rs;
	}

	public ResultSet getRsById(String login) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		Staff staff = null;
		try {
			conn = DBUtil.getConn();
			String sql = "select * from staff where staff_login=?";
			ps = conn.prepareStatement(sql);
			ps.setString(1, login);
			rs = ps.executeQuery();
			return rs;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	public boolean updateStaff(Staff staff) {
		Connection conn = null;
		PreparedStatement ps = null;
		int num = 0;
		String sql = "";
		StringBuffer sb = new StringBuffer();
		String[] arr = null;
		try {
			conn = DBUtil.getConn();
			if (StringUtil.isNotEmpty(staff.getLogin())) {
				if (StringUtil.isNotEmpty(staff.getName())) {
					sql = "update staff set staff_name='" + staff.getName() + "' where staff_login='" + staff.getLogin()
							+ "'";
					sb.append(sql + ",");
					System.out.println(sql);
				}
				if (staff.getAge() == 0) {
					sql = "update staff set staff_age=NULL where staff_login='" + staff.getLogin() + "'";
					sb.append(sql + ",");
				} else {
					sql = "update staff set staff_age=" + staff.getAge() + " where staff_login='" + staff.getLogin()
							+ "'";
					sb.append(sql + ",");
				}

				if (StringUtil.isNotEmpty(staff.getSex())) {
					sql = "update staff set staff_sex='" + staff.getSex() + "' where staff_login='" + staff.getLogin()
							+ "'";
					sb.append(sql + ",");
					System.out.println(sql);
				}
				sql = "update staff set staff_time='" + DateUtils.parseDate(staff.getTime()) + "' where staff_login='"
						+ staff.getLogin() + "'";
				sb.append(sql + ",");
				sql = "update staff set staff_tel='" + staff.getTel() + "' where staff_login='" + staff.getLogin()
						+ "'";
				sb.append(sql + ",");
				sql = "update staff set staff_address='" + staff.getAddress() + "' where staff_login='"
						+ staff.getLogin() + "'";
				sb.append(sql + ",");
				sql = "update staff set staff_remark='" + staff.getRemark() + "' where staff_login='" + staff.getLogin()
						+ "'";
				sb.append(sql + ",");
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

	public boolean pwdStaff(Staff staff) {
		Connection conn = null;
		PreparedStatement ps = null;
		int num = 0;
		try {
			conn = DBUtil.getConn();
			String sql = "update staff set staff_pwd=? where staff_login=?";
			ps = conn.prepareStatement(sql);
			ps.setString(1, staff.getPwd());
			ps.setString(2, staff.getLogin());
			num = ps.executeUpdate();
			if (num > 0) {
				return true;
			} else {
				return false;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.close(conn, ps, null);
		}
		return false;
	}

	public boolean deleteStaff(String login) {
		Connection conn = null;
		PreparedStatement ps = null;
		int num = 0;
		String sql = "";
		try {
			conn = DBUtil.getConn();
			if (StringUtil.isNotEmpty(login)) {
				sql = "delete from staff where staff_login='" + login + "'";
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

	public String getShop(String login) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		String shop = "";
		try {
			conn = DBUtil.getConn();
			String sql = "select staff_shop from staff where staff_login=?";
			ps = conn.prepareStatement(sql);
			ps.setString(1, login);
			rs = ps.executeQuery();
			while (rs.next()) {
				shop = rs.getString("staff_shop");
				if (StringUtil.isNotEmpty(shop)) {
					return shop;
				} else {
					return null;
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.close(conn, ps, rs);
		}
		return null;
	}

}
