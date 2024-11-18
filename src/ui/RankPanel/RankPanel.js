import GameMgr from "../../game/GameMgr";
import MyBaseData from "../../game/MyBaseData";

export default class RankPanel extends Laya.Script {

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
        var getEth = await Laya.Browser.window.getEth()
        await MyBaseData.instance.getMinesCanCheck(true)
        await GameMgr.Instance.setData();
        if (getEth != null && getEth.status == true) {
            this.ETHVaule.text = "0"
        }
        // GameMgr.Instance.setProgressIng(false);
    }


    async getGold_fun(){
        // GameMgr.Instance.setProgressIng(true);
        var getGold = await Laya.Browser.window.getGold();
        await MyBaseData.instance.getMinesCanCheck(true)
        await GameMgr.Instance.setData();
        if (getGold != null && getGold.status == true) {
            this.CoinValue.text = "0"
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