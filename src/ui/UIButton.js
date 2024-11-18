import EventManager from "../game/EventManager";
export default class UIButton extends Laya.Script {

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