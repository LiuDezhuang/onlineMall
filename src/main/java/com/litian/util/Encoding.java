package com.litian.util;

import java.io.UnsupportedEncodingException;

public class Encoding {
	
	public static String trxEncoding(String encoding) throws UnsupportedEncodingException{
		return new String(encoding.getBytes("ISO-8859-1"),"UTF-8");
	}

}
