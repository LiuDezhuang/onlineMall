package com.litian.util;

/**
 * 实现银行卡卡号 Luhm 校验算法 
 * 转自http://www.oschina.net/code/snippet_86738_3128
 * 效验是否为银行卡，用于验证
	现行 16 位银联卡现行卡号开头 6 位是 622126～622925 之间的，7 到 15 位是银行自定义的，
	可能是发卡分行，发卡网点，发卡序号，第 16 位是校验码。
	
	16 位卡号校验位采用 Luhm 校验方法计算：
	
	1，将未带校验位的 15 位卡号从右依次编号 1 到 15，位于奇数位号上的数字乘以 2
	2，将奇位乘积的个十位全部相加，再加上所有偶数位上的数字
	3，将加法和加上校验位能被 10 整除。
 * @author Administrator
 *
 */
public class Luhm {

	public static void main(String[] args) {
		String card ="6228481698729890079"; //"6227007200120897790";
        System.out.println("      card: " + card);
        System.out.println("check code: " + getBankCardCheckCode(card));
        System.out.println("是否为银行卡:"+checkBankCard(card));
	}
	
	/**
	 * 校验银行卡卡号
	 * @param cardId
	 * @return
	 */
	private static boolean checkBankCard(String cardId){
		char bit=getBankCardCheckCode(cardId.substring(0,cardId.length()-1));
		if(bit=='N'){
			return false;
		}
		return cardId.charAt(cardId.length()-1)==bit;
	}

	/**
	 * 从不含校验位的银行卡卡号采用 Luhm 校验算法获得校验位
	 * @param nonCheckCodeCardId
	 * @return
	 */
	private static char getBankCardCheckCode(String nonCheckCodeCardId) {
		// TODO Auto-generated method stub
		if(nonCheckCodeCardId ==null || nonCheckCodeCardId.trim().length() == 0 
				|| !nonCheckCodeCardId.matches("\\d+")){
			//如果传的不是数据返回N
			return 'N';
		};
		char[] chs = nonCheckCodeCardId.trim().toCharArray();
        int luhmSum = 0;
        for(int i = chs.length - 1, j = 0; i >= 0; i--, j++) {
            int k = chs[i] - '0';
            if(j % 2 == 0) {
                k *= 2;
                k = k / 10 + k % 10;
            }
            luhmSum += k;           
        }
        return (luhmSum % 10 == 0) ? '0' : (char)((10 - luhmSum % 10) + '0');
	}
	
}
