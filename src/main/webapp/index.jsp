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
	
	<script>
	$(function(){
		$("#querylist").bootstrapTable({
			height: getHeight(),
			columns: [{
                field: 'state',
                checkbox: true,
                rowspan: 2,
                align: 'center',
                valign: 'middle'
            }, {
		        field: 'MeterMeasureHistoryID',
		        title: '编号',
		        sortable: true
		    }, {
                title: '机构代码',
                field: 'instCode',
                align: 'center',
                valign: 'middle',
                sortable: true,
                footerFormatter: totalTextFormatter
            }, {
		        field: 'operation',
		        title: '操作',
		        formatter:function(value,row,index){
		            var s = '<a class = "save" href="javascript:void(0)">保存</a>';
		            var d = '<a class = "remove" href="javascript:void(0)">删除</a>';
		            return s+' '+d;
		        },
		        events: 'operateEvents'
		    }],
		    sortName: 'MeterMeasureHistoryID',
		    sortOrder: 'desc',
		    pagination: true,
		    sidePagination: 'server',
		    pageNumber: 1,
		    pageSize: 5,
		    pageList: [5, 10, 20],
		    queryParams: function (params) {
		        return {
		            meterID: $('#meterid').val(),
		            pageSize: params.limit,
		            offset: params.offset,
		            sortOrder: params.order,
		            instCode: $('#begintime').val()
		        }
		    },
		    url: '/Analyze/GetJsonHistoryDatas'
		});
	});
	</script>
	
</head>
<body> 
<div class="container">
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand" style="color: white;">存管技术支持</a>
        </div>
      </div>
    </nav>
   
<table id="querylist" class="table table-striped"></table>
</div>
</body>
</html>