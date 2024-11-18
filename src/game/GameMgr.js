import MyBaseData, {
    BaseData
} from "./MyBaseData";
import MinterItem from "./MinterItem";
import Utils from "./utils";
import EventManager from "./EventManager";



export default class GameMgr extends Laya.Script {

    constructor() {
        super();

        //单例  
        if (!GameMgr.Instance) {
            GameMgr.Instance = this;
        }


        /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
        let intType = 1000;
        /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
        let numType = 1000;
        /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
        let strType = "hello laya";
        /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
        let boolType = true;
        // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0

        /** @prop {name:minter, tips:"矿机预制体", type:Prefab, default:null}*/
        this.minter = null;

        /** @prop {name:topPanel, tips:"头", type:Node, default:null}*/
        this.topPanel = null;
        /** @prop {name:ShopPanel, tips:"头", type:Node, default:null}*/
        this.ShopPanel = null;

        /** @prop {name:MyPanel, tips:"头", type:Node, default:null}*/
        this.MyPanel = null;

        /** @prop {name:BindinggFailePanel, tips:"头", type:Node, default:null}*/
        this.BindinggFailePanel = null;

        /** @prop {name:testerror, tips:"头", type:Node, default:null}*/
        this.testerror = null;




        //矿机参数信息
        //初始化 第一个矿机的位置信息
        this.InitPosX = 330;
        this.InitPosY = 655;

        //矿机间隔距离
        this.InternalX = 135;

        this.SameClownOffsetX = 105;

        this.SameRowOffsetY = 42;

        this.InternalY = 85;

        //几行几列
        this.InitRow = 2;
        this.InitClown = 3;


        this.MinterItems = [];


        //窗口相关
        /** @prop {name:LoadingPanel, tips:"登录面板", type:Node, default:null}*/
        this.LoadingPanel = null;

        /** @prop {name:BuildingPanel, tips:"矿机建设面板", type:Node, default:null}*/
        this.BuildingPanel = null;
        /** @prop {name:InvitationPanel, tips:"邀请面板", type:Node, default:null}*/
        this.InvitationPanel = null;


        //小人1 运动起始位置        
        this.xiaorene1StartPos = [625, 266]
        this.xiaorene1EndPos = [491, 324]
        //小人2 运动起始位置
        this.xiaorene2StartPos = [443, 177]
        this.xiaorene2EndPos = [605, 214]
        //机器人运动
        /** @prop {name:jiqiren1, tips:"机器人1号", type:Node, default:null}*/
        this.jiqiren1 = null;
        this.jiqiren1StartPos = [667, 803]
        this.jiqiren1EndPos = [308, 1173]

        /** @prop {name:jiqiren2, tips:"机器人2号", type:Node, default:null}*/
        this.jiqiren2 = null;
        this.jiqiren2StartPos = [408, 1000]
        this.jiqiren2EndPos = [7, 808]
        this.aniArr = []
        this.kuagnjiArr = [];
        console.log("============================================");

    }


    onEnable() {

    }

    onDisable() {

    }

    onAwake() {
        this.LoadingPanel.visible = true;
    }
    onStart() {

        // console.log(GameMgr.getInstance == GameMgr.getInstance);

        // this.BuildingPanel.visible = true;
        // // this.InvitationPanel.sceneColor = "#2C3A55";
        // // Laya.stage.bgColor = "#efefef"
        // this.BuildingPanel.show();

        // var time = new Laya.Timer();
        // time.once(1500,this,()=>{
        //     //console.log(this.BuildingPanel);
        //     this.InvitationPanel.close();
        // });

        // var newPrefab = this.minter.create();
        // this.owner.addChild(newPrefab);

        // Laya.loader.load("res/TestPre.json",Laya.Handler.create(this,(prefabData)=>{
        //     var prefab = new Laya.Prefab();
        //     prefab.json = prefabData;

        // }));

        // console.log("gamemgr  onstart");
        // Laya.loader.load("res/atlas/res/game.atlas",Laya.Handler.create(this,()=>{


        //     this.AnimTex = Laya.loader.getRes("res/game/image-dizuo.png");

        //console.log(tex);

        // var sp = this.owner;
        // var sp = this.owner.getComponent(Laya.Sprite);

        // this.owner.graphics.clear();
        // this.owner.graphics.drawTexture(tex);
        // this.owner.texture = tex;


        // this.owner.loadImage("game.atlas/image-dizuo.png");

        //获得要切换的图片资源路径
        // var imgUrl = (this.flag = !this.flag)? this.monkey1:this.monkey2;
        // //加载显示图片，坐标位于100,50
        // this.img.loadImage(imgUrl, 100, 50);

        // var sp = new Laya.Sprite();
        // sp.graphics.drawTexture(tex);      
        this.InitAllAnim();
    }

