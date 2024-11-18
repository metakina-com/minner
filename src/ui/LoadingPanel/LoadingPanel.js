import GameMgr from "../../game/GameMgr";
import MyBaseData from "../../game/MyBaseData";

export default class LoadingPanel extends Laya.Script {

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
        this.tishi_txt.text = "1%"
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
        this.tishi_txt.text = "20%"
        await MyBaseData.instance.mines(true);
        this.tishi_txt.text = "40%"
        await GameMgr.Instance.setData(false);
        this.tishi_txt.text = "80%"
        await GameMgr.Instance.updataGame();
        this.tishi_txt.text = "95%"
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