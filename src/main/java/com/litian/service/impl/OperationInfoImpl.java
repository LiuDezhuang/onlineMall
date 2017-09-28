package com.litian.service.impl;

import com.litian.dao.OperationInfoMapper;
import com.litian.domain.OperationInfo;
import com.litian.service.OperationInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("operationInfoService")
public class OperationInfoImpl implements OperationInfoService {

	@Autowired
	private OperationInfoMapper operationInfoMapper;
	
	public List<OperationInfo> findAll() {
		// TODO Auto-generated method stub
		List<OperationInfo> operationList=operationInfoMapper.findAll();
		return operationList;
	}
	
	
	

}
