import GameConfig from "./GameConfig";
class Main {
	constructor() {
	
		Config.isAntialias = true;
		Config.useWebGL2 = false;
		//根据IDE设置初始化引擎	
		var initWidth = 750;
		var initHeight = 1334;
		if (window["Laya3D"]){
			Laya3D.init(initWidth, initHeight);
		} 
		else {
			Laya.init(initWidth, initHeight, Laya["WebGL"]);
		}
		this.ape = null;
		this.showApe();
		Laya["Physics"] && Laya["Physics"].enable();
		Laya.stage.scaleMode = "showall";
		Laya.stage.screenMode = "none";
		Laya.stage.alignV = "middle";
		Laya.stage.alignH = "center";
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = true;

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded() {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	onConfigLoaded() {
		//加载IDE指定的场景
		GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
		if (this.ape != null)
			Laya.stage.addChild(this.ape);
	}


	showApe() {
		// 方法1：使用loadImage
		this.ape = new Laya.Sprite();
		Laya.stage.addChild(this.ape);
		this.ape.loadImage("./res/loadingWork.png");
		Laya.Browser.window.removeLoadingWork();
	}
}
//激活启动类
new Main();