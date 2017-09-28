<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>存管技术支持</title>
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="bootstrap/others/jumbotron/jumbotron.css" rel="stylesheet">
    <link href="bootstrap/others/table/src/bootstrap-table.css" rel="stylesheet">
    
    <script type="text/javascript" src="jquery/jquery-3.0.0.min.js""></script>
	<script src="bootstrap/js/bootstrap.min.js"></script>
	<script src="bootstrap/others/table/src/bootstrap-table.js"></script>
	<script type="text/javascript">
	
		$(function(){

			$.getJSON("<%=basePath%>config/getAll",function(data, textStatus, jqXHR){
				var item;
				for ( var i in data) {
					item = "<tr><td>"+data[i].instCode+"</td><td>"+data[i].merchCode+"</td><td>"+data[i].merchName+"</td><td>"+data[i].cardBin+"</td><td>"+data[i].fileKey+"</td>"
					+"<td>"+data[i].erInstCode+"</td><td>"+data[i].erIssuer+"</td><td>"+data[i].erProduct+"</td>"
					+"<td>"+data[i].erSource+"</td><td>"+data[i].erType+"</td><td>"+data[i].chargeAccount+"</td><td>"+data[i].redAccount+"</td><td>"+data[i].version+"</td>"
					+"<td><a class = \"save\" href='javascript:void(0)'>保存</a><a class = 'remove' href='javascript:void(0)'>删除</a></td></tr>";
					$("#tb").append(item); 
				}
			});
			
			$(".save").click(function(e,value,row,index){
				alert(value);
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
<body>
<nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand" style="color: white; padding-left: 0">存管技术支持</a>
        </div>
      </div>
    </nav>
<div class="table-responsive">
<table class="table table-hover" id="tb">
<tr class="active">
	<th>机构代码</th>
	<th>商户代号</th>
	<th>商户名称</th>
	<th>卡Bin</th>
	<th>文件秘钥</th>
	<th>合作号</th>
	<th>合作编码</th>
	<th>产品编号</th>
	<th>渠道号</th>
	<th>账户类别</th>
	<th>红包账户</th>
	<th>手续费账户</th>
	<th>版本</th>
	<th>操作</th>
</tr>
</table> 
<ul class="pagination">
  <li><a href="#">&laquo;</a></li>
  <li class="active"><a href="#">1</a></li>
  <li class="disabled"><a href="#">2</a></li>
  <li><a href="#">3</a></li>
  <li><a href="#">4</a></li>
  <li><a href="#">5</a></li>
  <li><a href="#">&raquo;</a></li>
</ul>
</body>
</html>