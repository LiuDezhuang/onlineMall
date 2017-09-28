package com.litian.util;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.LinkedHashMap;
import java.util.Map;


public class APIService {
	
	public static void main(String[] args) {
		String httpUrl = "http://apis.baidu.com/turing/turing/turing";
		
		Map<String,Object> map=new LinkedHashMap<String, Object>();
		map.put("key", "879a6cb3afb84dbf4fc84a1df2ab7319");
		map.put("info", "百度一下");
		map.put("uerid", "eb2edb736");

		String jsonResult = request(httpUrl, getParamUrl(map));
		System.out.println(jsonResult);
		
	}
	
	/**
	 * 拼接请求参数字符串
	 * @param map
	 * @return
	 */
	private static String getParamUrl(Map<String, Object> map){
		StringBuffer sb = new StringBuffer();
		if(map!=null && !map.isEmpty()){
			for (String key : map.keySet()) {
				if(map.get(key)!=null)
				sb.append(key).append("=").append(map.get(key)).append("&");
			}
		}
		if(sb.length()>0 && "&".equals(String.valueOf(sb.charAt(sb.length()-1)))){
			sb = sb.deleteCharAt(sb.length()-1);
		}
		return sb.toString();
	}

	
	/**
	 * 
	 * @param httpUrl 请求接口
	 * @param httpArg 参数
	 * @return 响应报文
	 */
	public static String request(String httpUrl,String httpArg){
		
		BufferedReader reader = null;
	    String result = null;
	    StringBuffer sbf = new StringBuffer();
	    httpUrl = httpUrl + "?" + httpArg;

	    try {
	        URL url = new URL(httpUrl);
	        HttpURLConnection connection = (HttpURLConnection) url
	                .openConnection();
	        connection.setRequestMethod("GET");
	        // 填入apikey到HTTP header
	        connection.setRequestProperty("apikey",  "b20b2ef96d0d441141df80bc12fab7a9");
	        connection.connect();
	        InputStream is = connection.getInputStream();
	        reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
	        String strRead = null;
	        while ((strRead = reader.readLine()) != null) {
	            sbf.append(strRead);
	            sbf.append("\r\n");
	        }
	        reader.close();
	        result = sbf.toString();
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	    return result;
	}

}
