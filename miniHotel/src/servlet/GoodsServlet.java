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

import common.StringUtil;
import dao.GoodsDao;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
@WebServlet("*.goods")
public class GoodsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		GoodsDao gooddao = new GoodsDao();
		String path = request.getRequestURI();
		String action = path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf("."));
		switch (action) {
		case "list":
			String currentPage = request.getParameter("currentPage");
			String search = request.getParameter("search");
			int cpage = 1;
			if (StringUtil.isNotEmpty(currentPage)) {
				cpage = Integer.parseInt(currentPage);
			}
			ResultSet rs = gooddao.currentGoods(cpage, search);
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
			int total = gooddao.getTotalPage(psearch);
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
