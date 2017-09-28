package com.litian.service;


import com.litian.domain.Config;

import java.util.List;

/**
 * 
 * @author Administrator
 *
 */
public interface ConfigService {
	
	List<Config> findAll();
	int insertConfig(Config config);

}
