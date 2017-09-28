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
</head>
<body style="font: 12px;">
 <center>  

        <form action="<%=path %>/config/insertConfig" method="POST">  
            <table>  
  
                <tr>  
                    <td>机构代码:</td>  
                    <td> <input type="text" name="InstCode"  /> </td>  
                </tr>  
                <tr>  
                    <td>商户代号:</td>  
                    <td><input type="text" name="MerchCode"  /> </td>  
                </tr> 
                <tr>  
                    <td>商户名称:</td>  
                    <td> <input type="text" name="MerchName"  /> </td>  
                </tr>  
                <tr>  
                    <td>卡Bin:</td>  
                    <td><input type="text" name="CardBin"  /> </td>  
                </tr> 
                <tr>  
                    <td>存管合作号:</td>  
                    <td> <input type="text" name="ErInstCode"  /> </td>  
                </tr>  
                <tr>  
                    <td>存管合作编码:</td>  
                    <td><input type="text" name="ErIssuer"  /> </td>  
                </tr> 
                <tr>  
                    <td>存管产品号:</td>  
                    <td> <input type="text" name="ErProduct"  /> </td>  
                </tr>  
                <tr>  
                    <td>存管渠道号:</td>  
                    <td><input type="text" name="ErSource"  /> </td>  
                </tr> 
                <tr>  
                    <td>存管账户类别:</td>  
                    <td> <input type="text" name="ErType"  /> </td>  
                </tr>  
                <tr>  
                    <td>文件秘钥:</td>  
                    <td><input type="text" name="FileKey"  /> </td>  
                </tr> 
                <tr>  
                    <td>红包账户:</td>  
                    <td><input type="text" name="RedAccount"  /> </td>  
                </tr> 
                <tr>  
                    <td>手续费账户:</td>  
                    <td> <input type="text" name="ChargeAccount"  /> </td>  
                </tr>  
                <tr>  
                    <td>版本:</td>  
                    <td><input type="text" name="Version"  /> </td>  
                </tr>  
                <tr>  
                    <td colspan="2">  
                    <input type="submit"  value="添加"/>  
                    </td>  
                </tr>  
            </table>  
        </form>  
          
    </center>  
</body>
</html>