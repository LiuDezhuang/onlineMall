package com.litian.dao;


import com.litian.domain.Config;

import java.util.List;

public interface ConfigMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table dt_p2p_conf
     *
     * @mbggenerated Thu Jul 07 14:32:04 CST 2016
     */
    int deleteByPrimaryKey(String InstCode);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table dt_p2p_conf
     *
     * @mbggenerated Thu Jul 07 14:32:04 CST 2016
     */
    int insert(Config record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table dt_p2p_conf
     *
     * @mbggenerated Thu Jul 07 14:32:04 CST 2016
     */
    int insertSelective(Config record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table dt_p2p_conf
     *
     * @mbggenerated Thu Jul 07 14:32:04 CST 2016
     */
    Config selectByPrimaryKey(String InstCode);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table dt_p2p_conf
     *
     * @mbggenerated Thu Jul 07 14:32:04 CST 2016
     */
    int updateByPrimaryKeySelective(Config record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table dt_p2p_conf
     *
     * @mbggenerated Thu Jul 07 14:32:04 CST 2016
     */
    int updateByPrimaryKey(Config record);
    
    List<Config> findAll();
}