    //所有主场景动画
    InitAllAnim() {
        //初始化所有主场景动画
        this.InitMinterItem("MinterItemAni.ani");
        this.playAnim("res/ani/damen/damen.sk", this, 190, 832);
        this.playAnim("res/ani/ditan/ditan.sk", this, 190, 920);
        this.playAnim("res/ani/dianti/dianti.sk", this, 195, 520);
        this.playAnim("res/ani/jiantou/jiantou.sk", this, 210, 945);
        this.playAnim("res/ani/luxian1/luxian1.sk", this, 210, 940);
        this.playAnim("res/ani/luxian2/luxian2.sk", this, 550, 980);
        this.playAnim("res/ani/luxian3/luxian3.sk", this, 380, 335, 0);
        //this.playAnim("res/ani/maoyan/maoyan.sk", this, 380,335);//没有设置位置，矿机用
        this.playAnim("res/ani/qiu/qiu.sk", this, 285, 1020);
        //this.playAnim("res/ani/weixian/weixian.sk", this, 285, 1020);
        this.playAnim("res/ani/xiaojiqi/xiaojiqi.sk", this, 217, 235);
        this.playAnim("res/ani/xiaojiqi2/xiaojiqi2.sk", this, 170, 305);
        this.playAnim("res/ani/xiaoren1/xaioren1.sk", this, 170, 305, -1, (anim) => {
            //console.log(anim);
            this.pathTween(anim, this.xiaorene1StartPos, this.xiaorene1EndPos, 3000, true, 5000);
        });

        this.playAnim("res/ani/xiaoren2/xaioren2.sk", this, 170, 305, -1, (anim) => {

            this.pathTween(anim, this.xiaorene2StartPos, this.xiaorene2EndPos, 3000, true, 5000);
        });

        this.playAnim("res/ani/xiegang/xiegang.sk", this, 455, 970);

        this.pathTween(this.jiqiren1, this.jiqiren1StartPos, this.jiqiren1EndPos, 5000, true, 8000);

        this.pathTween(this.jiqiren2, this.jiqiren2StartPos, this.jiqiren2EndPos, 4000, true, 6000);
        EventManager.Singleton.on("ShopToggle", this, () => {
            this.ShopPanel.visible = false;
            this.ShopPanel.close();


            // close.dispather.event(Laya.Event.CLICK);
        });

    }
    closeMyPanel() {
        this.MyPanel.visible = false;
        this.MyPanel.close();
    }
    //初始化矿机位置
    InitMinterItem(aniName) {

        Laya.loader.load("MinterItemAni.ani",
            Laya.Handler.create(this, (data) => {
                // console.log(data["props"]["width"]);
                var aimW = data["props"]["width"];
                var aimH = data["props"]["height"];
                this.LoadMinterItem(aimW, aimH, aniName);
            }));
    }

    LoadMinterItem(aimW, aimH, aniName) {
        for (var i = 0; i < this.InitRow; i++) {
            var rotate = i % 2 == 0 ? -5 : 0;
            var offsetX = i > 0 ? -this.SameClownOffsetX * i : 0;

            for (var j = 0; j < this.InitClown; j++) {
                var tl = new Laya.Animation();
                //加载动画文件
                tl.loadAnimation(aniName);

                //添加到舞台
                this.owner.addChild(tl);
                //播放Animation动画

                var offsetY = j > 0 ? this.SameRowOffsetY * j : 0;

                offsetY = rotate < 0 ? offsetY : offsetY + j * 12;

                tl.pos(this.InitPosX + (j * this.InternalX) + offsetX, this.InitPosY + (i * this.InternalY) + offsetY);
                tl.rotation = rotate;

                tl.pivotX = aimW * 0.5;
                tl.pivotY = aimH * 0.5;


                tl.play(0, true, );


                tl.addComponent(MinterItem);
                tl.size(aimW, aimH);

                this.MinterItems.push(tl);
            }
        }



    }

