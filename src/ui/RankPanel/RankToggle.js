import MyBaseData from "../../game/MyBaseData";
import Utils from "../../game/utils";

export default class RankToggle extends Laya.Script {

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
        this.rankList.array = []
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
            this.type_txt.text = "King:" + user.redirectNum
        }
        if (type == 2) {
            var minesArr = await MyBaseData.instance.getIndirectReward(false);
            this.type_txt.text = "Demeanor:"+ user.indirectNum
        }
        if (type == 3) {
            var minesArr = await MyBaseData.instance.getThreeReward(false);
            this.type_txt.text = "Elite:"+ user.threeNum
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
                }

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
                }
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
        })
    }
}