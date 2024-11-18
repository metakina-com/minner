export default class MyBaseData {

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
        this.minesArr = [myMines1, myMines2, myMines3, myMines4, myMines5]
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
                _arr.push(myjson[i])
            }
        }
        return _arr;
    }

    getJsonTypeData2(myjson, type, ydata, type2, ydata2) {
        var _arr = [];
        for (var i = 0; i < myjson.length; i++) {
            if (myjson[i][type] == ydata && myjson[i][type2] == ydata2) {
                _arr.push(myjson[i])
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