    async openInvitationPanel() {
        let user = await MyBaseData.instance.getUsers(true);
        if (user.welMember != 0) {
            return "1";
        }
        this.InvitationPanel.visible = true;
        GameMgr.Instance.showDialog(this.InvitationPanel);
        this.testerror.visible = false;
        let InputAddress = this.InvitationPanel.getChildByName("InputAddress"); //
        InputAddress.text = "";
        InputAddress.prompt = "请输入邀请人地址"
        let InvitationBtn = this.InvitationPanel.getChildByName("InvitationBtn"); //
        InvitationBtn.off(Laya.Event.CLICK, this, this.shouquan)
        InvitationBtn.on(Laya.Event.CLICK, this, this.shouquan);
    }

    async shouquan() {
        let InputAddress = this.InvitationPanel.getChildByName("InputAddress"); //
        var isaddress = Laya.Browser.window.isAddress(InputAddress.text);
        console.log("isaddress::", isaddress);
        if (isaddress == false) {
            this.testerror.visible = true;
            setTimeout(() => {
                this.testerror.visible = false;
            }, 1000)
            return null;
        }
        let bindUserWelMember = await Laya.Browser.window.bindUserWelMember(InputAddress.text);
        if (bindUserWelMember == null || bindUserWelMember.status == false) {
            GameMgr.Instance.showDialog(this.BindinggFailePanel);
            return;
        }
        let getUsers = await MyBaseData.instance.getUsers(true);
        this.InvitationPanel.visible = false;
        return bindUserWelMember
    }



    setProgressIng(vis, pro = 0) {
        this.BuildingPanel.visible = vis;
        if (vis == false) return;
        var progress = this.BuildingPanel.getChildByName("progress");
        progress.value = pro;
        console.log("progress:", progress);
        this.owner.addChild(this.BuildingPanel);

    }
    getTextTip(_txt) {
        this._txt = _txt
    }
    async setData(isUpdata = true) {
        return new Promise(async (resolve) => {
            if (this._txt != null) {
                // this._txt.text = "10%"
            }
            await MyBaseData.instance.getMyMinterData(true);
            if (this._txt != null) {
                // this._txt.text = "30%"
            }
            await MyBaseData.instance.getUsers(true);
            if (this._txt != null) {
                // this._txt.text = "40%"
            }
            await MyBaseData.instance.getMinesCanCheck(true)
            if (isUpdata == true) {
                this.updataGame();
            }
            resolve(true)
        })

    }
    async updataGame() {
        var a = this.owner.getChildByName("Center");
        this.owner.addChildAt(a, 0);
        var myMinterArr = await MyBaseData.instance.getMyMinterData(true);
        var getMinesIndex = await Laya.Browser.window.getMinesIndex(); //测试调用html 方法
        // console.log("myMinterArr:", getMinesIndex);
        var user = await MyBaseData.instance.getUsers();
        this.topPanel.getChildByName("AddCoinBtn").label = "" + user.myGold;
        let m = 0;
        for (var i = 0; i < this.kuagnjiArr.length; i++) {
            m++;
        }
        // console.log("myMinterArr::", myMinterArr);
        for (let i = m; i < myMinterArr.length && i < 6; i++) {
            if(this.kuagnjiArr[i] != null && this.kuagnjiArr[i] != undefined ) return;
            var color = Utils.getMinterColor(myMinterArr[i].color)
            console.log("color:", color);
            GameMgr.Instance.playAnim("res/ani/kuangji/" + color + ".sk", this, this.MinterItems[i].x, this.MinterItems[i].y - 70, -1, async (skeleton) => {
                var boo = await Laya.Browser.window.minesCanCheck(getMinesIndex[i]);
                // console.log("iiiiiiiiiiiiiiiii::", i, boo);
                if (boo == true) {
                    this.kuagnjiArr[i].stop()
                } else {
                    this.kuagnjiArr[i].play(0, true)
                }
            }, true ,i);
            // GameMgr.Instance.playAnim("res/ani/jingbao/" + "baojing" + ".sk", this, this.MinterItems[i].x, this.MinterItems[i].y - 70, -1, null, true);
        }

        this.BuildingPanel.visible = false;
        this.openInvitationPanel();
        if (this.kuagnjiArr.length >= myMinterArr.length) {
            this.isXiuli();
        }
    }
    async isXiuli() {
        if (this.kuagnjiArr == null) return;
        var minesCanCheckArr = await MyBaseData.instance.getMinesCanCheck(true);
        for (var i = 0; i < this.kuagnjiArr.length; i++) {
            if (minesCanCheckArr[i] == false) {
                this.kuagnjiArr[i].play(0, true)
            } else {
                this.kuagnjiArr[i].play(0, false)
            }
            this.owner.addChild(this.kuagnjiArr[i]);
        }
    }
    //播放动画 参数说明：动画加载路径，对象加载成功放置的父节点，位置坐标X，位置坐标Y，父节点的位置索引
    playAnim(animPath, obj, posX, posY, index = -1, callBack = null, iskuangji = false, mm = -1) {
        // console.log("iiiiiiiiiiiiiiiii:mm:", mm);
        var templetStone = new Laya.Templet();
        templetStone.off(Laya.Event.COMPLETE, this, this.templetFun = () => {});
        templetStone.on(Laya.Event.COMPLETE, this, this.templetFun = () => {
            //从动画模板创建动画播放对象
            var skeleton = templetStone.buildArmature(0);
            skeleton.pos(posX, posY);
            //播放
            skeleton.play(0, true);


            obj.owner.addChild(skeleton);
            if (index == -1) {
                obj.owner.addChild(skeleton);
            } else {
                obj.owner.setChildIndex(skeleton, index);
            }

            if (callBack != null) {
                callBack(skeleton);
            }

            if (iskuangji == true) {
                skeleton.stop();
                this.kuagnjiArr[mm] = skeleton;
            } else {
                if (this.aniArr[animPath] == null)
                    this.aniArr[animPath] = skeleton;
            }
        });
        templetStone.loadAni(animPath);

    }

