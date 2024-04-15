package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import common.StringUtil;
import dao.RoomDao;
import dao.StaffDao;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
@WebServlet("*.roomList")
public class RoomListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		RoomDao roomdao = new RoomDao();
		String path = request.getRequestURI();
		String action = path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf("."));
		HttpSession session = request.getSession();
		String emplogin = (String) session.getAttribute("empInfo");
		String adminlogin = (String) session.getAttribute("adminInfo");
		String syslogin = (String) session.getAttribute("sysInfo");
		String type = request.getParameter("type");
		String login = "";
		StaffDao staffdao = new StaffDao();
		System.out.println(login);
		if (StringUtil.isNotEmpty(type)) {
			if (type.equals("0")) {
				login = emplogin;
			} else if (type.equals("1")) {
				login = adminlogin;
			} else if (type.equals("2")) {
				login = syslogin;
			}
		}
		switch (action) {
		case "list":
			String shop = staffdao.getShop(login);
			ResultSet rs = roomdao.getRoomList(shop);
			JSONArray jsonarr = new JSONArray();
			try {
				ResultSetMetaData rsmd = rs.getMetaData();
				int count = rsmd.getColumnCount();
				while (rs.next()) {
					JSONObject json = new JSONObject();
					for (int i = 1; i <= count; i++) {
						if (rs.getObject(i) == null) {
							json.put(rsmd.getColumnName(i), "");
						} else {
							json.put(rsmd.getColumnName(i), rs.getObject(i));
						}
					}
					jsonarr.add(json);
				}
				System.out.println(jsonarr.size());
				pw.println(jsonarr);
			} catch (SQLException e) {
				e.printStackTrace();
			}
			break;
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
