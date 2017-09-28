package com.litian.util;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;


public class PropertieUtil {
	
	
	public static Properties load(String fileName){
		Properties prop = new Properties();
        try {
            FileInputStream fis = new FileInputStream("config.properties");// 属性文件输入流     
            prop.load(fis);// 将属性文件流装载到Properties对象中     
            fis.close();// 关闭流     
        
            // 获取属性值，sitename已在文件中定义     
            System.out.println("获取属性值：sitename=" + prop.getProperty("spi.dbms.driverClass"));     

            // 文件输出流     
            FileOutputStream fos = new FileOutputStream("prop.properties");     
            // 将Properties集合保存到流中     
            prop.store(fos, "Copyright (c) Boxcode Studio");     
            fos.close();// 关闭流 
        } catch (FileNotFoundException e) {
            System.out.println("==================================");
            System.out.println(fileName+"配置文件不存在,请联系管理员");
            System.out.println("异常信息："+e);
        } catch (IOException e) {
            System.out.println("==================================");
            System.out.println("读取"+fileName+"配置文件时发生异常,请联系管理员");
            System.out.println("异常信息："+e);
        }
        return prop;
    }
	
	public static void main(String[] args) {
		load("");
    }

}
