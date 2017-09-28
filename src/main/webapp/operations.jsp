<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>P2P平台基本信息</title>
<script type="text/javascript" src="js/jquery-1.4.4.min.js""></script>
<script type="text/javascript">
	
	$(function(){
		
		$.getJSON("<%=basePath%>operation/getAll",function(data, textStatus, jqXHR){
			var item;
			for ( var i in data) {
				item = "<tr><td>"+data[i].sid+"</td><td>"+data[i].txCode+"</td><td>"+data[i].remark+"</td><td>"+data[i].onlineOrPage+"</td><td>"+data[i].interfaceUrl+"</td>"
				+"<td>"+data[i].pageUrl+"</td><td>"+data[i].flag+"</td></tr>";
				$("#tb").append(item); 
			}
		});
		
<%-- 		$.ajax({
			url:"<%=basePath%>config/getAll",
			type:"get",
			dataType:"json",
			success:function(data){
				alert(data);
			}
		});
 --%>
	});

</script>
</head>
<body style="font: 12px;">
<table id="tb">
<tr>
	<th>编号</th>
	<th>交易代码</th>
	<th>交易描述</th>
	<th>联机或页面</th>
	<th>测试接口</th>
	<th>测试页面</th>
	<th>测试版本</th>
</tr>
</table> 
</body>
</html>