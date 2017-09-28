package com.litian.constroller;

import com.alibaba.fastjson.JSONArray;
import com.litian.domain.OperationInfo;
import com.litian.service.OperationInfoService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/operation")
public class OperationInfoConstroller {
	
	@Autowired
	private OperationInfoService operationInfoService;
	
	@Autowired
	private static final Logger LOGGER=Logger.getLogger(OperationInfoConstroller.class);
	
	/**
	 * 查询所有的操作信息
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/getAll",method=RequestMethod.GET)
	public String findAll(HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		List<OperationInfo> list = operationInfoService.findAll();
		if(null != list && list.size() >0 ){  
			String json =JSONArray.toJSONString(list);;
			response.setCharacterEncoding("UTF-8");  
            response.getWriter().write(json); 
            LOGGER.info(json);
         }
		return null;
	}

}
