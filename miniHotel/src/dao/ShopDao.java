package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ShopDao {
//	// ���
//	public boolean addShop(Shop shop) {
//		Connection conn = null;
//		PreparedStatement ps = null;
//		int num = 0;
//		try {
//			conn = DBUtil.getConn();
//			String sql = "insert into shop(shop_code,shop_name,shop_address,shop_time,shop_remark) values(?,?,?,?,?)";
//			ps = conn.prepareStatement(sql);
//			ps.setString(1, shop.getCode());
//			ps.setString(2, shop.getName());
//			ps.setString(3, shop.getAddress());
//			ps.setString(4, shop.getTime());
//			ps.setString(5, shop.getRemark());
//
//			num = ps.executeUpdate();
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} finally {
//			DBUtil.close(conn, ps, null);
//		}
//		if (num > 0)
//			return true;
//		else
//			return false;
//	}
//
//	// ��ȡ��ҳ��
//	public int getTotalPage(String search) {
//		int pagenums = 0;
//		int count = 0;
//		Connection conn = null;
//		PreparedStatement ps = null;
//		ResultSet rs = null;
//		try {
//			conn = DBUtil.getConn();
//			String sql = "select count(*) from shop";
//			if (StringUtil.isNotEmpty(search)) {
//				sql = sql + " where shop_code like '%" + search + "%' or shop_address like '%" + search + "%'";
//			}
//			ps = conn.prepareStatement(sql);
//			rs = ps.executeQuery();
//			while (rs.next()) {
//				count = rs.getInt(1);
//			}
//			pagenums = count % 5 == 0 ? count / 5 : count / 5 + 1;
//
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} finally {
//			DBUtil.close(conn, ps, rs);
//		}
//		return pagenums;
//	}
//
//	// ��ȡ��ǰҳ����
//	public ResultSet currentShop(int currentPage, String search) {
//		Connection conn = null;
//		PreparedStatement ps = null;
//		ResultSet rs = null;
//		try {
//			conn = DBUtil.getConn();
//			String sql = "select shop_code,shop_name,shop_address,shop_time,shop_state from shop";
//			if (StringUtil.isNotEmpty(search)) {
//				sql = sql + " where shop_code like '%" + search + "%' or shop_address like '%" + search + "%'";
//			}
//			sql = sql + " order by shop_time DESC limit ?,?";
//			System.out.println(sql);
//			ps = conn.prepareStatement(sql);
//			int begin = (currentPage - 1) * 5;
//			int end = begin + 5;
//			ps.setInt(1, begin);
//			ps.setInt(2, end);
//			rs = ps.executeQuery();
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} finally {
//			// DBUtil.close(conn, ps, rs);
//		}
//		return rs;
//	}
//
//	// ͨ�������ѯ�����ؽ����
//	public ResultSet getRsById(String code) {
//		Connection conn = null;
//		PreparedStatement ps = null;
//		ResultSet rs = null;
//		try {
//			conn = DBUtil.getConn();
//			String sql = "select * from shop where shop_code=?";
//			ps = conn.prepareStatement(sql);
//			ps.setString(1, code);
//			rs = ps.executeQuery();
//			return rs;
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		return null;
//	}
//
//	// ɾ��
//	public boolean deleteShop(String code) {
//		Connection conn = null;
//		PreparedStatement ps = null;
//		int num = 0;
//		String sql = "";
//		try {
//			conn = DBUtil.getConn();
//			if (StringUtil.isNotEmpty(code)) {
//				sql = "delete from shop where shop_code='" + code + "'";
//				ps = conn.prepareStatement(sql);
//				num = ps.executeUpdate();
//				System.out.println(num);
//				if (num > 0) {
//					return true;
//				} else {
//					return false;
//				}
//			}
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} finally {
//			DBUtil.close(conn, ps, null);
//		}
//		return false;
//	}
//
//	public String getById(String code) {
//		Connection conn = null;
//		PreparedStatement ps = null;
//		ResultSet rs = null;
//		String name = null;
//		try {
//			conn = DBUtil.getConn();
//			String sql = "select shop_name from shop where shop_code=?";
//			ps = conn.prepareStatement(sql);
//			ps.setString(1, code);
//			rs = ps.executeQuery();
//			while (rs.next()) {
//				name = rs.getString(1);
//			}
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		return name;
//	}
}
