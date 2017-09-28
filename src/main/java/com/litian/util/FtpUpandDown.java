/*
package com.litian.util;

import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;

import java.io.*;

public class FtpUpandDown {
	
	
	*/
/**
	 * 向FTP服务器上传文件
	 * @param url FTP服务器IP
	 * @param username FTP登录账号
	 * @param password FTP登录密码
	 * @param path FTP服务器保存目录
	 * @param filename 上传到FTP服务器上的文件名
	 * @param input 输入流
	 * @return 成功返回true，否则返回false
	 *//*

	public static boolean uploadFile(String url,String username, String password, String path, String filename, InputStream input) {
		boolean success = false;
		FTPClient ftp = new FTPClient();
		try {
			int reply;
			ftp.connect(url,21);//连接FTP服务器
			//如果采用默认端口，可以使用ftp.connect(url)的方式直接连接FTP服务器
			ftp.login(username, password);//登录
			reply = ftp.getReplyCode();
			if (!FTPReply.isPositiveCompletion(reply)) {
				ftp.disconnect();
				return success;
			}
			ftp.changeWorkingDirectory(path);
			ftp.storeFile(filename, input);			
			
			input.close();
			ftp.logout();
			success = true;
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (ftp.isConnected()) {
				try {
					ftp.disconnect();
				} catch (IOException ioe) {
				}
			}
		}
		return success;
	}
	
	*/
/**
	 * 从FTP服务器下载文件
	 * @param url FTP服务器IP
   	 * @param port FTP服务器端口
	 * @param username FTP登录账号
	 * @param password FTP登录密码
	 * @param remotePath FTP服务器上的相对路径
	 * @param fileName 要下载的文件名
	 * @param localPath 下载后保存到本地的路径
	 * @return
	 *//*

	public static boolean downFile(String url, String username, String password, String remotePath,String fileName,String localPath) { 
	    boolean success = false; 
	    FTPClient ftp = new FTPClient(); 
	    try { 
	        int reply; 
	        ftp.connect(url,21); 
	        //如果采用默认端口，可以使用ftp.connect(url)的方式直接连接FTP服务器 
	        ftp.login(username, password);//登录 
	        reply = ftp.getReplyCode(); 
	        if (!FTPReply.isPositiveCompletion(reply)) { 
	            ftp.disconnect(); 
	            return success; 
	        } 
	        ftp.changeWorkingDirectory(remotePath);//转移到FTP服务器目录 
	        FTPFile[] fs = ftp.listFiles(); 
	        for(FTPFile ff:fs){ 
	            if(ff.getName().equals(fileName)){ 
	                File localFile = new File(localPath+"/"+ff.getName()); 
	                 
	                OutputStream is = new FileOutputStream(localFile);  
	                ftp.retrieveFile(ff.getName(), is); 
	                is.close(); 
	            } 
	        } 
	         
	        ftp.logout(); 
	        success = true; 
	    } catch (IOException e) { 
	        e.printStackTrace(); 
	    } finally { 
	        if (ftp.isConnected()) { 
	            try { 
	                ftp.disconnect(); 
	            } catch (IOException ioe) { 
	            } 
	        } 
	    } 
	    return success; 
	}
	
	*/
/**
	 * 测试文件上传
	 *//*

	public static boolean testUpLoadFromString(String filePath,String fileName){
		
		boolean flag=false;
		try {
			String files="C:/Users/Administrator/Desktop/p2p.properties";
			//File file=new File(filePath);
			File file=new File(files);
			InputStream input=new FileInputStream(file);
			//InputStream input = new ByteArrayInputStream("test ftp".getBytes("utf-8"));
			flag = uploadFile(filePath,"leo", "leo", "", fileName, input);

		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return flag;
		
	}
	
	*/
/**
	 * 测试文件下载
	 *//*

	public static void testDownFileFromString(){
		
			boolean flag = downFile("192.168.1.124","leo", "leo", "/tmp","test.xlsx","E:/");
			System.out.println(flag);
	}
	
	public static void main(String[] args) {
		testUpLoadFromString("","p2p.properties");
//		//testDownFileFromString();
	}

}
*/