    playerLongguAni() {
        var skeleton = new Laya.Skeleton();
        //添加到舞台
        this.addChild(skeleton);
        skeleton.pos(300, 350);
        //通过加载直接创建动画
        skeleton.load("res/skeletonEffect/win/xiaobingWIN.sk", new Laya.Handler(this, function () {
            // console.log("!!!!!!!!!!!!!!!!!!!~~~~",skeleton.getAnimNum());
            skeleton.play(1, false);
        }, null, true));
    }



    closeAnim(animPath, obj) {
        if (this.aniArr == null) return;
        if (this.aniArr[animPath] == null) return;
        obj.owner.removeChild(this.aniArr[animPath]);
    }

    closeAnimKuangji() {
        if (this.kuagnjiArr == null) return;
        for (var i = 0; i < this.kuagnjiArr.length; i++) {
            if (this.kuagnjiArr[i] != null)
                this.owner.removeChild(this.kuagnjiArr[i]);
        }

    }


    //点击动画 任何节点类型
    clickTween(obj) {
        Laya.TimeLine.to(obj, {
                scaleX: 0.8,
                scaleY: 0.8
            }, 100)
            .to(obj, {
                scaleX: 1,
                scaleY: 1
            }, 100).play();
    }

    //路径动画
    pathTween(obj, startPos, endPos, playTime, loop, looptime) {
        obj.visible = true;
        obj.x = startPos[0];
        obj.y = startPos[1];

        Laya.Tween.to(obj, {
                x: endPos[0],
                y: endPos[1]
            }, playTime, Laya.Ease.linearIn,
            Laya.Handler.create(this, () => {
                obj.x = startPos[0];
                obj.y = startPos[1];
                obj.visible = false;
            })
        );

        if (loop) {
            var timer = new Laya.Timer();
            timer.loop(looptime, this, () => {
                //console.log("开始运动---->"+endPos[0] + ","+endPos[1]);                
                obj.visible = true;
                Laya.Tween.to(obj, {
                        x: endPos[0],
                        y: endPos[1]
                    }, playTime, Laya.Ease.linearIn,
                    Laya.Handler.create(this, () => {
                        obj.x = startPos[0];
                        obj.y = startPos[1];
                        obj.visible = false;
                    })
                );
            });
        }

    }

    //打开Dialog
    showDialog(dialog) {
        dialog.visible = true;
        dialog.show();
    }

    //关闭dialog
    closeDialog() {
        // console.log("this============",dialog);
        dialog.visible = false;
        dialog.close();
    }
}