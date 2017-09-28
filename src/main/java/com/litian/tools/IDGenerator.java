package com.litian.tools;

import java.util.UUID;

/**
 * UUID生成工具
 * Created by Administrator on 2017/9/7.
 */
public class IDGenerator {
    public static void main(String[] args) {
        getUUID(6);
    }

    /**
     * 生成 UUID
     * 需要用到java 自带 JDk
     */
    public static void getRandomUUID(){
        String uuid = UUID.randomUUID().toString();
        System.out.println("uuid = " + uuid );
    }

    public static void getUUID(int number){
        if(number<1){

        }
        String[] retArray=new String[number];
        for (int i = 0; i < number; i++) {
            retArray[i]=getUUID();
        }
        System.out.print("uuid="+retArray.toString());

    }

    /**
     * 获取一个UUID
     * @return String UUID
     */
    private static String getUUID() {
        String uuid = UUID.randomUUID().toString();
        //去掉“-”符号
        return uuid.replaceAll("-", "");
    }

}
