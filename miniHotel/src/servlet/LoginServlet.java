package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import common.StringUtil;
import dao.StaffDao;
import model.Staff;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		String type = request.getParameter("type");
		HttpSession session = request.getSession(); 
		StaffDao staffDao = new StaffDao();
		String login = request.getParameter("login");
		String pwd = request.getParameter("pwd");
		String remember = request.getParameter("remember");
		if (StringUtil.isNotEmpty(login) && StringUtil.isNotEmpty(pwd)) {
			int typen = 0;
			if (type.equals("emp")) {
				typen = 0;
			} else if (type.equals("admin")) {
				typen = 1;
			} else if (type.equals("booker")) {
				typen = 2;
			}
			Staff staff = new Staff(login, pwd, typen);
			if (staffDao.staffLogin(staff)) {
				
					if (StringUtil.isNotEmpty(remember) && remember.equals("1")) {
						if (type.equals("emp")) {
							session.setAttribute("empInfo", login);
							session.setMaxInactiveInterval(3600);
						} else if (type.equals("admin")) {
							session.setAttribute("adminInfo", login);
							session.setMaxInactiveInterval(3600);
						} else if (type.equals("sys")) {
							session.setAttribute("sysInfo", login);
							session.setMaxInactiveInterval(3600);
						}
						pw.print("success");
					}else {
						if (type.equals("emp")) {
							session.setAttribute("empInfo", login);
						} else if (type.equals("admin")) {
							session.setAttribute("adminInfo", login);
						} else if (type.equals("sys")) {
							session.setAttribute("sysInfo", login);
						}
						pw.print("success");
					}
				
			} else {
				pw.print("error");
			}
		}else {
			pw.print("error");
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
