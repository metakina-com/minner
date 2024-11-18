import GameMgr from "../../game/GameMgr";
import MyBaseData from "../../game/MyBaseData";
import Utils from "../../game/utils";
import ShopItem from "../ShopPanel/ShopItem";

export default class RepairPanel extends Laya.Script {

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
        this.shopList.array = []
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
            var _arr = MyBaseData.instance.getJsonTypeData2(allMinner, "minner_id", getMyMinterDataArr[i].color, "minner_type", getMyMinterDataArr[i].types)
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
            }
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
                daojishi_txt.text = "可修理"
            }else{
                daojishi_txt.text = ""+Utils.timeFomat(this.ShopItemArr [index].sytime) + "后可修理" 
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
        var color = Utils.colorItemArr[data.ShopItem.color]
        RepairCard.skin = "res/ui/shopPanel/" + color + ".png";
        var RepairBtn = this.repairItemPanel.getChildByName("RepairBtn");
        var CostLabel = this.repairItemPanel.getChildByName("CostLabel");
        var MinerName2 = this.repairItemPanel.getChildByName("MinerName2");
        var CostValue = this.repairItemPanel.getChildByName("CostValue");
        CostValue.visible = false;
        

        var allMinner = await MyBaseData.instance.loadJson("allMinner");
        var _arr = MyBaseData.instance.getJsonTypeData2(allMinner, "minner_id", parseInt(data.ShopItem.color)+1, "minner_type",parseInt(data.ShopItem.types)+1)
       

        MinerName2.text = _arr[0].minner_name;
        


        var mines = await MyBaseData.instance.mines();
        CostLabel.text = "cost: " + mines[parseInt(data.ShopItem.types)].gold;

        RepairBtn.on(Laya.Event.CLICK, this, this.onItemBuyBtnClick2, [{
            btn: RepairBtn,
            id: data.id
            // shopItemData: shopItem.ShopItemDta
        }]);

        RepairBtn.on(Laya.Event.ROLL_OUT, this, (e) => {
            this.hoverTweenOVER(e.btn)
        }, [{
            btn: RepairBtn,
            id: data.id
            // shopItemData: shopItem.ShopItemDta
        }]);

        RepairBtn.on(Laya.Event.ROLL_OVER, this, (e) => {
            this.hoverTweenOut(e.btn)
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
        var signMine = await Laya.Browser.window.signMine(data.id)
        
        if (signMine != null && signMine.status == true) {
            await MyBaseData.instance.getMinesCanCheck(true)
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
        })
    }
    onToggleMyMinerBtnClick() {

    }
}