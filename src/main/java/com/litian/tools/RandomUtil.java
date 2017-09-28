package com.litian.tools;
/**
 * 随机字符串生成工具
 * @author huangkun
 * @since 2015.6.12
 * */
public class RandomUtil {
	/**
	 * 纯数字字符串生成函数
	 * @param length 指定的位数
	 * */
	public static String nstr(int length)
	{
		StringBuffer str=new StringBuffer();
		for(int i=0;i<length;i++)
		{
			str.append(String.valueOf((int)(Math.random()*10)));
		}
		return str.toString();
	}
	
	/**
	 * 纯数字字符串生成函数
	 * @param length 指定的位数
	 * */
	public static String nstrNoZero(int length)
	{
		StringBuffer str=new StringBuffer();
		for(int i=0;i<length;i++)
		{
			int v = (int)(Math.random()*10);
			if(v==0) v=1;
			str.append(String.valueOf(v));
		}
		return str.toString();
	}
	
	/**
	 * 字母数字混合随机字符串生成函数
	 * @param length 指定的位数
	 * */
	
	public static String anstr(int length)
	{
		StringBuffer str=new StringBuffer();
		
		for(int i=0;i<length;i++)
		{
			int type=(int)((int)(Math.random()*10)+1)%3;
			switch(type)
			{
			case 0:str.append((char)(((int)(Math.random()*26))+65));break;
			case 1:str.append((char)(((int)(Math.random()*26))+97));break;
			default:str.append((int)(Math.random()*10));break;
			}
		}
		return str.toString();
	}
	
	public static void main(String[] args)
	{
		System.out.println(nstrNoZero(16));
	}
}
