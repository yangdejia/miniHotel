package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import common.StringUtil;
import dao.StaffDao;
import model.Staff;

@WebServlet("/RegisterServlet")
public class RegisterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		String type = request.getParameter("type");
		int typen = Integer.parseInt(type);
		String login = request.getParameter("login");
		String name = request.getParameter("username");
		String pwd = request.getParameter("pwd");
		String pwd2 = request.getParameter("pwd2");
		if (!pwd.equals(pwd2)) {
			pw.print("fail");
		} else {
			StaffDao staffdao = new StaffDao();
			if (StringUtil.isNotEmpty(login) && StringUtil.isNotEmpty(name) && StringUtil.isNotEmpty(pwd)) {
				Staff staff = new Staff(login, name, pwd, typen);
				if (staffdao.isExistStaff(staff)) {
					pw.print("exist");
				} else {
					if (staffdao.registerStaff(staff)) {
						pw.print("success");
					} else {
						pw.print("fail");
					}
				}
			} else {
				pw.print("error");
			}
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
