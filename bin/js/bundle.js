(function () {
    'use strict';

    class MyBaseData {

        //单例  
        constructor() {
            //单例  
            this.myMinesArr = [];
            this.minesArr = [];
            this.users = null;
            this.myJsonArr = [];
            this.minesCanCheckArr = [];
            this.getRedirectRewardArr = [];
            this.getThreeRewardArr = [];
            this.getIndirectRewardArr = [];
        }


        static get instance() {
            if (this._instance == null) {
                this._instance = new MyBaseData();
            }
            return this._instance;
        }

    //  struct Mine {
    // ​    uint8 types;  类型
    // ​    uint256 price; 价格
    // ​    uint256 gold; 维修金币
    // ​    uint256 everyDay; 每日释放
    //   }
        async mines(isUpdata = false) {
            if (isUpdata == false) {
                if (this.minesArr != null && this.minesArr.length > 0) {
                    return this.minesArr;
                }
                return [];
            }
            this.minesArr = [];
            var myMines1 = await Laya.Browser.window.mines(1); //测试调用html 方法
            var myMines2 = await Laya.Browser.window.mines(2); //测试调用html 方法
            var myMines3 = await Laya.Browser.window.goldShops(1); //测试调用html 方法
            var myMines4 = await Laya.Browser.window.goldShops(2); //测试调用html 方法
            var myMines5 = await Laya.Browser.window.goldShops(3); //测试调用html 方法
            this.minesArr = [myMines1, myMines2, myMines3, myMines4, myMines5];
            return this.minesArr;
        }


        // / ​    uint types; 矿机类型
        // ​    uint256 buyDays;  购买的日期
        // ​    uint256 checkTime;  下一次检查日期
        // ​    uint256 release; 释放了多少
        // ​    uint8 color; 颜色
        // ​    uint256 total;  领取了多少
        async getMyMinterData(isUpdata = false) {
            if (isUpdata == false) {
                if (this.myMinesArr != null && this.myMinesArr.length > 0) {
                    console.log("isUpdata---:",this.myMinesArr);
                    return this.myMinesArr;
                }
                return [];
            }
            this.myMinesArr = [];
            var getMinesIndex = await Laya.Browser.window.getMinesIndex(); //测试调用html 方法
            for (let i = 0; i < getMinesIndex.length; i++) {
                if (getMinesIndex[i] == "0") break;
                var mymines = await Laya.Browser.window.myMines(getMinesIndex[i]);
                this.myMinesArr.push(mymines);
            }
            return this.myMinesArr;
        }

        // indirectNum: "0"
        // indirectTotal: "0"
        // mineNum: "5"
        // myGold: "150"
        // receiveEth: "0"
        // receiveGold: "0"
        // redirectNum: "0"
        // redirectTotal: "0"
        // threeNum: "0"
        // threeTotal: "0"
        // welMember: "0x3f22a4feFD982Fbd0A365D777AD44042FBf71910"
        async getUsers(isUpdata = false) {
            if (isUpdata == false) {
                if (this.users != null) {
                    return this.users;
                }
                return [];
            }
            var users = await Laya.Browser.window.users(); //测试调用html 方法
            this.users = users;
            console.log("users::", users);
            return this.users;
        }

        async loadJson(name) {
            if (this.myJsonArr[name] != null) {
                return this.myJsonArr[name];
            }
            var myjson = null;
            return new Promise((resolve) => {
                Laya.loader.load("res/config/" + name + ".json", Laya.Handler.create(this, () => {
                    myjson = Laya.loader.getRes("res/config/" + name + ".json");
                    this.myJsonArr[name] = myjson;
                    resolve(myjson);
                }), null, Laya.Loader.JSON);
            })
        }

        getJsonTypeData(myjson, type, ydata) {
            var _arr = [];
            for (var i = 0; i < myjson.length; i++) {
                if (myjson[i][type] == ydata) {
                    _arr.push(myjson[i]);
                }
            }
            return _arr;
        }

        getJsonTypeData2(myjson, type, ydata, type2, ydata2) {
            var _arr = [];
            for (var i = 0; i < myjson.length; i++) {
                if (myjson[i][type] == ydata && myjson[i][type2] == ydata2) {
                    _arr.push(myjson[i]);
                }
            }
            return _arr;
        }
        //可维修的数组
        async getMinesCanCheck(isUpdata = false) {
            if (isUpdata == false) {
                if (this.minesCanCheckArr != null && this.minesCanCheckArr.length > 0) {
                    return this.minesCanCheckArr;
                }
                return [];
            }
            this.minesCanCheckArr = [];
            var getMinesIndex = await Laya.Browser.window.getMinesIndex(); //测试调用html 方法
            for (let i = 0; i < getMinesIndex.length; i++) {
                // if (getMinesIndex[i] == "0") break;
                var minesCanCheck = await Laya.Browser.window.minesCanCheck(getMinesIndex[i]);
                this.minesCanCheckArr.push(minesCanCheck);
            }
            return this.minesCanCheckArr;
        }
        
        async getRedirectReward(isUpdata = false){
            if (isUpdata == false) {
                if (this.getRedirectRewardArr != null && this.getRedirectRewardArr.length > 0) {
                    return this.getRedirectRewardArr;
                }
                return [];
            }
            this.getRedirectRewardArr = [];
            var getMinesIndex = await Laya.Browser.window.getRewardIndex(1); //测试调用html 方法
            for (let i = 0; i < getMinesIndex.length; i++) {
                if (getMinesIndex[i] == "0") break;
                var minesCanCheck = await Laya.Browser.window.redirectReward(getMinesIndex[i]);
                this.getRedirectRewardArr.push(minesCanCheck);
            }
            return this.getRedirectRewardArr;
        }

        async getIndirectReward(isUpdata = false){
            if (isUpdata == false) {
                if (this.getIndirectRewardArr != null && this.getIndirectRewardArr.length > 0) {
                    return this.getIndirectRewardArr;
                }
                return [];
            }
            this.getIndirectRewardArr = [];
            var getMinesIndex = await Laya.Browser.window.getRewardIndex(2); //测试调用html 方法
            for (let i = 0; i < getMinesIndex.length; i++) {
                if (getMinesIndex[i] == "0") break;
                var minesCanCheck = await Laya.Browser.window.indirectReward(getMinesIndex[i]);
                this.getIndirectRewardArr.push(minesCanCheck);
            }
            return this.getIndirectRewardArr;
        }

        async getThreeReward(isUpdata = false){
            if (isUpdata == false) {
                if (this.getThreeRewardArr != null && this.getThreeRewardArr.length > 0) {
                    return this.getThreeRewardArr;
                }
                return [];
            }
            this.getThreeRewardArr = [];
            var getMinesIndex = await Laya.Browser.window.getRewardIndex(3); //测试调用html 方法
            for (let i = 0; i < getMinesIndex.length; i++) {
                if (getMinesIndex[i] == "0") break;
                var minesCanCheck = await Laya.Browser.window.threeReward(getMinesIndex[i]);
                this.getThreeRewardArr.push(minesCanCheck);
            }
            return this.getThreeRewardArr;
        }


    }






    // 币合约授权

    // ######  	1.1  approve 

    // ​			**该接口是用户通过合约扣除自己的代理授权的。**

    // ​			请求参数说明：

    // ​			请求类型： POST还是GET类型 我也不知道。请参考以前代码怎么传的。

    // ​		

    // | 字段名  | 字段说明 | 字段类型 | 是否必填 |
    // | ------- | -------- | -------- | -------- |
    // | spender | 合约地址 | string   | 是       |
    // | amount  | 数量     | int      | 是       |

    // ## 二、业务合约

    // ### 3. 接口

    // ###### 	1.1 getMinesIndex  获取自己的所有矿机id。返回是数组

    // ###### 	1.2 BindWelMember 绑定推荐人



    // | 字段名 |  字段说明  | 字段类型 | 是否必填 |
    // | :----: | :--------: | :------: | :------: |
    // |  adds  | 邀请人地址 |  string  |    是    |

    // 返回：事件  event 

    // ```
    // addr :当前用户地址
    // welMember: 绑定的推荐人
    // result : 是否成功
    // ```

    // ###### 1.3 buyMine  购买矿机

    // ​	

    // | 字段名 | 字段说明 |           字段类型            | 是否必填 |
    // | :----: | :------: | :---------------------------: | :------: |
    // |  mid   | 矿机类型 | int（1 表示近况， 2表示银矿） |    是    |
    // | colors |   颜色   |    int(1-6自定义显示颜色)     |          |

    // 返回：事件  event 

    // ```
    // addr :地址
    // types:  类型
    // colors: 颜色
    // ```

    // ###### 1.4 signMine 每日维修



    // | 字段名 | 字段说明 | 字段类型 | 是否必填 |
    // | :----: | :------: | :------: | :------: |
    // |   id   |  矿机id  |   int    |    是    |

    // 1.5 getMineYesterday  领取奖励（矿机的）



    // | 字段名 | 字段说明 | 字段类型 | 是否必填 |
    // | :----: | :------: | :------: | :------: |
    // |   id   |  矿机id  |   int    |    是    |

    // 返回：事件  event 

    // ```
    // addr :地址
    // total: 数量
    // ```

    // ###### 1.6 buyGold 购买金币



    // | 字段名 | 字段说明 |   字段类型   | 是否必填 |
    // | :----: | :------: | :----------: | :------: |
    // | indexs | 金币的id | int（i,2 ,3) |    是    |

    // 返回：事件  event 

    // 1.7 getEth 佣金eth  返回：事件  event 

    // 1.8 getGold 佣金 金币  返回：事件  event 



    // 1.9 getRewardIndex 三代收益id

    // types： 1 代表直推  2代表间推 3 表示三代

    // 返回id 



    // 2.0  minesCanCheck 是否可以维修

    // minesId 矿机id

    // 返回 boolean



    // 剩下结构体。有系统内置的接口： 直接传id；




    //  struct User {
    // ​    uint8 mineNum;  矿机类型
    // ​    string nickName; 昵称
    // ​    uint256[6] mineIds;  矿机id数组
    // ​    address welMember; 邀请人
    // ​    uint256 myGold;  金币
    // ​    uint256 receiveEth; 返佣的eth
    // ​    uint256 receiveGold; 返佣的金币
    // ​    uint[] redirectIds; 直推返佣id
    // ​    uint[] indirectIds; 二代返佣id
    // ​    uint[] threeIds;  三代返佣id
    // ​    uint redirectNum; 直推人数
    // ​    uint indirectNum; 二代人数
    // ​    uint threeNum; 三代人数

    //   }





    //  struct Mine {
    // ​    uint8 types;  类型
    // ​    uint256 price; 价格
    // ​    uint256 gold; 维修金币
    // ​    uint256 everyDay; 每日释放
    //   }



    //  struct Commission {
    // ​    address addr; 购买人地址
    // ​    uint256 mineType; 购买的矿机类型
    // ​    uint256 reward; 奖励多少eth
    //   }

    //  struct MyMine {
    // ​    uint types; 矿机类型
    // ​    uint256 buyDays;  购买的日期
    // ​    uint256 checkTime;  下一次检查日期
    // ​    uint256 release; 释放了多少
    // ​    uint8 color; 颜色
    // ​    uint256 total;  领取了多少
    //   }
    // struct GoldShop {
    // ​    uint256 goldNum; 金币数量
    // ​    uint256 busdtNum; 购买价格
    //   }

    class MinterItem extends Laya.Script {

        constructor() { 
            super(); 
            /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
            let intType = 1000;
            /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
            let numType = 1000;
            /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
            let strType = "hello laya";
            /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
            let boolType = true;
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
        }
        
        onEnable() {
            console.log("  MinterItem  onEnable  ");
        }

        onDisable() {
        }

        onClick(){ 
            console.log(this.owner.getComponent(Laya.View));
            Laya.TimeLine.to(this.owner,{scaleX: 0.8,scaleY: 0.8}, 100)
            .to(this.owner,{scaleX:1,scaleY:1},100).play();

            var skeleton = new Laya.Skeleton();
        }
    }

    // this.colorItemArr = ["kuangji_blue", "kuangji_green", "kuangji_orange", "kuangji_pink", "kuangji_puple", "kuangji_yellow"];
    // this.colorBgArr = ["shangpinbeijng_blue", "shangpinbeijng_green", "shangpinbeijng_orange", "shangpinbeijng_pink", "shangpinbeijng_puple", "shangpinbeijng_yellow"];
    class Utils {

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

    class EventManager {

        constructor() {

            if(new.target !== EventManager){
                return
            }

            if (!EventManager.Singleton) {
                EventManager.Singleton = this;
                //初始化事件分发器对象
                this._dispather = new Laya.EventDispatcher();
            }
            return EventManager.Singleton;      
        }


        /**添加事件监听 */
        on(type, caller, listener, args = null) {
            this._dispather.on(type, caller, listener, args);
            
        }
        /**关闭事件监听 */
        off(type, caller, listener, onceOnly = false) {
            this._dispather.off(type, caller, listener, onceOnly);
        }
        /**执行一次后自动移除监听 */
        once(type, caller, listener, args = null) {
            this._dispather.once(type, caller, listener, args);
        }
        /**分发事件/抛出事件 */
        dispatch(type, data = null) {
            //console.log("type---->" + type);
            return this._dispather.event(type, data);
        }

    }

    class GameMgr extends Laya.Script {

        constructor() {
            super();

            //单例  
            if (!GameMgr.Instance) {
                GameMgr.Instance = this;
            }


            /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
            let intType = 1000;
            /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
            let numType = 1000;
            /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
            let strType = "hello laya";
            /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
            let boolType = true;
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0

            /** @prop {name:minter, tips:"矿机预制体", type:Prefab, default:null}*/
            this.minter = null;

            /** @prop {name:topPanel, tips:"头", type:Node, default:null}*/
            this.topPanel = null;
            /** @prop {name:ShopPanel, tips:"头", type:Node, default:null}*/
            this.ShopPanel = null;

            /** @prop {name:MyPanel, tips:"头", type:Node, default:null}*/
            this.MyPanel = null;

            /** @prop {name:BindinggFailePanel, tips:"头", type:Node, default:null}*/
            this.BindinggFailePanel = null;

            /** @prop {name:testerror, tips:"头", type:Node, default:null}*/
            this.testerror = null;




            //矿机参数信息
            //初始化 第一个矿机的位置信息
            this.InitPosX = 330;
            this.InitPosY = 655;

            //矿机间隔距离
            this.InternalX = 135;

            this.SameClownOffsetX = 105;

            this.SameRowOffsetY = 42;

            this.InternalY = 85;

            //几行几列
            this.InitRow = 2;
            this.InitClown = 3;


            this.MinterItems = [];


            //窗口相关
            /** @prop {name:LoadingPanel, tips:"登录面板", type:Node, default:null}*/
            this.LoadingPanel = null;

            /** @prop {name:BuildingPanel, tips:"矿机建设面板", type:Node, default:null}*/
            this.BuildingPanel = null;
            /** @prop {name:InvitationPanel, tips:"邀请面板", type:Node, default:null}*/
            this.InvitationPanel = null;


            //小人1 运动起始位置        
            this.xiaorene1StartPos = [625, 266];
            this.xiaorene1EndPos = [491, 324];
            //小人2 运动起始位置
            this.xiaorene2StartPos = [443, 177];
            this.xiaorene2EndPos = [605, 214];
            //机器人运动
            /** @prop {name:jiqiren1, tips:"机器人1号", type:Node, default:null}*/
            this.jiqiren1 = null;
            this.jiqiren1StartPos = [667, 803];
            this.jiqiren1EndPos = [308, 1173];

            /** @prop {name:jiqiren2, tips:"机器人2号", type:Node, default:null}*/
            this.jiqiren2 = null;
            this.jiqiren2StartPos = [408, 1000];
            this.jiqiren2EndPos = [7, 808];
            this.aniArr = [];
            this.kuagnjiArr = [];
            console.log("============================================");

        }


        onEnable() {

        }

        onDisable() {

        }

        onAwake() {
            this.LoadingPanel.visible = true;
        }
        onStart() {

            // console.log(GameMgr.getInstance == GameMgr.getInstance);

            // this.BuildingPanel.visible = true;
            // // this.InvitationPanel.sceneColor = "#2C3A55";
            // // Laya.stage.bgColor = "#efefef"
            // this.BuildingPanel.show();

            // var time = new Laya.Timer();
            // time.once(1500,this,()=>{
            //     //console.log(this.BuildingPanel);
            //     this.InvitationPanel.close();
            // });

            // var newPrefab = this.minter.create();
            // this.owner.addChild(newPrefab);

            // Laya.loader.load("res/TestPre.json",Laya.Handler.create(this,(prefabData)=>{
            //     var prefab = new Laya.Prefab();
            //     prefab.json = prefabData;

            // }));

            // console.log("gamemgr  onstart");
            // Laya.loader.load("res/atlas/res/game.atlas",Laya.Handler.create(this,()=>{


            //     this.AnimTex = Laya.loader.getRes("res/game/image-dizuo.png");

            //console.log(tex);

            // var sp = this.owner;
            // var sp = this.owner.getComponent(Laya.Sprite);

            // this.owner.graphics.clear();
            // this.owner.graphics.drawTexture(tex);
            // this.owner.texture = tex;


            // this.owner.loadImage("game.atlas/image-dizuo.png");

            //获得要切换的图片资源路径
            // var imgUrl = (this.flag = !this.flag)? this.monkey1:this.monkey2;
            // //加载显示图片，坐标位于100,50
            // this.img.loadImage(imgUrl, 100, 50);

            // var sp = new Laya.Sprite();
            // sp.graphics.drawTexture(tex);      
            this.InitAllAnim();
        }

        //所有主场景动画
        InitAllAnim() {
            //初始化所有主场景动画
            this.InitMinterItem("MinterItemAni.ani");
            this.playAnim("res/ani/damen/damen.sk", this, 190, 832);
            this.playAnim("res/ani/ditan/ditan.sk", this, 190, 920);
            this.playAnim("res/ani/dianti/dianti.sk", this, 195, 520);
            this.playAnim("res/ani/jiantou/jiantou.sk", this, 210, 945);
            this.playAnim("res/ani/luxian1/luxian1.sk", this, 210, 940);
            this.playAnim("res/ani/luxian2/luxian2.sk", this, 550, 980);
            this.playAnim("res/ani/luxian3/luxian3.sk", this, 380, 335, 0);
            //this.playAnim("res/ani/maoyan/maoyan.sk", this, 380,335);//没有设置位置，矿机用
            this.playAnim("res/ani/qiu/qiu.sk", this, 285, 1020);
            //this.playAnim("res/ani/weixian/weixian.sk", this, 285, 1020);
            this.playAnim("res/ani/xiaojiqi/xiaojiqi.sk", this, 217, 235);
            this.playAnim("res/ani/xiaojiqi2/xiaojiqi2.sk", this, 170, 305);
            this.playAnim("res/ani/xiaoren1/xaioren1.sk", this, 170, 305, -1, (anim) => {
                //console.log(anim);
                this.pathTween(anim, this.xiaorene1StartPos, this.xiaorene1EndPos, 3000, true, 5000);
            });

            this.playAnim("res/ani/xiaoren2/xaioren2.sk", this, 170, 305, -1, (anim) => {

                this.pathTween(anim, this.xiaorene2StartPos, this.xiaorene2EndPos, 3000, true, 5000);
            });

            this.playAnim("res/ani/xiegang/xiegang.sk", this, 455, 970);

            this.pathTween(this.jiqiren1, this.jiqiren1StartPos, this.jiqiren1EndPos, 5000, true, 8000);

            this.pathTween(this.jiqiren2, this.jiqiren2StartPos, this.jiqiren2EndPos, 4000, true, 6000);
            EventManager.Singleton.on("ShopToggle", this, () => {
                this.ShopPanel.visible = false;
                this.ShopPanel.close();


                // close.dispather.event(Laya.Event.CLICK);
            });

        }
        closeMyPanel() {
            this.MyPanel.visible = false;
            this.MyPanel.close();
        }
        //初始化矿机位置
        InitMinterItem(aniName) {

            Laya.loader.load("MinterItemAni.ani",
                Laya.Handler.create(this, (data) => {
                    // console.log(data["props"]["width"]);
                    var aimW = data["props"]["width"];
                    var aimH = data["props"]["height"];
                    this.LoadMinterItem(aimW, aimH, aniName);
                }));
        }

        LoadMinterItem(aimW, aimH, aniName) {
            for (var i = 0; i < this.InitRow; i++) {
                var rotate = i % 2 == 0 ? -5 : 0;
                var offsetX = i > 0 ? -this.SameClownOffsetX * i : 0;

                for (var j = 0; j < this.InitClown; j++) {
                    var tl = new Laya.Animation();
                    //加载动画文件
                    tl.loadAnimation(aniName);

                    //添加到舞台
                    this.owner.addChild(tl);
                    //播放Animation动画

                    var offsetY = j > 0 ? this.SameRowOffsetY * j : 0;

                    offsetY = rotate < 0 ? offsetY : offsetY + j * 12;

                    tl.pos(this.InitPosX + (j * this.InternalX) + offsetX, this.InitPosY + (i * this.InternalY) + offsetY);
                    tl.rotation = rotate;

                    tl.pivotX = aimW * 0.5;
                    tl.pivotY = aimH * 0.5;


                    tl.play(0, true, );


                    tl.addComponent(MinterItem);
                    tl.size(aimW, aimH);

                    this.MinterItems.push(tl);
                }
            }



        }

        async openInvitationPanel() {
            let user = await MyBaseData.instance.getUsers(true);
            if (user.welMember != 0) {
                return "1";
            }
            this.InvitationPanel.visible = true;
            GameMgr.Instance.showDialog(this.InvitationPanel);
            this.testerror.visible = false;
            let InputAddress = this.InvitationPanel.getChildByName("InputAddress"); //
            InputAddress.text = "";
            InputAddress.prompt = "请输入邀请人地址";
            let InvitationBtn = this.InvitationPanel.getChildByName("InvitationBtn"); //
            InvitationBtn.off(Laya.Event.CLICK, this, this.shouquan);
            InvitationBtn.on(Laya.Event.CLICK, this, this.shouquan);
        }

        async shouquan() {
            let InputAddress = this.InvitationPanel.getChildByName("InputAddress"); //
            var isaddress = Laya.Browser.window.isAddress(InputAddress.text);
            console.log("isaddress::", isaddress);
            if (isaddress == false) {
                this.testerror.visible = true;
                setTimeout(() => {
                    this.testerror.visible = false;
                }, 1000);
                return null;
            }
            let bindUserWelMember = await Laya.Browser.window.bindUserWelMember(InputAddress.text);
            if (bindUserWelMember == null || bindUserWelMember.status == false) {
                GameMgr.Instance.showDialog(this.BindinggFailePanel);
                return;
            }
            let getUsers = await MyBaseData.instance.getUsers(true);
            this.InvitationPanel.visible = false;
            return bindUserWelMember
        }



        setProgressIng(vis, pro = 0) {
            this.BuildingPanel.visible = vis;
            if (vis == false) return;
            var progress = this.BuildingPanel.getChildByName("progress");
            progress.value = pro;
            console.log("progress:", progress);
            this.owner.addChild(this.BuildingPanel);

        }
        getTextTip(_txt) {
            this._txt = _txt;
        }
        async setData(isUpdata = true) {
            return new Promise(async (resolve) => {
                if (this._txt != null) {
                    // this._txt.text = "10%"
                }
                await MyBaseData.instance.getMyMinterData(true);
                if (this._txt != null) {
                    // this._txt.text = "30%"
                }
                await MyBaseData.instance.getUsers(true);
                if (this._txt != null) {
                    // this._txt.text = "40%"
                }
                await MyBaseData.instance.getMinesCanCheck(true);
                if (isUpdata == true) {
                    this.updataGame();
                }
                resolve(true);
            })

        }
        async updataGame() {
            var a = this.owner.getChildByName("Center");
            this.owner.addChildAt(a, 0);
            var myMinterArr = await MyBaseData.instance.getMyMinterData(true);
            var getMinesIndex = await Laya.Browser.window.getMinesIndex(); //测试调用html 方法
            // console.log("myMinterArr:", getMinesIndex);
            var user = await MyBaseData.instance.getUsers();
            this.topPanel.getChildByName("AddCoinBtn").label = "" + user.myGold;
            let m = 0;
            for (var i = 0; i < this.kuagnjiArr.length; i++) {
                m++;
            }
            // console.log("myMinterArr::", myMinterArr);
            for (let i = m; i < myMinterArr.length && i < 6; i++) {
                if(this.kuagnjiArr[i] != null && this.kuagnjiArr[i] != undefined ) return;
                var color = Utils.getMinterColor(myMinterArr[i].color);
                console.log("color:", color);
                GameMgr.Instance.playAnim("res/ani/kuangji/" + color + ".sk", this, this.MinterItems[i].x, this.MinterItems[i].y - 70, -1, async (skeleton) => {
                    var boo = await Laya.Browser.window.minesCanCheck(getMinesIndex[i]);
                    // console.log("iiiiiiiiiiiiiiiii::", i, boo);
                    if (boo == true) {
                        this.kuagnjiArr[i].stop();
                    } else {
                        this.kuagnjiArr[i].play(0, true);
                    }
                }, true ,i);
                // GameMgr.Instance.playAnim("res/ani/jingbao/" + "baojing" + ".sk", this, this.MinterItems[i].x, this.MinterItems[i].y - 70, -1, null, true);
            }

            this.BuildingPanel.visible = false;
            this.openInvitationPanel();
            if (this.kuagnjiArr.length >= myMinterArr.length) {
                this.isXiuli();
            }
        }
        async isXiuli() {
            if (this.kuagnjiArr == null) return;
            var minesCanCheckArr = await MyBaseData.instance.getMinesCanCheck(true);
            for (var i = 0; i < this.kuagnjiArr.length; i++) {
                if (minesCanCheckArr[i] == false) {
                    this.kuagnjiArr[i].play(0, true);
                } else {
                    this.kuagnjiArr[i].play(0, false);
                }
                this.owner.addChild(this.kuagnjiArr[i]);
            }
        }
        //播放动画 参数说明：动画加载路径，对象加载成功放置的父节点，位置坐标X，位置坐标Y，父节点的位置索引
        playAnim(animPath, obj, posX, posY, index = -1, callBack = null, iskuangji = false, mm = -1) {
            // console.log("iiiiiiiiiiiiiiiii:mm:", mm);
            var templetStone = new Laya.Templet();
            templetStone.off(Laya.Event.COMPLETE, this, this.templetFun = () => {});
            templetStone.on(Laya.Event.COMPLETE, this, this.templetFun = () => {
                //从动画模板创建动画播放对象
                var skeleton = templetStone.buildArmature(0);
                skeleton.pos(posX, posY);
                //播放
                skeleton.play(0, true);


                obj.owner.addChild(skeleton);
                if (index == -1) {
                    obj.owner.addChild(skeleton);
                } else {
                    obj.owner.setChildIndex(skeleton, index);
                }

                if (callBack != null) {
                    callBack(skeleton);
                }

                if (iskuangji == true) {
                    skeleton.stop();
                    this.kuagnjiArr[mm] = skeleton;
                } else {
                    if (this.aniArr[animPath] == null)
                        this.aniArr[animPath] = skeleton;
                }
            });
            templetStone.loadAni(animPath);

        }

        playerLongguAni() {
            var skeleton = new Laya.Skeleton();
            //添加到舞台
            this.addChild(skeleton);
            skeleton.pos(300, 350);
            //通过加载直接创建动画
            skeleton.load("res/skeletonEffect/win/xiaobingWIN.sk", new Laya.Handler(this, function () {
                // console.log("!!!!!!!!!!!!!!!!!!!~~~~",skeleton.getAnimNum());
                skeleton.play(1, false);
            }, null, true));
        }



        closeAnim(animPath, obj) {
            if (this.aniArr == null) return;
            if (this.aniArr[animPath] == null) return;
            obj.owner.removeChild(this.aniArr[animPath]);
        }

        closeAnimKuangji() {
            if (this.kuagnjiArr == null) return;
            for (var i = 0; i < this.kuagnjiArr.length; i++) {
                if (this.kuagnjiArr[i] != null)
                    this.owner.removeChild(this.kuagnjiArr[i]);
            }

        }


        //点击动画 任何节点类型
        clickTween(obj) {
            Laya.TimeLine.to(obj, {
                    scaleX: 0.8,
                    scaleY: 0.8
                }, 100)
                .to(obj, {
                    scaleX: 1,
                    scaleY: 1
                }, 100).play();
        }

        //路径动画
        pathTween(obj, startPos, endPos, playTime, loop, looptime) {
            obj.visible = true;
            obj.x = startPos[0];
            obj.y = startPos[1];

            Laya.Tween.to(obj, {
                    x: endPos[0],
                    y: endPos[1]
                }, playTime, Laya.Ease.linearIn,
                Laya.Handler.create(this, () => {
                    obj.x = startPos[0];
                    obj.y = startPos[1];
                    obj.visible = false;
                })
            );

            if (loop) {
                var timer = new Laya.Timer();
                timer.loop(looptime, this, () => {
                    //console.log("开始运动---->"+endPos[0] + ","+endPos[1]);                
                    obj.visible = true;
                    Laya.Tween.to(obj, {
                            x: endPos[0],
                            y: endPos[1]
                        }, playTime, Laya.Ease.linearIn,
                        Laya.Handler.create(this, () => {
                            obj.x = startPos[0];
                            obj.y = startPos[1];
                            obj.visible = false;
                        })
                    );
                });
            }

        }

        //打开Dialog
        showDialog(dialog) {
            dialog.visible = true;
            dialog.show();
        }

        //关闭dialog
        closeDialog() {
            // console.log("this============",dialog);
            dialog.visible = false;
            dialog.close();
        }
    }

    class AddCoinBtn extends Laya.Script {

        constructor() { 
            super(); 
            /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
            let intType = 1000;
            /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
            let numType = 1000;
            /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
            let strType = "hello laya";
            /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
            let boolType = true;
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
        }
        
        onEnable() {

        }

        onDisable() {
        
        }

        onClick(){
            this.clickTween();
        //    this.owner.lable
        }

        clickTween(){
            console.log(this.owner.getComponent(Laya.View));
            Laya.TimeLine.to(this.owner,{scaleX: 0.8,scaleY: 0.8}, 100)
            .to(this.owner,{scaleX:1,scaleY:1},100).play();
        }
    }

    class UIButton extends Laya.Script {

        constructor() { 
            super(); 
            /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
            let intType = 1000;
            /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
            let numType = 1000;
            /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
            let strType = "hello laya";
            /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
            let boolType = true;
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0

            /** @prop {name:normalImg, tips:"正常状态图片", type:Node, default:null}*/
            this.normalImg = null;

             /** @prop {name:selectedImg, tips:"选择状态图片", type:Node, default:null}*/
            this.selectedImg = null;

            this.normalColor = "#ffffff";
            this.selectColor = "#3AD6E3";
          
        }
        
        onEnable() {
           
        }

        onDisable() {
        }

        onClick(){
            this.clickTween();
            new EventManager().dispatch("UiButtonClick",this.owner.name);
        }

        clickTween(){
            // console.log(this.owner.getComponent(Laya.View));
            Laya.TimeLine.to(this.owner,{scaleX: 0.8,scaleY: 0.8}, 100)
            .to(this.owner,{scaleX:1,scaleY:1},100).play();
        }

        selectItem(select){
            //console.log("select-------------------------:"+select);
            this.normalImg.visible = !select;
            this.selectedImg.visible = select; 
            
            this.owner.labelColors = select?this.selectColor:this.normalColor;
            
        }

    }

    class ShopItem extends Laya.Script {

        constructor() { 
            super(); 
            /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
            let intType = 1000;
            /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
            let numType = 1000;
            /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
            let strType = "hello laya";
            /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
            let boolType = true;
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
              /** @prop {name:itemBtn, tips:"ItemButton", type:Node, default:null}*/
            
            this.ShopItemDta = {id:-1};//id 默认-1
        }
        
        onEnable() {
        }

        onDisable() {
        }

        setShopItemData(id){
            this.ShopItemDta.id = id;
        }
    }

    class ShopList extends Laya.Script {

        constructor() {
            super();
            /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
            let intType = 1000;
            /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
            let numType = 1000;
            /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
            let strType = "hello laya";
            /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
            let boolType = true;
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0

            this.ShopItemArr = [];
            // shangpinbeijng_green


        }

        onEnable() {
            this.type = 1;
        }

        onDisable() {
            this.type = 1;
        }

        onStart() {
            this.type = 1;
            // this.onInitData(1);

        }

        async buyGoleView() {
            var allMinner = await MyBaseData.instance.loadJson("allMinner");
            var _arr = MyBaseData.instance.getJsonTypeData(allMinner, "minner_type", 3);
            var minesArr = await MyBaseData.instance.mines();
            for (let index = 2; index < 5; index++) {
                var busdtNum = Laya.Browser.window.fromWei(minesArr[index].busdtNum);
                var data = {
                    MinerPrice: {
                        text: busdtNum + " ETHG"
                    },
                    gold_txt: {
                        text: minesArr[index].goldNum + " Coins"
                    },
                    MinerName: {
                        text: _arr[index - 2].minner_name
                    },
                    MinerDes: {
                        text: _arr[index - 2].minner_ex
                    },
                };
                this.ShopItemArr.push(data);
            }
            this.owner.array = this.ShopItemArr;
            this.owner.repeatY = 3;
            this.owner.vScrollBarSkin = "";
            this.owner.refresh();
            for (var index = 0; index < 3; index++) {
                var item = this.owner.cells[index];
                // item.getChildByName("gold_txt").visible = false;
                // if(type == 3){
                item.getChildByName("MinerName").visible = false;

                item.getChildByName("gold_txt").visible = true;
                // }
                var btn = item.getChildByName("ItemBuyBtn");
                var itemIcon = item.getChildByName("ItemIcon"); //jibi1@2x
                // itemIcon.skin = "res/ui/shopPanel/jibi" + (index + 1) + "@2x .png";
                itemIcon.skin = "res/ui/shopPanel/jinbi" + (index + 1) + "@2x.png";
                var itemIconFrame = item.getChildByName("ItemIconFrame");
                itemIconFrame.skin = "res/ui/shopPanel/shangpinbeijing-jinbi@2x.png";

                var shopItem = item.getComponent(ShopItem);
                shopItem.ShopItemDta = {
                    id: index + 1
                }; //初始化id

                //console.log(shopItem.ShopItemDta);
                btn.off(Laya.Event.CLICK, this, this.onItemBuyBtnClick2);
                btn.off(Laya.Event.MOUSE_OVER, this, this.hoverTweenOVER);
                btn.off(Laya.Event.MOUSE_OUT, this, this.hoverTweenOut);
                btn.on(Laya.Event.CLICK, this, this.onItemBuyBtnClick2, [{
                    btn: btn,
                    shopItemData: shopItem.ShopItemDta,
                    showType: 3
                }]);
                btn.on(Laya.Event.MOUSE_OVER, this, this.hoverTweenOVER, [btn]);
                btn.on(Laya.Event.MOUSE_OUT, this, this.hoverTweenOut, [btn]);
                //console.log(btn);
            }
        }

        async onItemBuyBtnClick2(data) {
            this.clickTween(data.btn);
            EventManager.Singleton.dispatch("ShopToggle");
            var sq = await GameMgr.Instance.openInvitationPanel();
            if (data.showType == "3" || data.showType == 3) {
                var res = await Laya.Browser.window.buyGold(data.shopItemData.id); //测试调用html 方法

                if (res != null && res.status == true) {
                    GameMgr.Instance.setData();
                } else {
                    GameMgr.Instance.setProgressIng(false);
                }
            }
        }



        async onInitData(type) {
            //todo 获取网络数据
            this.ShopItemArr = [];
            this.type = type;
            // console.log("this.type ::",this.type );
            if (this.type == 3) {
                this.buyGoleView(3);
                return;
            }
            var minesArr = await MyBaseData.instance.mines();
            var price = Laya.Browser.window.fromWei(minesArr[type - 1].price);
            var allMinner = await MyBaseData.instance.loadJson("allMinner");
            var _arr = MyBaseData.instance.getJsonTypeData(allMinner, "minner_type", this.type);
            for (let index = 0; index < Utils.colorItemArr.length; index++) {
                var data = {
                    MinerPrice: {
                        text: price + " ETH"
                    },
                    MinerName: {
                        text: _arr[index].minner_name
                    },
                    MinerDes: {
                        text: _arr[index].minner_ex
                    },
                };
                this.ShopItemArr.push(data);
            }
            this.owner.array = this.ShopItemArr;
            this.owner.repeatY = 6;
            this.owner.vScrollBarSkin = "";
            this.owner.refresh();

            for (var index = 0; index < Utils.colorItemArr.length; index++) {
                var item = this.owner.cells[index];
                item.getChildByName("MinerName").visible = true;
                item.getChildByName("gold_txt").visible = false;
                if (type == 3) {
                    item.getChildByName("gold_txt").visible = true;
                }
                var btn = item.getChildByName("ItemBuyBtn");
                var itemIcon = item.getChildByName("ItemIcon");
                itemIcon.skin = "res/ui/shopPanel/" + Utils.colorItemArr[index] + ".png";
                var itemIconFrame = item.getChildByName("ItemIconFrame");
                itemIconFrame.skin = "res/ui/shopPanel/" + Utils.colorBgArr[index] + ".png";

                var shopItem = item.getComponent(ShopItem);
                shopItem.ShopItemDta = {
                    id: index + 1
                }; //初始化id
                btn.off(Laya.Event.CLICK, this, this.onItemBuyBtnClick);
                btn.off(Laya.Event.MOUSE_OVER, this, this.hoverTweenOVER);
                btn.off(Laya.Event.MOUSE_OUT, this, this.hoverTweenOut);
                btn.on(Laya.Event.CLICK, this, this.onItemBuyBtnClick, [{
                    btn: btn,
                    shopItemData: shopItem.ShopItemDta,
                    showType: type

                }]);
                btn.on(Laya.Event.MOUSE_OVER, this, this.hoverTweenOVER, [btn]);
                btn.on(Laya.Event.MOUSE_OUT, this, this.hoverTweenOut, [btn]);

            }
        }

        async onItemBuyBtnClick(data) {
            this.clickTween(data.btn);
            EventManager.Singleton.dispatch("ShopToggle");
            var sq = await GameMgr.Instance.openInvitationPanel();
            if (sq == null) return;
            var minesArr = await MyBaseData.instance.getMyMinterData();
            if (minesArr.length >= 6) {
                // console.log("=================已到最大数量===============");
            }
            GameMgr.Instance.setProgressIng(true);
            var res = await Laya.Browser.window.buyMine(data.showType, data.shopItemData.id); //测试调用html 方法
            if (res != null && res.status == true) {
                GameMgr.Instance.setData();
            } else {
                GameMgr.Instance.setProgressIng(false);
            }

        }

        clickTween(btn) {
            Laya.TimeLine.to(btn, {
                    scaleX: 0.8,
                    scaleY: 0.8
                }, 100)
                .to(btn, {
                    scaleX: 1,
                    scaleY: 1
                }, 100).play();
        }

        hoverTweenOVER(btn) {
            Laya.TimeLine.to(btn, {
                scaleX: 1.05,
                scaleY: 1.05
            }, 100).play();

        }

        hoverTweenOut(btn) {
            Laya.TimeLine.to(btn, {
                scaleX: 1,
                scaleY: 1
            }, 100).play();
        }

    }

    class ShopToggle extends Laya.Script {

        constructor() {
            super();
            /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
            let intType = 1000;
            /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
            let numType = 1000;
            /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
            let strType = "hello laya";
            /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
            let boolType = true;
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0

            /** @prop {name:toggleGoldBtn, tips:"金矿机页签", type:Node, default:null}*/
            this.toggleGoldBtn = null;
            /** @prop {name:toggleSliverBtn, tips:"银矿机页签", type:Node, default:null}*/
            this.toggleSliverBtn = null;
            /** @prop {name:toggleCoinBtn, tips:"金币页签", type:Node, default:null}*/
            this.toggleCoinBtn = null;

            /** @prop {name:toggleNornalImg, tips:"未选图片", type:Node, default:null}*/
            this.toggleNornalImg = null;
            /** @prop {name:toggleSelectedImg, tips:"选中图片", type:Node, default:null}*/
            this.toggleSelectedImg = null;

            /** @prop {name:shopList, tips:"商店列表", type:Node, default:null}*/
            this.shopList = null;

            this.ToggleMap = new Map();

            this.normalLabelColor = "#7088B2";
            this.selectLabelColor = "#B3C7D7";

            // 金币描述 Increase NT revenue of desugnated mining\npools by 30% for 2 hours
            //矿机描述  ETHG is a completely independent chain\ngame platform, which is safe transparent\nand decentralized.
        }

        onEnable() {}

        onDisable() {

            this.onToggleGoldBtnClick();
        }

        onAwake() {

            this.initToggle();
            
        }

        onStart() {

        }

        initToggle() {
            this.ToggleMap.set(this.toggleGoldBtn.name, this.toggleGoldBtn);
            this.ToggleMap.set(this.toggleSliverBtn.name, this.toggleSliverBtn);
            this.ToggleMap.set(this.toggleCoinBtn.name, this.toggleCoinBtn);

            this.toggleGoldBtn.on(Laya.Event.CLICK, this, this.onToggleGoldBtnClick);
            this.toggleSliverBtn.on(Laya.Event.CLICK, this, this.onToggleSliverBtnClick);
            this.toggleCoinBtn.on(Laya.Event.CLICK, this, this.onToggleCoinBtnClick);
            // console.log(this.ToggleMap);

            
        }

        onToggleGoldBtnClick() {
            this.onToggleClick("TagGoldBtn");
        }
        onToggleSliverBtnClick() {
            this.onToggleClick("TagSliverBtn");
        }
        onToggleCoinBtnClick() {
            this.onToggleClick("TagCoinBtn");
        }

        onToggleClick(toggleName) {
            let type = -1;
            if (toggleName == "TagGoldBtn") {
                type = 1;
            } else if (toggleName == "TagSliverBtn") {
                type = 2;
            } else if (toggleName == "TagCoinBtn") {
                type = 3;
            }
            this.shopList.getComponent(ShopList).onInitData(type);

            var normalLabelColor = this.normalLabelColor;
            var selectLabelColor = this.selectLabelColor;

            var normalImg = this.toggleNornalImg;
            var selectImg = this.toggleSelectedImg;

            this.ToggleMap.forEach(function (value, key, map) {
                value.skin = toggleName == key ? selectImg.skin : normalImg.skin;
                value.labelColors = toggleName == key ? selectLabelColor : normalLabelColor;

            });
        }
    }

    class BottomPanel extends Laya.Script {

        constructor() {
            super();
            /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
            let intType = 1000;
            /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
            let numType = 1000;
            /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
            let strType = "hello laya";
            /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
            let boolType = true;
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0

            this.BtnMap = new Map();
            this.CurSelectedBtn; //当前选择的btn
            this.DefaultBtn;

            //窗口相关
            /** @prop {name:ShopDialog, tips:"商店弹窗", type:Node, default:null}*/
            this.ShopDialog = null;
            /** @prop {name:TeamDialog, tips:"团队弹窗", type:Node, default:null}*/
            this.TeamDialog = null;
            /** @prop {name:RepairDialog, tips:"维修弹窗", type:Node, default:null}*/
            this.RepairDialog = null;
            /** @prop {name:MeDialog, tips:"我的弹窗", type:Node, default:null}*/
            this.MeDialog = null;
            this.initUi = false;
            this.isClick = false;
        }

        onEnable() {}

        onDisable() {

        }

        onAwake() {
            //初始化按钮组件
            var len = this.owner.numChildren;
            //console.log(len);

            for (var i = 0; i < len; i++) {
                var btnComp = this.owner.getChildAt(i).getComponent(UIButton);
                if (btnComp == null) {
                    continue;
                }
                // console.log(btnComp.owner.name);
                this.BtnMap.set(btnComp.owner.name, btnComp);
                if (!this.DefaultBtn) {
                    this.DefaultBtn = btnComp.owner.name;
                }
            }
            this.isClick = false;
            new EventManager().on("UiButtonClick", this, this.onBtnClick);
            //  console.log("事件添加完毕-->"+(new EventManager() == new EventManager())); 

        }

        onStart() {
            this.onBtnClick(""); //默认打开第一个
        }
        
        async onBtnClick(clickBtn) {
            if(this.isClick == true){
                return;
            }
            this.isClick = true;
            // setTimeout(()=>{
            //     this.isClick = false;
            // },1000)
            console.log("==========================");

            this.CurSelectedBtn = this.BtnMap.get(clickBtn);
            this.setBtnState(this.CurSelectedBtn);

            if (clickBtn == "ShopBtn") {
                GameMgr.Instance.showDialog(this.ShopDialog);

            } else if (clickBtn == "TeamBtn") {
                GameMgr.Instance.setProgressIng(true, 0.2);
                await MyBaseData.instance.getRedirectReward(true);
                GameMgr.Instance.setProgressIng(true, 0.4);
                await MyBaseData.instance.getIndirectReward(true);
                GameMgr.Instance.setProgressIng(true, 0.7);
                await MyBaseData.instance.getThreeReward(true);
                GameMgr.Instance.setProgressIng(true, 0.9);
                GameMgr.Instance.showDialog(this.TeamDialog);
                GameMgr.Instance.setProgressIng(false);

            } else if (clickBtn == "RepairBtn") {

                this.initUi = false;
                GameMgr.Instance.setProgressIng(true, 0.2);
                await MyBaseData.instance.getMinesCanCheck(true);
                GameMgr.Instance.setProgressIng(true, 0.6);
                await MyBaseData.instance.getMyMinterData(true);
                GameMgr.Instance.setProgressIng(true, 0.8);
                GameMgr.Instance.showDialog(this.RepairDialog);
                GameMgr.Instance.setProgressIng(false);
                this.initUi = true;

            } else if (clickBtn == "MeBtn") {
                this.initUi = false;
                GameMgr.Instance.setProgressIng(true, 0.2);
                await MyBaseData.instance.getMyMinterData(true);
                setTimeout(() => {
                    if (this.initUi == false) {
                        GameMgr.Instance.setProgressIng(true, 0.5);
                    }
                }, 400);
                setTimeout(() => {
                    if (this.initUi == false) {
                        GameMgr.Instance.setProgressIng(true, 0.8);
                    }
                }, 800);
                GameMgr.Instance.showDialog(this.MeDialog);
                GameMgr.Instance.setProgressIng(false);
                this.initUi = true;
            }
            this.isClick = false;
            // console.log("收到点击事件 UiButtonClick:" + this.CurSelectedBtn);
        }

        setBtnState(selectBtn) {
            // console.log(this.BtnMap);
            this.BtnMap.forEach(function (value, key, map) {
                value.selectItem(value == selectBtn);
            });
        }
    }

    class MyPanelTogle extends Laya.Script {

        constructor() {
            super();
            /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
            let intType = 1000;
            /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
            let numType = 1000;
            /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
            let strType = "hello laya";
            /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
            let boolType = true;
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0

            /** @prop {name:MyMinerBtn, tips:"金矿机页签", type:Node, default:null}*/
            this.MyMinerBtn = null;
            /** @prop {name:MyHomeBtn, tips:"银矿机页签", type:Node, default:null}*/
            this.MyHomeBtn = null;

            /** @prop {name:toggleNornalImg, tips:"未选图片", type:Node, default:null}*/
            this.toggleNornalImg = null;
            /** @prop {name:toggleSelectedImg, tips:"选中图片", type:Node, default:null}*/
            this.toggleSelectedImg = null;


            /** @prop {name:shopList, tips:"矿机数组", type:Node, default:null}*/
            this.shopList = null;
            /** @prop {name:myHomeItem, tips:"我的数据", type:Node, default:null}*/
            this.myHomeItem = null;



            this.ToggleMap = new Map();

            this.normalLabelColor = "#7088B2";
            this.selectLabelColor = "#B3C7D7";
            this.ShopItemArr = [];

        }

        onEnable() {

            this.onToggleMyMinerBtnClick();
            this.onInitData();
        }

        onDisable() {
            this.shopList.array = [];
            this.shopList.repeatY = 0;
            this.shopList.vScrollBarSkin = "";
            this.shopList.refresh();
        }

        onAwake() {
            this.initToggle();

        }

        onStart() {
            this.shopList.array = [];
            this.shopList.repeatY = 0;
            this.shopList.vScrollBarSkin = "";
            this.shopList.refresh();
        }

        initToggle() {
            this.ToggleMap.set(this.MyMinerBtn.name, this.MyMinerBtn);
            this.ToggleMap.set(this.MyHomeBtn.name, this.MyHomeBtn);

            this.MyMinerBtn.on(Laya.Event.CLICK, this, this.onToggleMyMinerBtnClick);
            this.MyHomeBtn.on(Laya.Event.CLICK, this, this.onToggleMyHomeBtnClick);
            // console.log(this.ToggleMap);

        }

        onToggleMyMinerBtnClick() {
            this.onToggleClick("MyMinerBtn");
            this.myHomeItem.visible = false;
            this.shopList.visible = true;



        }
        onToggleMyHomeBtnClick() {
            this.onToggleClick("MyHomeBtn");
            this.shopList.visible = false;
            this.myHomeItem.visible = true;
            this.MyHome();
        }
        async MyHome() {
            var getUsers = await MyBaseData.instance.getUsers();
            
            
            if(getUsers.nickName == ""){
                var ss = Utils.formatUserNickNameNew(localStorage.getItem('account'));
            }else{
                var ss = Utils.formatUserNickNameNew(getUsers.nickName);
            }

            this.myHomeItem.getChildByName("PlayerName").text = ss;
            this.myHomeItem.getChildByName("MinerAddress").text = "" + localStorage.getItem('account');
            var btn1 = this.myHomeItem.getChildByName("CopyAddressBtn");
            btn1.on(Laya.Event.CLICK, this, (e) => {
                Utils.copyToClipboard(localStorage.getItem('account'));
                
            }, [{
                btn: btn1
                // shopItemData: shopItem.ShopItemDta
            }]);
            btn1.on(Laya.Event.MOUSE_OVER, this, this.hoverTweenOVER, [btn1]);
            btn1.on(Laya.Event.MOUSE_OUT, this, this.hoverTweenOut, [btn1]);

            var btn2 = this.myHomeItem.getChildByName("LogoutBtn");
            btn2.on(Laya.Event.CLICK, this, () => {
                // localStorage.removeItem('account');
                GameMgr.Instance.showDialog(GameMgr.Instance.LoadingPanel);
                GameMgr.Instance.closeMyPanel();
           
            }, [{
                btn: btn2
                // shopItemData: shopItem.ShopItemDta
            }]);
            btn2.on(Laya.Event.MOUSE_OVER, this, this.hoverTweenOVER, [btn2]);
            btn2.on(Laya.Event.MOUSE_OUT, this, this.hoverTweenOut, [btn2]);


            var ModifyNameBtn = this.myHomeItem.getChildByName("ModifyNameBtn");
            var minerAddress = this.myHomeItem.getChildByName("PlayerName");
            ModifyNameBtn.on(Laya.Event.CLICK, this, async(e) => {
                var ss2 = minerAddress.text ;
       
                if(ss2 != "") {
                    var setNickName2 = await Laya.Browser.window.setNickName(ss2); //测试调用html 方法
                    if(setNickName2 == null || setNickName2.status == false){
                        return;
                    }
                     await MyBaseData.instance.getUsers(true);
                }
               
            });

        }


        async onInitData() {
            //todo 获取网络数据
            this.ShopItemArr = [];
            var minesArr = await MyBaseData.instance.getMyMinterData();

            // var price = Laya.Browser.window.fromWei(minesArr[type - 1].price)

            var allMinner = await MyBaseData.instance.loadJson("allMinner");
            var getTodayTime = await Laya.Browser.window.getTodayTime(); 

            for (let i = 0; i < minesArr.length; i++) {
                let _arr = MyBaseData.instance.getJsonTypeData2(allMinner, "minner_id", minesArr[i].color, "minner_type", minesArr[i].types);

                var data = {
                    MinerName: {
                        text: _arr[0].minner_name
                    },
                    // MinerTotalRevenue: {
                    //     text: Utils.getNum(Laya.Browser.window.fromWei(minesArr[i].release), 1000)
                    // },
                    MinerExtracted: {
                        text: Utils.getNum(Laya.Browser.window.fromWei(minesArr[i].total), 1000)
                    },
                    MinerTotalDays: {
                        text: Utils.formatTime(getTodayTime - minesArr[i].buyDays )  
                    },
                    // MinerTotalRevenue:Utils.getNum(Laya.Browser.window.fromWei(minesArr[i].release), 1000)
                };
                this.ShopItemArr.push(data);
            }
            this.shopList.array = this.ShopItemArr;
            this.shopList.repeatY = this.ShopItemArr.length;
            this.shopList.vScrollBarSkin = "";
            this.shopList.refresh();
            for (var index = 0; index < this.ShopItemArr.length; index++) {
                var item = this.shopList.cells[index];
                var btn = item.getChildByName("ReceiveBuy");
                var itemIcon = item.getChildByName("ItemIcon");
                var MinerTotalRevenue = item.getChildByName("MinerTotalRevenue");
              
                var str = Utils.getNum(Laya.Browser.window.fromWei(minesArr[index].release), 1000) + " ETH";

                MinerTotalRevenue.text = str;
                var color = parseInt(minesArr[index].color) - 1;

                itemIcon.skin = "res/ui/shopPanel/" + Utils.colorItemArr[color] + ".png";
                var itemIconFrame = item.getChildByName("ItemIconFrame");
                itemIconFrame.skin = "res/ui/shopPanel/" + Utils.colorItemArr[index] + ".png";

                // var shopItem = item.getComponent(ShopItem); 
                // shopItem.ShopItemDta = {
                //     id: index + 1
                // } //初始化id

                //console.log(shopItem.ShopItemDta);
                btn.on(Laya.Event.CLICK, this, this.onItemBuyBtnClick, [{
                    btn: btn,
                    id: index
                    // shopItemData: shopItem.ShopItemDta
                }]);
                btn.on(Laya.Event.MOUSE_OVER, this, this.hoverTweenOVER, [btn]);
                btn.on(Laya.Event.MOUSE_OUT, this, this.hoverTweenOut, [btn]);
                //console.log(btn);
            }
        }
        async onItemBuyBtnClick(data) {

            GameMgr.Instance.setProgressIng(true);
            GameMgr.Instance.closeMyPanel();
            var getMinesIndex = await Laya.Browser.window.getMinesIndex();
            var getMineYesterday = await Laya.Browser.window.getMineYesterday(getMinesIndex[data.id]);

            if (getMineYesterday != null && getMineYesterday.status == true) {
                await MyBaseData.instance.getMinesCanCheck(true);
                await GameMgr.Instance.setData();
            }else{
                GameMgr.Instance.setProgressIng(false);
            }
        }



        
        hoverTweenOVER(btn) {
            Laya.TimeLine.to(btn, {
                scaleX: 1.05,
                scaleY: 1.05
            }, 100).play();

        }

        hoverTweenOut(btn) {
            Laya.TimeLine.to(btn, {
                scaleX: 1,
                scaleY: 1
            }, 100).play();
        }

        onToggleClick(toggleName) {
            // console.log(toggleName);

            var normalLabelColor = this.normalLabelColor;
            var selectLabelColor = this.selectLabelColor;

            var normalImg = this.toggleNornalImg;
            var selectImg = this.toggleSelectedImg;

            this.ToggleMap.forEach(function (value, key, map) {
                value.skin = toggleName == key ? selectImg.skin : normalImg.skin;
                value.labelColors = toggleName == key ? selectLabelColor : normalLabelColor;
            });
        }
    }

    class RankToggle extends Laya.Script {

        constructor() {
            super();
            /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
            let intType = 1000;
            /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
            let numType = 1000;
            /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
            let strType = "hello laya";
            /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
            let boolType = true;
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0

            /** @prop {name:TagKingBtn, tips:"王者页签", type:Node, default:null}*/
            this.TagKingBtn = null;
            /** @prop {name:TagDemeanorBtn, tips:"风范页签", type:Node, default:null}*/
            this.TagDemeanorBtn = null;
            /** @prop {name:TagEliteBtn, tips:"精英页签", type:Node, default:null}*/
            this.TagEliteBtn = null;

            /** @prop {name:toggleNornalImg, tips:"未选图片", type:Node, default:null}*/
            this.toggleNornalImg = null;
            /** @prop {name:toggleSelectedImg, tips:"选中图片", type:Node, default:null}*/
            this.toggleSelectedImg = null;
            /** @prop {name:rankList, tips:"选中图片", type:Node, default:null}*/
            this.rankList = null;

            /** @prop {name:type_txt, tips:"选中图片", type:Node, default:null}*/
            this.type_txt = null;

            /** @prop {name:KingValue, tips:"选中图片", type:Node, default:null}*/
            this.KingValue = null;




            this.ToggleMap = new Map();

            this.normalLabelColor = "#7088B2";
            this.selectLabelColor = "#B3C7D7";


        }

        onEnable() {
            this.onTagKingBtnClick();
        }

        async onDisable() {
            
        }

        onAwake() {


            this.initToggle();
            // ETHVaule
            // ReceiveETH
            // CoinValue
            // ReceiveCoin

        }

        onStart() {
            var TopCotent = this.owner.getChildByName("TopCotent");

            this.initList();
            this.KingValue.visible = false;

        }
        initList() {
            this.rankList.array = [];
            this.rankList.vScrollBarSkin = "";
            this.rankList.repeatY = 0;
            this.rankList.refresh();
        }


        //     0: "0x6f493e9aC78012235f35d40d36670a29f0Fcf7a6"
        // 1: "1"
        // 2: "100000000000000000"
        // addr: "0x6f493e9aC78012235f35d40d36670a29f0Fcf7a6"
        // mineType: "1"
        // reward: "100000000000000000"
        async onInitData(type) {
            //todo 获取网络数据
            this.initList();
            var user = await Laya.Browser.window.users();
            if (type == 1) {
                var minesArr = await MyBaseData.instance.getRedirectReward(false);
                this.type_txt.text = "King:" + user.redirectNum;
            }
            if (type == 2) {
                var minesArr = await MyBaseData.instance.getIndirectReward(false);
                this.type_txt.text = "Demeanor:"+ user.indirectNum;
            }
            if (type == 3) {
                var minesArr = await MyBaseData.instance.getThreeReward(false);
                this.type_txt.text = "Elite:"+ user.threeNum;
            }
            
            // this.type_txt.width = this.type_txt.textWidth
            // this.KingValue.x = this.type_txt.x+this.type_txt.textWidth + 10;

            this.ShopItemArr = [];
            for (let i = 0; i < minesArr.length; i++) {
                if (type == 3) {
                    var data = {
                        MinerAddress: {
                            text: minesArr[i].addr
                        },
                        MinerType: {
                            text: minesArr[i].mineType + " Miner"
                        },
                        EthIcon: {
                            text: minesArr[i].EthIcon
                        },
                        ETHCount: {
                            text: minesArr[i].ETHCount
                        },
                        CoinIcon: {
                            text: minesArr[i].CoinIcon
                        },
                        CoinCount: {
                            text: minesArr[i].CoinCount
                        }
                    };

                } else {
                    var data = {
                        MinerAddress1: {
                            text: Utils.formatUserNickNameNew(minesArr[i].addr)
                        },
                        MinerType1: {
                            text: minesArr[i].mineType + " Miner"
                        },
                        CoinIcon1: {
                            text: minesArr[i].CoinIcon
                        },
                        CoinCount1: {
                            text: Laya.Browser.window.fromWei(minesArr[i].reward)
                        }
                    };
                }
                this.ShopItemArr.push(data);
            }
            if (this.ShopItemArr == null || this.ShopItemArr.length <= 0) {
                return;
            }
            this.rankList.array = this.ShopItemArr;
            this.rankList.repeatY = minesArr.length;
            this.rankList.refresh();
            for (var index = 0; index < this.ShopItemArr.length; index++) {
                var item = this.rankList.cells[index];

                item.getChildByName("MinerAddress").visible = false;
                item.getChildByName("MinerType").visible = false;
                item.getChildByName("EthIcon").visible = false;
                item.getChildByName("ETHCount").visible = false;
                item.getChildByName("CoinIcon").visible = false;
                item.getChildByName("CoinCount").visible = false;
                item.getChildByName("MinerAddress1").visible = false;
                item.getChildByName("MinerType1").visible = false;
                item.getChildByName("CoinIcon1").visible = false;
                item.getChildByName("CoinCount1").visible = false;
                if (type == 1 || type == 2) {
                    item.getChildByName("MinerAddress1").visible = true;
                    item.getChildByName("MinerType1").visible = true;
                    item.getChildByName("CoinIcon1").visible = true;
                    item.getChildByName("CoinCount1").visible = true;
                } else {
                    item.getChildByName("MinerAddress").visible = true;
                    item.getChildByName("MinerType").visible = true;
                    item.getChildByName("EthIcon").visible = true;
                    item.getChildByName("ETHCount").visible = true;
                    item.getChildByName("CoinIcon").visible = true;
                    item.getChildByName("CoinCount").visible = true;
                }






                // var btn = item.getChildByName("ItemRepairBtn");
                // var itemIcon = item.getChildByName("ItemIcon");
                // var color = parseInt(minesArr[index].color) - 1;
                // console.log("Utils.colorItemArr[color]=", Utils.colorItemArr[color], Utils.colorItemArr[index]);
                // itemIcon.skin = "res/ui/shopPanel/" + Utils.colorItemArr[color] + ".png";
                // var itemIconFrame = item.getChildByName("ItemIconFrame");
                // itemIconFrame.skin = "res/ui/shopPanel/" + Utils.colorItemArr[index] + ".png";
            }
        }
        initToggle() {
            this.ToggleMap.set(this.TagKingBtn.name, this.TagKingBtn);
            this.ToggleMap.set(this.TagDemeanorBtn.name, this.TagDemeanorBtn);
            this.ToggleMap.set(this.TagEliteBtn.name, this.TagEliteBtn);

            this.TagKingBtn.on(Laya.Event.CLICK, this, this.onTagKingBtnClick);
            this.TagDemeanorBtn.on(Laya.Event.CLICK, this, this.onTagDemeanorBtnClick);
            this.TagEliteBtn.on(Laya.Event.CLICK, this, this.onTagEliteBtnClick);

        }

        async onTagKingBtnClick() {
            this.onToggleClick("TagKingBtn");
            this.onInitData(1);

        }
        onTagDemeanorBtnClick() {
            this.onToggleClick("TagDemeanorBtn");
            this.onInitData(2);
        }
        onTagEliteBtnClick() {
            this.onToggleClick("TagEliteBtn");
            this.onInitData(3);
        }

        onToggleClick(toggleName) {
            console.log(toggleName);

            var normalLabelColor = this.normalLabelColor;
            var selectLabelColor = this.selectLabelColor;

            var normalImg = this.toggleNornalImg;
            var selectImg = this.toggleSelectedImg;



            this.ToggleMap.forEach(function (value, key, map) {

                value.skin = toggleName == key ? selectImg.skin : normalImg.skin;
                value.labelColors = toggleName == key ? selectLabelColor : normalLabelColor;
            });
        }
    }

    class RankPanel extends Laya.Script {

        constructor() {
            super();


            /** @prop {name:ETHVaule, tips:"登录面板", type:Node, default:null}*/
            this.ETHVaule = null;

            /** @prop {name:CoinValue, tips:"登录面板", type:Node, default:null}*/
            this.CoinValue = null;

            /** @prop {name:ReceiveETH, tips:"登录面板", type:Node, default:null}*/
            this.ReceiveETH = null;

            /** @prop {name:ReceiveCoin, tips:"登录面板", type:Node, default:null}*/
            this.ReceiveCoin = null;



        }

        onEnable() {

        }

        onDisable() {

            this.onInitData();
        }

        onAwake() {


            this.initToggle();


        }

        onStart() {

        }
        initList() {

        }
        async onInitData() {
            var user = await Laya.Browser.window.users();
            this.ETHVaule.text = Laya.Browser.window.fromWei(user.receiveEth);
            this.CoinValue.text = user.receiveGold;
            this.ReceiveETH.off(Laya.Event.CLICK, this, this.getEth_fun);
            this.ReceiveCoin.off(Laya.Event.CLICK, this, this.getGold_fun);
            this.ReceiveETH.on(Laya.Event.CLICK, this, this.getEth_fun);
            this.ReceiveCoin.on(Laya.Event.CLICK, this, this.getGold_fun);
        }
        async getEth_fun(){

            // GameMgr.Instance.setProgressIng(true);
            var getEth = await Laya.Browser.window.getEth();
            await MyBaseData.instance.getMinesCanCheck(true);
            await GameMgr.Instance.setData();
            if (getEth != null && getEth.status == true) {
                this.ETHVaule.text = "0";
            }
            // GameMgr.Instance.setProgressIng(false);
        }


        async getGold_fun(){
            // GameMgr.Instance.setProgressIng(true);
            var getGold = await Laya.Browser.window.getGold();
            await MyBaseData.instance.getMinesCanCheck(true);
            await GameMgr.Instance.setData();
            if (getGold != null && getGold.status == true) {
                this.CoinValue.text = "0";
            }
            // GameMgr.Instance.setProgressIng(false);
        }


        initToggle() {

        }

        async onTagKingBtnClick() {


        }
        onTagDemeanorBtnClick() {
            this.onToggleClick("TagDemeanorBtn");
        }
        onTagEliteBtnClick() {
            this.onToggleClick("TagEliteBtn");
        }

        onToggleClick(toggleName) {

        }
    }

    class RepairPanel extends Laya.Script {

        constructor() {
            super();



            /** @prop {name:shopList, tips:"矿机数组", type:Node, default:null}*/
            this.shopList = null;
            /** @prop {name:repairItemPanel, tips:"矿机数组", type:Node, default:null}*/
            this.repairItemPanel = null;




        }

        onEnable() { 
            this.onInitData();
        }

        onDisable() {
            this.initList();

        }

        onAwake() {
            this.initToggle();
        }

        onStart() {
            this.initList();
        }

        initToggle() {


        }
        initList() {
            this.ShopItemArr = [];
            this.shopList.array = [];
            this.shopList.repeatY = 0;
            this.shopList.vScrollBarSkin = "";
            this.shopList.refresh();
        }

        async onInitData() {
            //todo 获取网络数据
            this.ShopItemArr = [];
            this.initList();
            //可维修矿车
            var minesCanCheckArr = await MyBaseData.instance.getMinesCanCheck(true);
            console.log("minesCanCheckArr::",minesCanCheckArr);
            var allMinner = await MyBaseData.instance.loadJson("allMinner");
            var getMinesIndex = await Laya.Browser.window.getMinesIndex(); //测试调用html 方法
            //所有矿车
            var getMyMinterDataArr = await MyBaseData.instance.getMyMinterData(true);
            console.log("getMinesIndex::",getMinesIndex);
            console.log("getMyMinterDataArr::",getMyMinterDataArr);
            var mm = 0;
            var getTodayTime = await Laya.Browser.window.getTodayTime();
            for (let i = 0; i < getMyMinterDataArr.length; i++) {
                // if(minesArr[i] == true){
                var _arr = MyBaseData.instance.getJsonTypeData2(allMinner, "minner_id", getMyMinterDataArr[i].color, "minner_type", getMyMinterDataArr[i].types);
                var data = {
                    MinerName: {
                        text: _arr[0].minner_name
                    },
                    MinerDes: {
                        text: _arr[0].minner_ex
                    },
                    // daojishi_txt: {
                    //     text: minesCanCheckArr[i] == true ? Utils.timeFomat(sytime) + "后可修理" : "可修理"
                    // },
                    // MinerExtracted:{
                    //     text: minesArr[i].total 
                    // },
                    // MinerTotalDays:{
                    //     text: minesArr[i].buyDays  
                    // }
                    color: parseInt(getMyMinterDataArr[i].color) - 1,
                    types: parseInt(getMyMinterDataArr[i].types) - 1,
                    canCheck: minesCanCheckArr[i],
                    sytime:getMyMinterDataArr[i].checkTime - getTodayTime,
                    mineId: getMinesIndex[i]
                };
                this.ShopItemArr.push(data);
                mm++;
                // }

            }
            console.log("ShopItemArr::",this.ShopItemArr);
            if (this.ShopItemArr == null || this.ShopItemArr.length <= 0) {
                return;
            }
            
            this.shopList.array = this.ShopItemArr;
            this.shopList.repeatY = this.ShopItemArr.length;
            // this.shopList.renderHandler = new Handler(this, this.updateItem);
            this.shopList.refresh();
            for (var index = 0; index < this.ShopItemArr.length; index++) {
                var item = this.shopList.cells[index];

                var btn = item.getChildByName("ItemRepairBtn");
                var itemIcon = item.getChildByName("ItemIcon");
                var daojishi_txt = item.getChildByName("daojishi_txt");
                var color = this.ShopItemArr[index].color;
                var canCheck = this.ShopItemArr[index].canCheck;
                if(canCheck == true){
                    daojishi_txt.text = "可修理";
                }else{
                    daojishi_txt.text = ""+Utils.timeFomat(this.ShopItemArr [index].sytime) + "后可修理"; 
                }
               

                itemIcon.skin = "res/ui/shopPanel/" + Utils.colorItemArr[color] + ".png";
                var itemIconFrame = item.getChildByName("ItemIconFrame");
                itemIconFrame.skin = "res/ui/shopPanel/" + Utils.colorItemArr[color] + ".png";

                btn.on(Laya.Event.CLICK, this, this.onItemBuyBtnClick, [{
                    btn: btn,
                    id: this.ShopItemArr[index].mineId,
                    ShopItem: this.ShopItemArr[index]
                    // shopItemData: shopItem.ShopItemDta
                }]);
                btn.on(Laya.Event.MOUSE_OVER, this, this.hoverTweenOVER, [btn]);
                btn.on(Laya.Event.MOUSE_OUT, this, this.hoverTweenOut, [btn]);
            }
        }


        async onItemBuyBtnClick(data) {
            // var getMinesIndex = await Laya.Browser.window.getMinesIndex();
            // var getMineYesterday = await Laya.Browser.window.getMineYesterday( getMinesIndex[data.id]);
            // console.log("getMineYesterday：",getMineYesterday);
            this.owner.close();
            // this.repairItemPanel.open();
            // this.owner.addChild(this.repairItemPanel);
            GameMgr.Instance.showDialog(this.repairItemPanel);
            var RepairCard = this.repairItemPanel.getChildByName("RepairCard");
            var color = Utils.colorItemArr[data.ShopItem.color];
            RepairCard.skin = "res/ui/shopPanel/" + color + ".png";
            var RepairBtn = this.repairItemPanel.getChildByName("RepairBtn");
            var CostLabel = this.repairItemPanel.getChildByName("CostLabel");
            var MinerName2 = this.repairItemPanel.getChildByName("MinerName2");
            var CostValue = this.repairItemPanel.getChildByName("CostValue");
            CostValue.visible = false;
            

            var allMinner = await MyBaseData.instance.loadJson("allMinner");
            var _arr = MyBaseData.instance.getJsonTypeData2(allMinner, "minner_id", parseInt(data.ShopItem.color)+1, "minner_type",parseInt(data.ShopItem.types)+1);
           

            MinerName2.text = _arr[0].minner_name;
            


            var mines = await MyBaseData.instance.mines();
            CostLabel.text = "cost: " + mines[parseInt(data.ShopItem.types)].gold;

            RepairBtn.on(Laya.Event.CLICK, this, this.onItemBuyBtnClick2, [{
                btn: RepairBtn,
                id: data.id
                // shopItemData: shopItem.ShopItemDta
            }]);

            RepairBtn.on(Laya.Event.ROLL_OUT, this, (e) => {
                this.hoverTweenOVER(e.btn);
            }, [{
                btn: RepairBtn,
                id: data.id
                // shopItemData: shopItem.ShopItemDta
            }]);

            RepairBtn.on(Laya.Event.ROLL_OVER, this, (e) => {
                this.hoverTweenOut(e.btn);
            }, [{
                btn: RepairBtn,
                id: data.id
                // shopItemData: shopItem.ShopItemDta
            }]);

        }
        async onItemBuyBtnClick2(data) {
            GameMgr.Instance.setProgressIng(true);
            var minesCanCheckArr = await MyBaseData.instance.getMinesCanCheck();

            this.repairItemPanel.visible = false;
            console.log("xiuli@@@@:",data);
            var signMine = await Laya.Browser.window.signMine(data.id);
            
            if (signMine != null && signMine.status == true) {
                await MyBaseData.instance.getMinesCanCheck(true);
                await GameMgr.Instance.setData();
            } else {
                GameMgr.Instance.setProgressIng(false);
            }

        }
        hoverTweenOVER(btn) {
            Laya.TimeLine.to(btn, {
                scaleX: 1.05,
                scaleY: 1.05
            }, 100).play();

        }

        hoverTweenOut(btn) {
            Laya.TimeLine.to(btn, {
                scaleX: 1,
                scaleY: 1
            }, 100).play();
        }

        onToggleClick(toggleName) {
            var normalLabelColor = this.normalLabelColor;
            var selectLabelColor = this.selectLabelColor;

            var normalImg = this.toggleNornalImg;
            var selectImg = this.toggleSelectedImg;

            this.ToggleMap.forEach(function (value, key, map) {
                value.skin = toggleName == key ? selectImg.skin : normalImg.skin;
                value.labelColors = toggleName == key ? selectLabelColor : normalLabelColor;
            });
        }
        onToggleMyMinerBtnClick() {

        }
    }

    class LoadingPanel extends Laya.Script {

        constructor() {
            super();
            /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
            let intType = 1000;
            /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
            let numType = 1000;
            /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
            let strType = "hello laya";
            /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
            let boolType = true;
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0

            //窗口相关
            /** @prop {name:CommitBtn, tips:"同意协议按钮", type:Node, default:null}*/
            this.CommitBtn = null;
            /** @prop {name:LoadBtn, tips:"登录按钮", type:Node, default:null}*/
            this.LoadBtn = null;

            /** @prop {name:tishi_txt, tips:"提示按钮", type:text, default:null}*/
            this.tishi_txt = null;



            this.CommitBtnState = true;
            this.NoSelectSkin = "res/ui/LoadPanel/image-kuang.png";
            this.SelectSkin = "res/ui/LoadPanel/image-duihao.png";

        }

        onEnable() {}

        onDisable() {

        }

        onAwake() {
            this.refreshSkin();
            this.CommitBtn.on(Laya.Event.CLICK, this, () => {
                this.CommitBtnState = !this.CommitBtnState;
                this.refreshSkin();
            });

        }

        onStart() {
            //console.log(GameMgr.Instance);
            GameMgr.Instance.playAnim("res/ani/dajiqiren/dajiqiren.sk", this, 410, 510, 1);

            this.LoadBtn.on(Laya.Event.CLICK, this, this.onLoadBtnClick);
            // setTimeout(()=>{
            //     Laya.Browser.window.removeLoadingWork();
            // },3000)

        }

        async onLoadBtnClick() {
            // var jj = await MyBaseData.instance.loadJson("Client_Language");
            // console.log("@@@@@@@@@@@########:",jj);
            this.tishi_txt.text = "1%";
            this.tishi_txt.visible = true;
            if (!this.CommitBtnState) { //没有同意协议，直接返回
                return;
            }

            // var mine = await MyBaseData.instance.mine();
            // console.log("================::",mine);
            this.LoadBtn.visible = false;
            GameMgr.Instance.clickTween(this.LoadBtn);
            GameMgr.Instance.getTextTip(this.tishi_txt);
            GameMgr.Instance.playAnim("res/ani/denglu/denglu.sk", this, 380, 1110, -1);
            this.tishi_txt.text = "20%";
            await MyBaseData.instance.mines(true);
            this.tishi_txt.text = "40%";
            await GameMgr.Instance.setData(false);
            this.tishi_txt.text = "80%";
            await GameMgr.Instance.updataGame();
            this.tishi_txt.text = "95%";
            //模拟登录界面
            var time = new Laya.Timer();
            time.once(1500, this, () => {
                this.tishi_txt.text = "";
                GameMgr.Instance.closeAnim("res/ani/denglu/denglu.sk", this);
                this.LoadBtn.visible = true;
                this.owner.close();
            });;

        }


        refreshSkin() {
            this.CommitBtn.skin = this.CommitBtnState ? this.SelectSkin : this.NoSelectSkin;
        }
    }

    // var LayaGCS = import("layagcs");
    class NetManager extends Laya.Script {

        constructor() { 
            super(); 
            
            //单例  
            if(!NetManager.Instance){
                NetManager.Instance = this;
            }
            /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
            let intType = 1000;
            /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
            let numType = 1000;
            /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
            let strType = "hello laya";
            /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
            let boolType = true;
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
           
        }
        onAwake(){      
        }

      
        onStart(){       
            this.loadHtmlObject();
        } 
        
        loadHtmlObject(){
            Laya.Browser.window.address();//测试调用html 方法
        }
    }

    /**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
    // import TestList from "./../../../Program Files (x86)/LayaAirIDE (2)/resources/app/out/vs/layaEditor/src/TestList"

    class GameConfig {
        static init() {
            //注册Script或者Runtime引用
            let reg = Laya.ClassUtils.regClass;
    		reg("game/GameMgr.js",GameMgr);
    		reg("ui/AddCoinBtn.js",AddCoinBtn);
    		reg("ui/UIButton.js",UIButton);
    		reg("ui/BottomPanel.js",BottomPanel);
    		reg("ui/ShopPanel/ShopToggle.js",ShopToggle);
    		reg("ui/ShopPanel/ShopItem.js",ShopItem);
    		reg("ui/ShopPanel/ShopList.js",ShopList);
    		reg("ui/MyPanel/MyPanelTogle.js",MyPanelTogle);
    		reg("ui/RankPanel/RankToggle.js",RankToggle);
    		reg("ui/RankPanel/RankPanel.js",RankPanel);
    		reg("ui/RepairPanel/RepairPanel.js",RepairPanel);
    		reg("ui/LoadingPanel/LoadingPanel.js",LoadingPanel);
    		reg("game/NetManager.js",NetManager);
    		// reg("../../../Program Files (x86)/LayaAirIDE (2)/resources/app/out/vs/layaEditor/src/TestList.js",TestList);
        }
    }
    GameConfig.width = 750;
    GameConfig.height = 1334;
    GameConfig.scaleMode ="showall";
    GameConfig.screenMode = "horizontal";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "Main.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = true;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;

    GameConfig.init();

    class Main {
    	constructor() {
    	
    		Config.isAntialias = true;
    		Config.useWebGL2 = false;
    		//根据IDE设置初始化引擎	
    		var initWidth = 750;
    		var initHeight = 1334;
    		if (window["Laya3D"]){
    			Laya3D.init(initWidth, initHeight);
    		} 
    		else {
    			Laya.init(initWidth, initHeight, Laya["WebGL"]);
    		}
    		this.ape = null;
    		this.showApe();
    		Laya["Physics"] && Laya["Physics"].enable();
    		Laya.stage.scaleMode = "showall";
    		Laya.stage.screenMode = "none";
    		Laya.stage.alignV = "middle";
    		Laya.stage.alignH = "center";
    		//兼容微信不支持加载scene后缀场景
    		Laya.URL.exportSceneToJson = true;

    		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
    		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    	}

    	onVersionLoaded() {
    		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
    		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    	}

    	onConfigLoaded() {
    		//加载IDE指定的场景
    		GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
    		if (this.ape != null)
    			Laya.stage.addChild(this.ape);
    	}


    	showApe() {
    		// 方法1：使用loadImage
    		this.ape = new Laya.Sprite();
    		Laya.stage.addChild(this.ape);
    		this.ape.loadImage("./res/loadingWork.png");
    		Laya.Browser.window.removeLoadingWork();
    	}
    }
    //激活启动类
    new Main();

}());
//# sourceMappingURL=bundle.js.map
