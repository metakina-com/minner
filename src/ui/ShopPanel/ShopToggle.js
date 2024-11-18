import EventManager from "../../game/EventManager";
import ShopList from "./ShopList";

export default class ShopToggle extends Laya.Script {

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
        this.shopList.getComponent(ShopList).onInitData(type)

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