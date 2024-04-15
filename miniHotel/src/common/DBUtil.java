package common;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class DBUtil {
	
	public static Connection getConn(){
		Connection conn=null;
		try {
					Class.forName("com.mysql.cj.jdbc.Driver");
					String url="jdbc:mysql://localhost:3306/minihotel?characterEncoding=utf-8";
					String loginUser="root";
					String loginPwd="123";

			conn = DriverManager.getConnection(url,loginUser,loginPwd);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}		
		return conn;
		
	}
	
	
	public static void close(Connection conn,PreparedStatement ps,ResultSet rs){
		try {
			if(conn!=null)
				conn.close();
			if(ps!=null)
				ps.close();
			if(rs!=null)
				rs.close();
	
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}
}
