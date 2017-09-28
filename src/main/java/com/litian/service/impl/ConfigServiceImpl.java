package com.litian.service.impl;

import com.litian.dao.ConfigMapper;
import com.litian.domain.Config;
import com.litian.service.ConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 
 * @author Administrator
 *
 */
@Service("configService")
public class ConfigServiceImpl implements ConfigService {
	
	@Autowired
	private ConfigMapper configMapper;
	
	public List<Config> findAll() {
		// TODO Auto-generated method stub
		return configMapper.findAll();
	}

	public int insertConfig(Config config) {
		// TODO Auto-generated method stub
		return configMapper.insert(config);
	}
	

}
