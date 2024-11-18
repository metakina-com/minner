import EventManager from "../../game/EventManager";
import GameMgr from "../../game/GameMgr";
import MyBaseData from "../../game/MyBaseData";
import Utils from "../../game/utils";
import ShopItem from "./ShopItem";


export default class ShopList extends Laya.Script {

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
        var _arr = MyBaseData.instance.getJsonTypeData(allMinner, "minner_type", 3)
        var minesArr = await MyBaseData.instance.mines();
        for (let index = 2; index < 5; index++) {
            var busdtNum = Laya.Browser.window.fromWei(minesArr[index].busdtNum)
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
            }
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
            } //初始化id

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
        var price = Laya.Browser.window.fromWei(minesArr[type - 1].price)
        var allMinner = await MyBaseData.instance.loadJson("allMinner");
        var _arr = MyBaseData.instance.getJsonTypeData(allMinner, "minner_type", this.type)
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
            }
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
            } //初始化id
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