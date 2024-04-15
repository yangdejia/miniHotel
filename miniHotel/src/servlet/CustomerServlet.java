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
import dao.CustomerDao;
import model.Customer;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
@WebServlet("*.customer")
public class CustomerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
   
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw=response.getWriter();
		CustomerDao customerDao=new CustomerDao();
		String path = request.getRequestURI();
		String action = path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf("."));
		String name=request.getParameter("name");
		String age=request.getParameter("age");
		String sex=request.getParameter("sex");
		String idcard=request.getParameter("idcard");
		String tel=request.getParameter("tel");
		String remark=request.getParameter("remark");
		
		switch(action){
		case "add":
			int page=0;
			System.out.println(name+","+page+","+sex+","+idcard+","+tel+","+remark);
			if(StringUtil.isNotEmpty(name)&&StringUtil.isNotEmpty(idcard)&&StringUtil.isNotEmpty(tel)){
				if(StringUtil.isNotEmpty(age)){
					page=Integer.parseInt(age);	
				}	
				Customer customer=new Customer();
				if(customerDao.addCustomer(customer)){
					pw.print("success");
				}else{
					pw.print("fail");
				}
			}else{
				pw.print("error");
			}
			break;
		case "list":
			String currentPage=request.getParameter("currentPage");
			String search=request.getParameter("search");
			int cpage=1;
			if(StringUtil.isNotEmpty(currentPage)){
				cpage=Integer.parseInt(currentPage);
			}
			ResultSet rs=customerDao.currentCustomer(cpage,search);
			JSONArray jsonarr=new JSONArray();
			try {
				ResultSetMetaData rsmd=rs.getMetaData();
				int count=rsmd.getColumnCount();
				while(rs.next()){	
					JSONObject json=new JSONObject();
					for(int i=1;i<=count;i++){	
						if(rs.getObject(i)==null){
							json.put(rsmd.getColumnName(i), "");	
						}else{
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
			String psearch=request.getParameter("search");
			int total=customerDao.getTotalPage(psearch);
			if(total!=0){
				pw.print(total);
			}else{
				pw.print("empty");
			}
			break;
		case "read":
			String code=request.getParameter("code");
			if(StringUtil.isNotEmpty(code)){
				ResultSet rss=customerDao.getByCode(code);
				JSONArray jsonarrr=new JSONArray();
				try {
					ResultSetMetaData rsmd=rss.getMetaData();
					int count=rsmd.getColumnCount();
					while(rss.next()){	
						JSONObject json=new JSONObject();
						for(int i=1;i<=count;i++){	
							if(rss.getObject(i)==null){
								json.put(rsmd.getColumnName(i), "");	
							}else{
								json.put(rsmd.getColumnName(i), rss.getObject(i));	
							}
						}
						jsonarrr.add(json);
					}
					System.out.println(jsonarrr.size());
					pw.println(jsonarrr);
				}catch (SQLException e) {
					e.printStackTrace();
				}	
			}else{
				pw.print("fail");
			}
			break;
		case "update":
			String code1=request.getParameter("code");
			String name1=request.getParameter("name");
			String age1=request.getParameter("age");
			String sex1=request.getParameter("sex");
			String idcard1=request.getParameter("idcard");
			String tel1=request.getParameter("tel");
			String remark1=request.getParameter("remark");
			
			if(StringUtil.isNotEmpty(code1)){
				int ppage=0;
				if(StringUtil.isNotEmpty(age1)){
					ppage=Integer.parseInt(age1);
				}
				
				Customer pass=new Customer();
				System.out.println(code1+","+name1+","+age1+","+sex1+","+idcard1+","+tel1+","+remark1);
				if(customerDao.updateCustomer(pass)){
					System.out.println("success");
					pw.print("success");
				}else{
					pw.print("fail");
				}
			}else{
				pw.print("error");
			}
			break;
		case "delete":
			String dcode=request.getParameter("code");
			if(StringUtil.isNotEmpty(dcode)){
				if(customerDao.deleteCustomer(dcode)){
					pw.print("success");
				}else{
					pw.print("fail");
				}
			}else{
				pw.print("error");
			}
			break;
		case "info":
			ResultSet irs=customerDao.getList();
			JSONArray ijsonarr=new JSONArray();
			try {
				ResultSetMetaData rsmd=irs.getMetaData();
				int count=rsmd.getColumnCount();
				while(irs.next()){	
					JSONObject json=new JSONObject();
					for(int i=1;i<=count;i++){	
						if(irs.getObject(i)==null){
							json.put(rsmd.getColumnName(i), "");	
						}else{
							json.put(rsmd.getColumnName(i), irs.getObject(i));	
						}
					}
					ijsonarr.add(json);
				}
				System.out.println(ijsonarr.size());
				pw.println(ijsonarr);
			} catch (SQLException e) {
				e.printStackTrace();
			}
			break;
		}
		
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
