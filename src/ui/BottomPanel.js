import EventManager from "../game/EventManager";
import GameMgr from "../game/GameMgr";
import MyBaseData from "../game/MyBaseData";
import ShopToggle from "./ShopPanel/ShopToggle";
import UIButton from "./UIButton";

export default class BottomPanel extends Laya.Script {

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
            }, 400)
            setTimeout(() => {
                if (this.initUi == false) {
                    GameMgr.Instance.setProgressIng(true, 0.8);
                }
            }, 800)
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
        })
    }
}