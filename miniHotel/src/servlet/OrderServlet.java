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
import dao.Gorder;
import dao.OrderDao;
import dao.StaffDao;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
@WebServlet("*.order")
public class OrderServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		System.out.println("-------Orderservlet");
		PrintWriter pw = response.getWriter();
		OrderDao orderdao = new OrderDao();
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
		case "update":
			String goods = request.getParameter("goods");
			String num = request.getParameter("num");
			String price = request.getParameter("price");
			String shop = staffdao.getShop(login);
			int onum = 0;
			int oprice = 0;
			int otype = 0;
			if (StringUtil.isNotEmpty(goods)) {
				if (StringUtil.isNotEmpty(num) && StringUtil.isNotEmpty(price) && StringUtil.isNotEmpty(type)) {
					onum = Integer.parseInt(num);
					oprice = Integer.parseInt(price);
					otype = Integer.parseInt(type);
					Gorder order = new Gorder(goods, onum, oprice, otype, shop);
					String code = orderdao.addOrder(order);
					if (code.equals("fail")) {
						pw.print("fail");
					} else {
						pw.print(code + "," + oprice);
					}
				}
			} else {
				pw.print("error");
			}
			break;
		case "list":
			String currentPage = request.getParameter("currentPage");
			String search = request.getParameter("search");
			String lshop = staffdao.getShop(login);
			int cpage = 1;
			if (StringUtil.isNotEmpty(currentPage)) {
				cpage = Integer.parseInt(currentPage);
			}
			ResultSet rs = orderdao.currentOrder(cpage, search, lshop);
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
		case "page":
			String psearch = request.getParameter("search");
			String pshop = staffdao.getShop(login);
			int total = orderdao.getTotalPage(psearch, pshop);
			if (total != 0) {
				pw.print(total);
			} else {
				pw.print("empty");
			}
			break;
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
