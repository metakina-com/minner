import GameMgr from "../../game/GameMgr";
import MyBaseData from "../../game/MyBaseData";
import Utils from "../../game/utils";


export default class MyPanelTogle extends Laya.Script {

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
            var ss = Utils.formatUserNickNameNew(localStorage.getItem('account'))
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
        var minerAddress = this.myHomeItem.getChildByName("PlayerName")
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
            let _arr = MyBaseData.instance.getJsonTypeData2(allMinner, "minner_id", minesArr[i].color, "minner_type", minesArr[i].types)

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
            }
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
            await MyBaseData.instance.getMinesCanCheck(true)
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
        })
    }
}