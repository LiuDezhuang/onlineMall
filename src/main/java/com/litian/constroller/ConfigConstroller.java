package com.litian.constroller;


import com.alibaba.fastjson.JSONArray;
import com.litian.domain.Config;
import com.litian.service.ConfigService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * 
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/config")
public class ConfigConstroller {
	
	
	@Autowired
	private ConfigService configService;
	
	@Autowired
	private static final Logger LOGGER=Logger.getLogger(ConfigConstroller.class);

	
	@RequestMapping("/findAll")
	public @ResponseBody Object findAll(){
		
		List<Config> configs=configService.findAll();
		LOGGER.info(configs);
		return configs;
	}
	/**
	 * 查询所有的P2P平台信息
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/getAll",method=RequestMethod.GET)
	public String findAll(HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		List<Config> list = configService.findAll();
		if(null != list && list.size() >0 ){  
			String json =JSONArray.toJSONString(list);;
			response.setCharacterEncoding("UTF-8");  
            response.getWriter().write(json); 
            LOGGER.info(json);
         }
		return null;
	}
	
	/**
	 * 新增P2P基本信息
	 * @param config
	 * @param modelMap
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/insertConfig",method=RequestMethod.POST)
	public String insertConfig(Config config,ModelMap modelMap,HttpServletRequest request,HttpServletResponse response){
		
		//1.判断是否每个都输入数据                  略
		//2.调用service将信息保存到数据库
		LOGGER.info(config);
		int flag = configService.insertConfig(config);
		LOGGER.info(flag);
		if(flag>0)
			//跳转到显示列表页面
			return "/configs";		
		return null;
	}
	

}
