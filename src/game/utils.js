// this.colorItemArr = ["kuangji_blue", "kuangji_green", "kuangji_orange", "kuangji_pink", "kuangji_puple", "kuangji_yellow"];
// this.colorBgArr = ["shangpinbeijng_blue", "shangpinbeijng_green", "shangpinbeijng_orange", "shangpinbeijng_pink", "shangpinbeijng_puple", "shangpinbeijng_yellow"];
export default class Utils {

    static get colorItemArr() {
        return ["kuangji_blue", "kuangji_green", "kuangji_orange", "kuangji_pink", "kuangji_puple", "kuangji_yellow"];
    }
    static get colorBgArr() {
        return ["shangpinbeijng_blue", "shangpinbeijng_green", "shangpinbeijng_orange", "shangpinbeijng_pink", "shangpinbeijng_puple", "shangpinbeijng_yellow"];
    }
    static getMinterColor(type) {
        if (type == "1") {
            return "lanse";
        }
        if (type == "2") {
            return "lvse";
        }
        if (type == "3") {
            return "cs";
        }
        if (type == "4") {
            return "fs";
        }
        if (type == "5") {
            return "zs";
        }
        if (type == "6") {
            return "hs";
        }
    }
    static formatUserNickName(nickName, MaxWidth = 14, hideSuffix = false) {

        if (1 == 1) {
            return Utils.formatUserNickNameNew(nickName, MaxWidth);
        }

        if (!!!nickName) {
            return "";
        }
        // nickName = "名字有六个字WWWWW";
        let isMoreThan = false; //是否超出
        let width = 0;
        var charArray = [];
        for (let i = 0; i < nickName.length; i++) {
            let a = nickName.charAt(i);
            // if (" " != a) {
            //是否数字、字母
            if (a == "W" || a == "M" || a == "E") {
                width += 2;
            }
            else if (a == "w" || a == "m" || a == "e") {
                width += 1.5;
            }
            else if (a.match(/^[A-Z]/)) {
                //大写字母
                width += 1.3;
            }
            else if (a.match(/[^\x00-\xff]/gi)) {
                //汉字
                width += 2;
            }
            else {
                width += 1.1;
            }
            if (width > MaxWidth) {
                isMoreThan = true;
                break;
            }
            charArray.push(a);
            // }
        }
        if (charArray.length > 0) {
            // charArray.reverse();
            var nickNameNew = "";
            charArray.forEach((s) => {
                nickNameNew += s;
            });
            if (isMoreThan && !hideSuffix) {
                nickNameNew += "...";
            }
            return nickNameNew;
        }
        return nickName;
    }

    /**
     * 新的格式化用户昵称的方法 当长度超出时 前后比例 8:6 ，中间...
     * @param nickName  
     * @param MaxWidth 
     * @returns 
     */
     static formatUserNickNameNew(nickName, MaxWidth = 14) {
        if (!!!nickName) {
            return "";
        }
        // nickName = "名字有六个字WWWWW";
        let isMoreThan = false; //是否超出
        let width = 0;
        let charArray = [];
        let widthArray = [];

        for (let i = 0; i < nickName.length; i++) {
            let a = nickName.charAt(i);
            // if (" " != a) {
            //是否数字、字母
            if (a == "W" || a == "M" || a == "E") {
                width += 2;
                widthArray.push(2);
            }
            else if (a == "w" || a == "m" || a == "e") {
                width += 1.5;
                widthArray.push(1.5);
            }
            else if (a.match(/^[A-Z]/)) {
                //大写字母
                width += 1.3;
                widthArray.push(1.3);
            }
            else if (a.match(/[^\x00-\xff]/gi)) {
                //汉字
                width += 2;
                widthArray.push(2);
            }
            else {
                width += 1.1;
                widthArray.push(1.1);
            }
            // if (width > MaxWidth) {
            //     isMoreThan = true;
            //     break;
            // }
            charArray.push(a);
            // }
        }

        if (width > MaxWidth) {
            // charArray.reverse();
            var nickNameNew = "";

            let frontMax = Math.floor(MaxWidth * 8 / 14);
            let backMax = Math.floor(MaxWidth * 6 / 14);

            let frontWidth = 0;
            for (let i = 0; i < charArray.length; i++) {
                frontWidth += widthArray[i];

                if (frontWidth < frontMax) {
                    nickNameNew += charArray[i];
                } else {
                    break;
                }
            }

            nickNameNew += "...";

            let backNickNameChatArr = [];
            let backWidth = 0;
            for (let i = charArray.length - 1; i >= 0; i--) {
                backWidth += widthArray[i];

                if (backWidth < backMax) {
                    backNickNameChatArr.push(charArray[i]);
                } else {
                    break;
                }
            }

            backNickNameChatArr = backNickNameChatArr.reverse();

            for (let index = 0; index < backNickNameChatArr.length; index++) {
                let backChat = backNickNameChatArr[index];

                nickNameNew += backChat;

            }

            return nickNameNew;
        }


        return nickName;
    }


    /**
     * 复制文本到剪贴板(窗口需获取焦点)
     * @param str 文本内容
     */
     static copyToClipboard(str) {
        // if (Utils.isNative()) {
        //     egret.ExternalInterface.call("copyToClipboard", str);
        //     return true;
        // } else {
            let copy = document.createElement("input");
            copy.setAttribute('readOnly', 'readOnly');
            copy.setAttribute("type", "text");
            copy.setAttribute("value", str);
            copy.style.opacity = "0";
            copy.style.position = "absolute";
            document.body.appendChild(copy);
            copy.select();
            copy.setSelectionRange(0, copy.value.length);
            let status = document.execCommand('Copy');
            document.body.removeChild(copy);
            return status;
        // }
    }

    static getNum(num,pos){
        num = parseFloat(num);
        return Math.floor(num* pos) / pos   //输出结果为 15.77
    }
   

    static formatTime(t) {
        if (t < 0) {
            return "0";
        }
        var h = "";
        h = "" + (Number(t / (3600*24)) >> 0);
        return h;
      }
    /**
     * 时间格式化
     */
     static timeFomat(t) {
         if(t < 0){
             return "";
         }
        var h = "";
        var m = "";
        var s = "";
        h = "" + (Number(t / 3600) >> 0);
        if (h < 10) {
            h = "0" + h +"";
        }
        if ((h) > 0) {
            return h + "時";
        }
        m = String((Number((t - (h) * 3600) / 60)) >> 0);
        if ((m) < 10) {
            m = "0" + m;
        }
        s = String((Number((t - (h) * 3600 - (m) * 60))) >> 0);
        if ((s) < 10) {
            s = "0" + s;
        }
        return m + "分" + s + "秒";
    }
       
}