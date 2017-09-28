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
		$("#cc").calendar({    
		    current:new Date()    
		}); 
	});

</script>
</head>
<body style="font: 12px;">
<div id="cc" style="width:180px;height:180px;"></div>
</body>
</html>