!function(){"use strict";class e{constructor(){this.myMinesArr=[],this.minesArr=[],this.users=null,this.myJsonArr=[],this.minesCanCheckArr=[],this.getRedirectRewardArr=[],this.getThreeRewardArr=[],this.getIndirectRewardArr=[]}static get instance(){return null==this._instance&&(this._instance=new e),this._instance}async mines(e=!1){if(0==e)return null!=this.minesArr&&this.minesArr.length>0?this.minesArr:[];this.minesArr=[];var t=await Laya.Browser.window.mines(1),i=await Laya.Browser.window.mines(2),n=await Laya.Browser.window.goldShops(1),a=await Laya.Browser.window.goldShops(2),s=await Laya.Browser.window.goldShops(3);return this.minesArr=[t,i,n,a,s],this.minesArr}async getMyMinterData(e=!1){if(0==e)return null!=this.myMinesArr&&this.myMinesArr.length>0?(console.log("isUpdata---:",this.myMinesArr),this.myMinesArr):[];this.myMinesArr=[];var t=await Laya.Browser.window.getMinesIndex();for(let e=0;e<t.length&&"0"!=t[e];e++){var i=await Laya.Browser.window.myMines(t[e]);this.myMinesArr.push(i)}return this.myMinesArr}async getUsers(e=!1){if(0==e)return null!=this.users?this.users:[];var t=await Laya.Browser.window.users();return this.users=t,console.log("users::",t),this.users}async loadJson(e){if(null!=this.myJsonArr[e])return this.myJsonArr[e];var t=null;return new Promise(i=>{Laya.loader.load("res/config/"+e+".json",Laya.Handler.create(this,()=>{t=Laya.loader.getRes("res/config/"+e+".json"),this.myJsonArr[e]=t,i(t)}),null,Laya.Loader.JSON)})}getJsonTypeData(e,t,i){for(var n=[],a=0;a<e.length;a++)e[a][t]==i&&n.push(e[a]);return n}getJsonTypeData2(e,t,i,n,a){for(var s=[],r=0;r<e.length;r++)e[r][t]==i&&e[r][n]==a&&s.push(e[r]);return s}async getMinesCanCheck(e=!1){if(0==e)return null!=this.minesCanCheckArr&&this.minesCanCheckArr.length>0?this.minesCanCheckArr:[];this.minesCanCheckArr=[];var t=await Laya.Browser.window.getMinesIndex();for(let e=0;e<t.length;e++){var i=await Laya.Browser.window.minesCanCheck(t[e]);this.minesCanCheckArr.push(i)}return this.minesCanCheckArr}async getRedirectReward(e=!1){if(0==e)return null!=this.getRedirectRewardArr&&this.getRedirectRewardArr.length>0?this.getRedirectRewardArr:[];this.getRedirectRewardArr=[];var t=await Laya.Browser.window.getRewardIndex(1);for(let e=0;e<t.length&&"0"!=t[e];e++){var i=await Laya.Browser.window.redirectReward(t[e]);this.getRedirectRewardArr.push(i)}return this.getRedirectRewardArr}async getIndirectReward(e=!1){if(0==e)return null!=this.getIndirectRewardArr&&this.getIndirectRewardArr.length>0?this.getIndirectRewardArr:[];this.getIndirectRewardArr=[];var t=await Laya.Browser.window.getRewardIndex(2);for(let e=0;e<t.length&&"0"!=t[e];e++){var i=await Laya.Browser.window.indirectReward(t[e]);this.getIndirectRewardArr.push(i)}return this.getIndirectRewardArr}async getThreeReward(e=!1){if(0==e)return null!=this.getThreeRewardArr&&this.getThreeRewardArr.length>0?this.getThreeRewardArr:[];this.getThreeRewardArr=[];var t=await Laya.Browser.window.getRewardIndex(3);for(let e=0;e<t.length&&"0"!=t[e];e++){var i=await Laya.Browser.window.threeReward(t[e]);this.getThreeRewardArr.push(i)}return this.getThreeRewardArr}}class t extends Laya.Script{constructor(){super()}onEnable(){console.log("  MinterItem  onEnable  ")}onDisable(){}onClick(){console.log(this.owner.getComponent(Laya.View)),Laya.TimeLine.to(this.owner,{scaleX:.8,scaleY:.8},100).to(this.owner,{scaleX:1,scaleY:1},100).play();new Laya.Skeleton}}class i{static get colorItemArr(){return["kuangji_blue","kuangji_green","kuangji_orange","kuangji_pink","kuangji_puple","kuangji_yellow"]}static get colorBgArr(){return["shangpinbeijng_blue","shangpinbeijng_green","shangpinbeijng_orange","shangpinbeijng_pink","shangpinbeijng_puple","shangpinbeijng_yellow"]}static getMinterColor(e){return"1"==e?"lanse":"2"==e?"lvse":"3"==e?"cs":"4"==e?"fs":"5"==e?"zs":"6"==e?"hs":void 0}static formatUserNickName(e,t=14,n=!1){return i.formatUserNickNameNew(e,t)}static formatUserNickNameNew(e,t=14){if(!e)return"";let i=0,n=[],a=[];for(let t=0;t<e.length;t++){let s=e.charAt(t);"W"==s||"M"==s||"E"==s?(i+=2,a.push(2)):"w"==s||"m"==s||"e"==s?(i+=1.5,a.push(1.5)):s.match(/^[A-Z]/)?(i+=1.3,a.push(1.3)):s.match(/[^\x00-\xff]/gi)?(i+=2,a.push(2)):(i+=1.1,a.push(1.1)),n.push(s)}if(i>t){var s="";let e=Math.floor(8*t/14),i=Math.floor(6*t/14),r=0;for(let t=0;t<n.length&&(r+=a[t])<e;t++)s+=n[t];s+="...";let o=[],l=0;for(let e=n.length-1;e>=0&&(l+=a[e])<i;e--)o.push(n[e]);o=o.reverse();for(let e=0;e<o.length;e++){s+=o[e]}return s}return e}static copyToClipboard(e){let t=document.createElement("input");t.setAttribute("readOnly","readOnly"),t.setAttribute("type","text"),t.setAttribute("value",e),t.style.opacity="0",t.style.position="absolute",document.body.appendChild(t),t.select(),t.setSelectionRange(0,t.value.length);let i=document.execCommand("Copy");return document.body.removeChild(t),i}static getNum(e,t){return e=parseFloat(e),Math.floor(e*t)/t}static formatTime(e){if(e<0)return"0";return""+(Number(e/86400)>>0)}static timeFomat(e){if(e<0)return"";var t="",i="",n="";return(t=""+(Number(e/3600)>>0))<10&&(t="0"+t),t>0?t+"時":((i=String(Number((e-3600*t)/60)>>0))<10&&(i="0"+i),(n=String(Number(e-3600*t-60*i)>>0))<10&&(n="0"+n),i+"分"+n+"秒")}}class n{constructor(){if(new.target===n)return n.Singleton||(n.Singleton=this,this._dispather=new Laya.EventDispatcher),n.Singleton}on(e,t,i,n=null){this._dispather.on(e,t,i,n)}off(e,t,i,n=!1){this._dispather.off(e,t,i,n)}once(e,t,i,n=null){this._dispather.once(e,t,i,n)}dispatch(e,t=null){return this._dispather.event(e,t)}}class a extends Laya.Script{constructor(){super(),a.Instance||(a.Instance=this);this.minter=null,this.topPanel=null,this.ShopPanel=null,this.MyPanel=null,this.BindinggFailePanel=null,this.testerror=null,this.InitPosX=330,this.InitPosY=655,this.InternalX=135,this.SameClownOffsetX=105,this.SameRowOffsetY=42,this.InternalY=85,this.InitRow=2,this.InitClown=3,this.MinterItems=[],this.LoadingPanel=null,this.BuildingPanel=null,this.InvitationPanel=null,this.xiaorene1StartPos=[625,266],this.xiaorene1EndPos=[491,324],this.xiaorene2StartPos=[443,177],this.xiaorene2EndPos=[605,214],this.jiqiren1=null,this.jiqiren1StartPos=[667,803],this.jiqiren1EndPos=[308,1173],this.jiqiren2=null,this.jiqiren2StartPos=[408,1e3],this.jiqiren2EndPos=[7,808],this.aniArr=[],this.kuagnjiArr=[],console.log("============================================")}onEnable(){}onDisable(){}onAwake(){this.LoadingPanel.visible=!0}onStart(){this.InitAllAnim()}InitAllAnim(){this.InitMinterItem("MinterItemAni.ani"),this.playAnim("res/ani/damen/damen.sk",this,190,832),this.playAnim("res/ani/ditan/ditan.sk",this,190,920),this.playAnim("res/ani/dianti/dianti.sk",this,195,520),this.playAnim("res/ani/jiantou/jiantou.sk",this,210,945),this.playAnim("res/ani/luxian1/luxian1.sk",this,210,940),this.playAnim("res/ani/luxian2/luxian2.sk",this,550,980),this.playAnim("res/ani/luxian3/luxian3.sk",this,380,335,0),this.playAnim("res/ani/qiu/qiu.sk",this,285,1020),this.playAnim("res/ani/xiaojiqi/xiaojiqi.sk",this,217,235),this.playAnim("res/ani/xiaojiqi2/xiaojiqi2.sk",this,170,305),this.playAnim("res/ani/xiaoren1/xaioren1.sk",this,170,305,-1,e=>{this.pathTween(e,this.xiaorene1StartPos,this.xiaorene1EndPos,3e3,!0,5e3)}),this.playAnim("res/ani/xiaoren2/xaioren2.sk",this,170,305,-1,e=>{this.pathTween(e,this.xiaorene2StartPos,this.xiaorene2EndPos,3e3,!0,5e3)}),this.playAnim("res/ani/xiegang/xiegang.sk",this,455,970),this.pathTween(this.jiqiren1,this.jiqiren1StartPos,this.jiqiren1EndPos,5e3,!0,8e3),this.pathTween(this.jiqiren2,this.jiqiren2StartPos,this.jiqiren2EndPos,4e3,!0,6e3),n.Singleton.on("ShopToggle",this,()=>{this.ShopPanel.visible=!1,this.ShopPanel.close()})}closeMyPanel(){this.MyPanel.visible=!1,this.MyPanel.close()}InitMinterItem(e){Laya.loader.load("MinterItemAni.ani",Laya.Handler.create(this,t=>{var i=t.props.width,n=t.props.height;this.LoadMinterItem(i,n,e)}))}LoadMinterItem(e,i,n){for(var a=0;a<this.InitRow;a++)for(var s=a%2==0?-5:0,r=a>0?-this.SameClownOffsetX*a:0,o=0;o<this.InitClown;o++){var l=new Laya.Animation;l.loadAnimation(n),this.owner.addChild(l);var h=o>0?this.SameRowOffsetY*o:0;h=s<0?h:h+12*o,l.pos(this.InitPosX+o*this.InternalX+r,this.InitPosY+a*this.InternalY+h),l.rotation=s,l.pivotX=.5*e,l.pivotY=.5*i,l.play(0,!0),l.addComponent(t),l.size(e,i),this.MinterItems.push(l)}}async openInvitationPanel(){if(0!=(await e.instance.getUsers(!0)).welMember)return"1";this.InvitationPanel.visible=!0,a.Instance.showDialog(this.InvitationPanel),this.testerror.visible=!1;let t=this.InvitationPanel.getChildByName("InputAddress");t.text="",t.prompt="请输入邀请人地址";let i=this.InvitationPanel.getChildByName("InvitationBtn");i.off(Laya.Event.CLICK,this,this.shouquan),i.on(Laya.Event.CLICK,this,this.shouquan)}async shouquan(){let t=this.InvitationPanel.getChildByName("InputAddress");var i=Laya.Browser.window.isAddress(t.text);if(console.log("isaddress::",i),0==i)return this.testerror.visible=!0,setTimeout(()=>{this.testerror.visible=!1},1e3),null;let n=await Laya.Browser.window.bindUserWelMember(t.text);if(null==n||0==n.status)return void a.Instance.showDialog(this.BindinggFailePanel);await e.instance.getUsers(!0);return this.InvitationPanel.visible=!1,n}setProgressIng(e,t=0){if(this.BuildingPanel.visible=e,0!=e){var i=this.BuildingPanel.getChildByName("progress");i.value=t,console.log("progress:",i),this.owner.addChild(this.BuildingPanel)}}getTextTip(e){this._txt=e}async setData(t=!0){return new Promise(async i=>{this._txt,await e.instance.getMyMinterData(!0),this._txt,await e.instance.getUsers(!0),this._txt,await e.instance.getMinesCanCheck(!0),1==t&&this.updataGame(),i(!0)})}async updataGame(){var t=this.owner.getChildByName("Center");this.owner.addChildAt(t,0);var n=await e.instance.getMyMinterData(!0),s=await Laya.Browser.window.getMinesIndex(),r=await e.instance.getUsers();this.topPanel.getChildByName("AddCoinBtn").label=""+r.myGold;let o=0;for(var l=0;l<this.kuagnjiArr.length;l++)o++;for(let e=o;e<n.length&&e<6;e++){if(null!=this.kuagnjiArr[e]&&null!=this.kuagnjiArr[e])return;var h=i.getMinterColor(n[e].color);console.log("color:",h),a.Instance.playAnim("res/ani/kuangji/"+h+".sk",this,this.MinterItems[e].x,this.MinterItems[e].y-70,-1,async t=>{1==await Laya.Browser.window.minesCanCheck(s[e])?this.kuagnjiArr[e].stop():this.kuagnjiArr[e].play(0,!0)},!0,e)}this.BuildingPanel.visible=!1,this.openInvitationPanel(),this.kuagnjiArr.length>=n.length&&this.isXiuli()}async isXiuli(){if(null!=this.kuagnjiArr)for(var t=await e.instance.getMinesCanCheck(!0),i=0;i<this.kuagnjiArr.length;i++)0==t[i]?this.kuagnjiArr[i].play(0,!0):this.kuagnjiArr[i].play(0,!1),this.owner.addChild(this.kuagnjiArr[i])}playAnim(e,t,i,n,a=-1,s=null,r=!1,o=-1){var l=new Laya.Templet;l.off(Laya.Event.COMPLETE,this,this.templetFun=(()=>{})),l.on(Laya.Event.COMPLETE,this,this.templetFun=(()=>{var h=l.buildArmature(0);h.pos(i,n),h.play(0,!0),t.owner.addChild(h),-1==a?t.owner.addChild(h):t.owner.setChildIndex(h,a),null!=s&&s(h),1==r?(h.stop(),this.kuagnjiArr[o]=h):null==this.aniArr[e]&&(this.aniArr[e]=h)})),l.loadAni(e)}playerLongguAni(){var e=new Laya.Skeleton;this.addChild(e),e.pos(300,350),e.load("res/skeletonEffect/win/xiaobingWIN.sk",new Laya.Handler(this,function(){e.play(1,!1)},null,!0))}closeAnim(e,t){null!=this.aniArr&&null!=this.aniArr[e]&&t.owner.removeChild(this.aniArr[e])}closeAnimKuangji(){if(null!=this.kuagnjiArr)for(var e=0;e<this.kuagnjiArr.length;e++)null!=this.kuagnjiArr[e]&&this.owner.removeChild(this.kuagnjiArr[e])}clickTween(e){Laya.TimeLine.to(e,{scaleX:.8,scaleY:.8},100).to(e,{scaleX:1,scaleY:1},100).play()}pathTween(e,t,i,n,a,s){(e.visible=!0,e.x=t[0],e.y=t[1],Laya.Tween.to(e,{x:i[0],y:i[1]},n,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{e.x=t[0],e.y=t[1],e.visible=!1})),a)&&(new Laya.Timer).loop(s,this,()=>{e.visible=!0,Laya.Tween.to(e,{x:i[0],y:i[1]},n,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{e.x=t[0],e.y=t[1],e.visible=!1}))})}showDialog(e){e.visible=!0,e.show()}closeDialog(){dialog.visible=!1,dialog.close()}}class s extends Laya.Script{constructor(){super()}onEnable(){}onDisable(){}onClick(){this.clickTween()}clickTween(){console.log(this.owner.getComponent(Laya.View)),Laya.TimeLine.to(this.owner,{scaleX:.8,scaleY:.8},100).to(this.owner,{scaleX:1,scaleY:1},100).play()}}class r extends Laya.Script{constructor(){super();this.normalImg=null,this.selectedImg=null,this.normalColor="#ffffff",this.selectColor="#3AD6E3"}onEnable(){}onDisable(){}onClick(){this.clickTween(),(new n).dispatch("UiButtonClick",this.owner.name)}clickTween(){Laya.TimeLine.to(this.owner,{scaleX:.8,scaleY:.8},100).to(this.owner,{scaleX:1,scaleY:1},100).play()}selectItem(e){this.normalImg.visible=!e,this.selectedImg.visible=e,this.owner.labelColors=e?this.selectColor:this.normalColor}}class o extends Laya.Script{constructor(){super();this.ShopItemDta={id:-1}}onEnable(){}onDisable(){}setShopItemData(e){this.ShopItemDta.id=e}}class l extends Laya.Script{constructor(){super();this.ShopItemArr=[]}onEnable(){this.type=1}onDisable(){this.type=1}onStart(){this.type=1}async buyGoleView(){var t=await e.instance.loadJson("allMinner"),i=e.instance.getJsonTypeData(t,"minner_type",3),n=await e.instance.mines();for(let e=2;e<5;e++){var a={MinerPrice:{text:Laya.Browser.window.fromWei(n[e].busdtNum)+" ETHG"},gold_txt:{text:n[e].goldNum+" Coins"},MinerName:{text:i[e-2].minner_name},MinerDes:{text:i[e-2].minner_ex}};this.ShopItemArr.push(a)}this.owner.array=this.ShopItemArr,this.owner.repeatY=3,this.owner.vScrollBarSkin="",this.owner.refresh();for(var s=0;s<3;s++){var r=this.owner.cells[s];r.getChildByName("MinerName").visible=!1,r.getChildByName("gold_txt").visible=!0;var l=r.getChildByName("ItemBuyBtn");r.getChildByName("ItemIcon").skin="res/ui/shopPanel/jinbi"+(s+1)+"@2x.png",r.getChildByName("ItemIconFrame").skin="res/ui/shopPanel/shangpinbeijing-jinbi@2x.png";var h=r.getComponent(o);h.ShopItemDta={id:s+1},l.off(Laya.Event.CLICK,this,this.onItemBuyBtnClick2),l.off(Laya.Event.MOUSE_OVER,this,this.hoverTweenOVER),l.off(Laya.Event.MOUSE_OUT,this,this.hoverTweenOut),l.on(Laya.Event.CLICK,this,this.onItemBuyBtnClick2,[{btn:l,shopItemData:h.ShopItemDta,showType:3}]),l.on(Laya.Event.MOUSE_OVER,this,this.hoverTweenOVER,[l]),l.on(Laya.Event.MOUSE_OUT,this,this.hoverTweenOut,[l])}}async onItemBuyBtnClick2(e){this.clickTween(e.btn),n.Singleton.dispatch("ShopToggle");await a.Instance.openInvitationPanel();if("3"==e.showType||3==e.showType){var t=await Laya.Browser.window.buyGold(e.shopItemData.id);null!=t&&1==t.status?a.Instance.setData():a.Instance.setProgressIng(!1)}}async onInitData(t){if(this.ShopItemArr=[],this.type=t,3!=this.type){var n=await e.instance.mines(),a=Laya.Browser.window.fromWei(n[t-1].price),s=await e.instance.loadJson("allMinner"),r=e.instance.getJsonTypeData(s,"minner_type",this.type);for(let e=0;e<i.colorItemArr.length;e++){var l={MinerPrice:{text:a+" ETH"},MinerName:{text:r[e].minner_name},MinerDes:{text:r[e].minner_ex}};this.ShopItemArr.push(l)}this.owner.array=this.ShopItemArr,this.owner.repeatY=6,this.owner.vScrollBarSkin="",this.owner.refresh();for(var h=0;h<i.colorItemArr.length;h++){var g=this.owner.cells[h];g.getChildByName("MinerName").visible=!0,g.getChildByName("gold_txt").visible=!1,3==t&&(g.getChildByName("gold_txt").visible=!0);var c=g.getChildByName("ItemBuyBtn");g.getChildByName("ItemIcon").skin="res/ui/shopPanel/"+i.colorItemArr[h]+".png",g.getChildByName("ItemIconFrame").skin="res/ui/shopPanel/"+i.colorBgArr[h]+".png";var m=g.getComponent(o);m.ShopItemDta={id:h+1},c.off(Laya.Event.CLICK,this,this.onItemBuyBtnClick),c.off(Laya.Event.MOUSE_OVER,this,this.hoverTweenOVER),c.off(Laya.Event.MOUSE_OUT,this,this.hoverTweenOut),c.on(Laya.Event.CLICK,this,this.onItemBuyBtnClick,[{btn:c,shopItemData:m.ShopItemDta,showType:t}]),c.on(Laya.Event.MOUSE_OVER,this,this.hoverTweenOVER,[c]),c.on(Laya.Event.MOUSE_OUT,this,this.hoverTweenOut,[c])}}else this.buyGoleView(3)}async onItemBuyBtnClick(t){if(this.clickTween(t.btn),n.Singleton.dispatch("ShopToggle"),null!=await a.Instance.openInvitationPanel()){(await e.instance.getMyMinterData()).length,a.Instance.setProgressIng(!0);var i=await Laya.Browser.window.buyMine(t.showType,t.shopItemData.id);null!=i&&1==i.status?a.Instance.setData():a.Instance.setProgressIng(!1)}}clickTween(e){Laya.TimeLine.to(e,{scaleX:.8,scaleY:.8},100).to(e,{scaleX:1,scaleY:1},100).play()}hoverTweenOVER(e){Laya.TimeLine.to(e,{scaleX:1.05,scaleY:1.05},100).play()}hoverTweenOut(e){Laya.TimeLine.to(e,{scaleX:1,scaleY:1},100).play()}}class h extends Laya.Script{constructor(){super();this.toggleGoldBtn=null,this.toggleSliverBtn=null,this.toggleCoinBtn=null,this.toggleNornalImg=null,this.toggleSelectedImg=null,this.shopList=null,this.ToggleMap=new Map,this.normalLabelColor="#7088B2",this.selectLabelColor="#B3C7D7"}onEnable(){}onDisable(){this.onToggleGoldBtnClick()}onAwake(){this.initToggle()}onStart(){}initToggle(){this.ToggleMap.set(this.toggleGoldBtn.name,this.toggleGoldBtn),this.ToggleMap.set(this.toggleSliverBtn.name,this.toggleSliverBtn),this.ToggleMap.set(this.toggleCoinBtn.name,this.toggleCoinBtn),this.toggleGoldBtn.on(Laya.Event.CLICK,this,this.onToggleGoldBtnClick),this.toggleSliverBtn.on(Laya.Event.CLICK,this,this.onToggleSliverBtnClick),this.toggleCoinBtn.on(Laya.Event.CLICK,this,this.onToggleCoinBtnClick)}onToggleGoldBtnClick(){this.onToggleClick("TagGoldBtn")}onToggleSliverBtnClick(){this.onToggleClick("TagSliverBtn")}onToggleCoinBtnClick(){this.onToggleClick("TagCoinBtn")}onToggleClick(e){let t=-1;"TagGoldBtn"==e?t=1:"TagSliverBtn"==e?t=2:"TagCoinBtn"==e&&(t=3),this.shopList.getComponent(l).onInitData(t);var i=this.normalLabelColor,n=this.selectLabelColor,a=this.toggleNornalImg,s=this.toggleSelectedImg;this.ToggleMap.forEach(function(t,r,o){t.skin=e==r?s.skin:a.skin,t.labelColors=e==r?n:i})}}class g extends Laya.Script{constructor(){super();this.BtnMap=new Map,this.CurSelectedBtn,this.DefaultBtn,this.ShopDialog=null,this.TeamDialog=null,this.RepairDialog=null,this.MeDialog=null,this.initUi=!1,this.isClick=!1}onEnable(){}onDisable(){}onAwake(){for(var e=this.owner.numChildren,t=0;t<e;t++){var i=this.owner.getChildAt(t).getComponent(r);null!=i&&(this.BtnMap.set(i.owner.name,i),this.DefaultBtn||(this.DefaultBtn=i.owner.name))}this.isClick=!1,(new n).on("UiButtonClick",this,this.onBtnClick)}onStart(){this.onBtnClick("")}async onBtnClick(t){1!=this.isClick&&(this.isClick=!0,console.log("=========================="),this.CurSelectedBtn=this.BtnMap.get(t),this.setBtnState(this.CurSelectedBtn),"ShopBtn"==t?a.Instance.showDialog(this.ShopDialog):"TeamBtn"==t?(a.Instance.setProgressIng(!0,.2),await e.instance.getRedirectReward(!0),a.Instance.setProgressIng(!0,.4),await e.instance.getIndirectReward(!0),a.Instance.setProgressIng(!0,.7),await e.instance.getThreeReward(!0),a.Instance.setProgressIng(!0,.9),a.Instance.showDialog(this.TeamDialog),a.Instance.setProgressIng(!1)):"RepairBtn"==t?(this.initUi=!1,a.Instance.setProgressIng(!0,.2),await e.instance.getMinesCanCheck(!0),a.Instance.setProgressIng(!0,.6),await e.instance.getMyMinterData(!0),a.Instance.setProgressIng(!0,.8),a.Instance.showDialog(this.RepairDialog),a.Instance.setProgressIng(!1),this.initUi=!0):"MeBtn"==t&&(this.initUi=!1,a.Instance.setProgressIng(!0,.2),await e.instance.getMyMinterData(!0),setTimeout(()=>{0==this.initUi&&a.Instance.setProgressIng(!0,.5)},400),setTimeout(()=>{0==this.initUi&&a.Instance.setProgressIng(!0,.8)},800),a.Instance.showDialog(this.MeDialog),a.Instance.setProgressIng(!1),this.initUi=!0),this.isClick=!1)}setBtnState(e){this.BtnMap.forEach(function(t,i,n){t.selectItem(t==e)})}}class c extends Laya.Script{constructor(){super();this.MyMinerBtn=null,this.MyHomeBtn=null,this.toggleNornalImg=null,this.toggleSelectedImg=null,this.shopList=null,this.myHomeItem=null,this.ToggleMap=new Map,this.normalLabelColor="#7088B2",this.selectLabelColor="#B3C7D7",this.ShopItemArr=[]}onEnable(){this.onToggleMyMinerBtnClick(),this.onInitData()}onDisable(){this.shopList.array=[],this.shopList.repeatY=0,this.shopList.vScrollBarSkin="",this.shopList.refresh()}onAwake(){this.initToggle()}onStart(){this.shopList.array=[],this.shopList.repeatY=0,this.shopList.vScrollBarSkin="",this.shopList.refresh()}initToggle(){this.ToggleMap.set(this.MyMinerBtn.name,this.MyMinerBtn),this.ToggleMap.set(this.MyHomeBtn.name,this.MyHomeBtn),this.MyMinerBtn.on(Laya.Event.CLICK,this,this.onToggleMyMinerBtnClick),this.MyHomeBtn.on(Laya.Event.CLICK,this,this.onToggleMyHomeBtnClick)}onToggleMyMinerBtnClick(){this.onToggleClick("MyMinerBtn"),this.myHomeItem.visible=!1,this.shopList.visible=!0}onToggleMyHomeBtnClick(){this.onToggleClick("MyHomeBtn"),this.shopList.visible=!1,this.myHomeItem.visible=!0,this.MyHome()}async MyHome(){var t=await e.instance.getUsers();if(""==t.nickName)var n=i.formatUserNickNameNew(localStorage.getItem("account"));else n=i.formatUserNickNameNew(t.nickName);this.myHomeItem.getChildByName("PlayerName").text=n,this.myHomeItem.getChildByName("MinerAddress").text=""+localStorage.getItem("account");var s=this.myHomeItem.getChildByName("CopyAddressBtn");s.on(Laya.Event.CLICK,this,e=>{i.copyToClipboard(localStorage.getItem("account"))},[{btn:s}]),s.on(Laya.Event.MOUSE_OVER,this,this.hoverTweenOVER,[s]),s.on(Laya.Event.MOUSE_OUT,this,this.hoverTweenOut,[s]);var r=this.myHomeItem.getChildByName("LogoutBtn");r.on(Laya.Event.CLICK,this,()=>{a.Instance.showDialog(a.Instance.LoadingPanel),a.Instance.closeMyPanel()},[{btn:r}]),r.on(Laya.Event.MOUSE_OVER,this,this.hoverTweenOVER,[r]),r.on(Laya.Event.MOUSE_OUT,this,this.hoverTweenOut,[r]);var o=this.myHomeItem.getChildByName("ModifyNameBtn"),l=this.myHomeItem.getChildByName("PlayerName");o.on(Laya.Event.CLICK,this,async t=>{var i=l.text;if(""!=i){var n=await Laya.Browser.window.setNickName(i);if(null==n||0==n.status)return;await e.instance.getUsers(!0)}})}async onInitData(){this.ShopItemArr=[];var t=await e.instance.getMyMinterData(),n=await e.instance.loadJson("allMinner"),a=await Laya.Browser.window.getTodayTime();for(let r=0;r<t.length;r++){var s={MinerName:{text:e.instance.getJsonTypeData2(n,"minner_id",t[r].color,"minner_type",t[r].types)[0].minner_name},MinerExtracted:{text:i.getNum(Laya.Browser.window.fromWei(t[r].total),1e3)},MinerTotalDays:{text:i.formatTime(a-t[r].buyDays)}};this.ShopItemArr.push(s)}this.shopList.array=this.ShopItemArr,this.shopList.repeatY=this.ShopItemArr.length,this.shopList.vScrollBarSkin="",this.shopList.refresh();for(var r=0;r<this.ShopItemArr.length;r++){var o=this.shopList.cells[r],l=o.getChildByName("ReceiveBuy"),h=o.getChildByName("ItemIcon"),g=o.getChildByName("MinerTotalRevenue"),c=i.getNum(Laya.Browser.window.fromWei(t[r].release),1e3)+" ETH";g.text=c;var m=parseInt(t[r].color)-1;h.skin="res/ui/shopPanel/"+i.colorItemArr[m]+".png",o.getChildByName("ItemIconFrame").skin="res/ui/shopPanel/"+i.colorItemArr[r]+".png",l.on(Laya.Event.CLICK,this,this.onItemBuyBtnClick,[{btn:l,id:r}]),l.on(Laya.Event.MOUSE_OVER,this,this.hoverTweenOVER,[l]),l.on(Laya.Event.MOUSE_OUT,this,this.hoverTweenOut,[l])}}async onItemBuyBtnClick(t){a.Instance.setProgressIng(!0),a.Instance.closeMyPanel();var i=await Laya.Browser.window.getMinesIndex(),n=await Laya.Browser.window.getMineYesterday(i[t.id]);null!=n&&1==n.status?(await e.instance.getMinesCanCheck(!0),await a.Instance.setData()):a.Instance.setProgressIng(!1)}hoverTweenOVER(e){Laya.TimeLine.to(e,{scaleX:1.05,scaleY:1.05},100).play()}hoverTweenOut(e){Laya.TimeLine.to(e,{scaleX:1,scaleY:1},100).play()}onToggleClick(e){var t=this.normalLabelColor,i=this.selectLabelColor,n=this.toggleNornalImg,a=this.toggleSelectedImg;this.ToggleMap.forEach(function(s,r,o){s.skin=e==r?a.skin:n.skin,s.labelColors=e==r?i:t})}}class m extends Laya.Script{constructor(){super();this.TagKingBtn=null,this.TagDemeanorBtn=null,this.TagEliteBtn=null,this.toggleNornalImg=null,this.toggleSelectedImg=null,this.rankList=null,this.type_txt=null,this.KingValue=null,this.ToggleMap=new Map,this.normalLabelColor="#7088B2",this.selectLabelColor="#B3C7D7"}onEnable(){this.onTagKingBtnClick()}async onDisable(){}onAwake(){this.initToggle()}onStart(){this.owner.getChildByName("TopCotent");this.initList(),this.KingValue.visible=!1}initList(){this.rankList.array=[],this.rankList.vScrollBarSkin="",this.rankList.repeatY=0,this.rankList.refresh()}async onInitData(t){this.initList();var n=await Laya.Browser.window.users();if(1==t){var a=await e.instance.getRedirectReward(!1);this.type_txt.text="King:"+n.redirectNum}if(2==t){a=await e.instance.getIndirectReward(!1);this.type_txt.text="Demeanor:"+n.indirectNum}if(3==t){a=await e.instance.getThreeReward(!1);this.type_txt.text="Elite:"+n.threeNum}this.ShopItemArr=[];for(let e=0;e<a.length;e++){if(3==t)var s={MinerAddress:{text:a[e].addr},MinerType:{text:a[e].mineType+" Miner"},EthIcon:{text:a[e].EthIcon},ETHCount:{text:a[e].ETHCount},CoinIcon:{text:a[e].CoinIcon},CoinCount:{text:a[e].CoinCount}};else s={MinerAddress1:{text:i.formatUserNickNameNew(a[e].addr)},MinerType1:{text:a[e].mineType+" Miner"},CoinIcon1:{text:a[e].CoinIcon},CoinCount1:{text:Laya.Browser.window.fromWei(a[e].reward)}};this.ShopItemArr.push(s)}if(!(null==this.ShopItemArr||this.ShopItemArr.length<=0)){this.rankList.array=this.ShopItemArr,this.rankList.repeatY=a.length,this.rankList.refresh();for(var r=0;r<this.ShopItemArr.length;r++){var o=this.rankList.cells[r];o.getChildByName("MinerAddress").visible=!1,o.getChildByName("MinerType").visible=!1,o.getChildByName("EthIcon").visible=!1,o.getChildByName("ETHCount").visible=!1,o.getChildByName("CoinIcon").visible=!1,o.getChildByName("CoinCount").visible=!1,o.getChildByName("MinerAddress1").visible=!1,o.getChildByName("MinerType1").visible=!1,o.getChildByName("CoinIcon1").visible=!1,o.getChildByName("CoinCount1").visible=!1,1==t||2==t?(o.getChildByName("MinerAddress1").visible=!0,o.getChildByName("MinerType1").visible=!0,o.getChildByName("CoinIcon1").visible=!0,o.getChildByName("CoinCount1").visible=!0):(o.getChildByName("MinerAddress").visible=!0,o.getChildByName("MinerType").visible=!0,o.getChildByName("EthIcon").visible=!0,o.getChildByName("ETHCount").visible=!0,o.getChildByName("CoinIcon").visible=!0,o.getChildByName("CoinCount").visible=!0)}}}initToggle(){this.ToggleMap.set(this.TagKingBtn.name,this.TagKingBtn),this.ToggleMap.set(this.TagDemeanorBtn.name,this.TagDemeanorBtn),this.ToggleMap.set(this.TagEliteBtn.name,this.TagEliteBtn),this.TagKingBtn.on(Laya.Event.CLICK,this,this.onTagKingBtnClick),this.TagDemeanorBtn.on(Laya.Event.CLICK,this,this.onTagDemeanorBtnClick),this.TagEliteBtn.on(Laya.Event.CLICK,this,this.onTagEliteBtnClick)}async onTagKingBtnClick(){this.onToggleClick("TagKingBtn"),this.onInitData(1)}onTagDemeanorBtnClick(){this.onToggleClick("TagDemeanorBtn"),this.onInitData(2)}onTagEliteBtnClick(){this.onToggleClick("TagEliteBtn"),this.onInitData(3)}onToggleClick(e){console.log(e);var t=this.normalLabelColor,i=this.selectLabelColor,n=this.toggleNornalImg,a=this.toggleSelectedImg;this.ToggleMap.forEach(function(s,r,o){s.skin=e==r?a.skin:n.skin,s.labelColors=e==r?i:t})}}class y extends Laya.Script{constructor(){super(),this.ETHVaule=null,this.CoinValue=null,this.ReceiveETH=null,this.ReceiveCoin=null}onEnable(){}onDisable(){this.onInitData()}onAwake(){this.initToggle()}onStart(){}initList(){}async onInitData(){var e=await Laya.Browser.window.users();this.ETHVaule.text=Laya.Browser.window.fromWei(e.receiveEth),this.CoinValue.text=e.receiveGold,this.ReceiveETH.off(Laya.Event.CLICK,this,this.getEth_fun),this.ReceiveCoin.off(Laya.Event.CLICK,this,this.getGold_fun),this.ReceiveETH.on(Laya.Event.CLICK,this,this.getEth_fun),this.ReceiveCoin.on(Laya.Event.CLICK,this,this.getGold_fun)}async getEth_fun(){var t=await Laya.Browser.window.getEth();await e.instance.getMinesCanCheck(!0),await a.Instance.setData(),null!=t&&1==t.status&&(this.ETHVaule.text="0")}async getGold_fun(){var t=await Laya.Browser.window.getGold();await e.instance.getMinesCanCheck(!0),await a.Instance.setData(),null!=t&&1==t.status&&(this.CoinValue.text="0")}initToggle(){}async onTagKingBtnClick(){}onTagDemeanorBtnClick(){this.onToggleClick("TagDemeanorBtn")}onTagEliteBtnClick(){this.onToggleClick("TagEliteBtn")}onToggleClick(e){}}class d extends Laya.Script{constructor(){super(),this.shopList=null,this.repairItemPanel=null}onEnable(){this.onInitData()}onDisable(){this.initList()}onAwake(){this.initToggle()}onStart(){this.initList()}initToggle(){}initList(){this.ShopItemArr=[],this.shopList.array=[],this.shopList.repeatY=0,this.shopList.vScrollBarSkin="",this.shopList.refresh()}async onInitData(){this.ShopItemArr=[],this.initList();var t=await e.instance.getMinesCanCheck(!0);console.log("minesCanCheckArr::",t);var n=await e.instance.loadJson("allMinner"),a=await Laya.Browser.window.getMinesIndex(),s=await e.instance.getMyMinterData(!0);console.log("getMinesIndex::",a),console.log("getMyMinterDataArr::",s);var r=await Laya.Browser.window.getTodayTime();for(let i=0;i<s.length;i++){var o=e.instance.getJsonTypeData2(n,"minner_id",s[i].color,"minner_type",s[i].types),l={MinerName:{text:o[0].minner_name},MinerDes:{text:o[0].minner_ex},color:parseInt(s[i].color)-1,types:parseInt(s[i].types)-1,canCheck:t[i],sytime:s[i].checkTime-r,mineId:a[i]};this.ShopItemArr.push(l),0}if(console.log("ShopItemArr::",this.ShopItemArr),!(null==this.ShopItemArr||this.ShopItemArr.length<=0)){this.shopList.array=this.ShopItemArr,this.shopList.repeatY=this.ShopItemArr.length,this.shopList.refresh();for(var h=0;h<this.ShopItemArr.length;h++){var g=this.shopList.cells[h],c=g.getChildByName("ItemRepairBtn"),m=g.getChildByName("ItemIcon"),y=g.getChildByName("daojishi_txt"),d=this.ShopItemArr[h].color,u=this.ShopItemArr[h].canCheck;y.text=1==u?"可修理":i.timeFomat(this.ShopItemArr[h].sytime)+"后可修理",m.skin="res/ui/shopPanel/"+i.colorItemArr[d]+".png",g.getChildByName("ItemIconFrame").skin="res/ui/shopPanel/"+i.colorItemArr[d]+".png",c.on(Laya.Event.CLICK,this,this.onItemBuyBtnClick,[{btn:c,id:this.ShopItemArr[h].mineId,ShopItem:this.ShopItemArr[h]}]),c.on(Laya.Event.MOUSE_OVER,this,this.hoverTweenOVER,[c]),c.on(Laya.Event.MOUSE_OUT,this,this.hoverTweenOut,[c])}}}async onItemBuyBtnClick(t){this.owner.close(),a.Instance.showDialog(this.repairItemPanel);var n=this.repairItemPanel.getChildByName("RepairCard"),s=i.colorItemArr[t.ShopItem.color];n.skin="res/ui/shopPanel/"+s+".png";var r=this.repairItemPanel.getChildByName("RepairBtn"),o=this.repairItemPanel.getChildByName("CostLabel"),l=this.repairItemPanel.getChildByName("MinerName2");this.repairItemPanel.getChildByName("CostValue").visible=!1;var h=await e.instance.loadJson("allMinner"),g=e.instance.getJsonTypeData2(h,"minner_id",parseInt(t.ShopItem.color)+1,"minner_type",parseInt(t.ShopItem.types)+1);l.text=g[0].minner_name;var c=await e.instance.mines();o.text="cost: "+c[parseInt(t.ShopItem.types)].gold,r.on(Laya.Event.CLICK,this,this.onItemBuyBtnClick2,[{btn:r,id:t.id}]),r.on(Laya.Event.ROLL_OUT,this,e=>{this.hoverTweenOVER(e.btn)},[{btn:r,id:t.id}]),r.on(Laya.Event.ROLL_OVER,this,e=>{this.hoverTweenOut(e.btn)},[{btn:r,id:t.id}])}async onItemBuyBtnClick2(t){a.Instance.setProgressIng(!0);await e.instance.getMinesCanCheck();this.repairItemPanel.visible=!1,console.log("xiuli@@@@:",t);var i=await Laya.Browser.window.signMine(t.id);null!=i&&1==i.status?(await e.instance.getMinesCanCheck(!0),await a.Instance.setData()):a.Instance.setProgressIng(!1)}hoverTweenOVER(e){Laya.TimeLine.to(e,{scaleX:1.05,scaleY:1.05},100).play()}hoverTweenOut(e){Laya.TimeLine.to(e,{scaleX:1,scaleY:1},100).play()}onToggleClick(e){var t=this.normalLabelColor,i=this.selectLabelColor,n=this.toggleNornalImg,a=this.toggleSelectedImg;this.ToggleMap.forEach(function(s,r,o){s.skin=e==r?a.skin:n.skin,s.labelColors=e==r?i:t})}onToggleMyMinerBtnClick(){}}class u extends Laya.Script{constructor(){super();this.CommitBtn=null,this.LoadBtn=null,this.tishi_txt=null,this.CommitBtnState=!0,this.NoSelectSkin="res/ui/LoadPanel/image-kuang.png",this.SelectSkin="res/ui/LoadPanel/image-duihao.png"}onEnable(){}onDisable(){}onAwake(){this.refreshSkin(),this.CommitBtn.on(Laya.Event.CLICK,this,()=>{this.CommitBtnState=!this.CommitBtnState,this.refreshSkin()})}onStart(){a.Instance.playAnim("res/ani/dajiqiren/dajiqiren.sk",this,410,510,1),this.LoadBtn.on(Laya.Event.CLICK,this,this.onLoadBtnClick)}async onLoadBtnClick(){(this.tishi_txt.text="1%",this.tishi_txt.visible=!0,this.CommitBtnState)&&(this.LoadBtn.visible=!1,a.Instance.clickTween(this.LoadBtn),a.Instance.getTextTip(this.tishi_txt),a.Instance.playAnim("res/ani/denglu/denglu.sk",this,380,1110,-1),this.tishi_txt.text="20%",await e.instance.mines(!0),this.tishi_txt.text="40%",await a.Instance.setData(!1),this.tishi_txt.text="80%",await a.Instance.updataGame(),this.tishi_txt.text="95%",(new Laya.Timer).once(1500,this,()=>{this.tishi_txt.text="",a.Instance.closeAnim("res/ani/denglu/denglu.sk",this),this.LoadBtn.visible=!0,this.owner.close()}))}refreshSkin(){this.CommitBtn.skin=this.CommitBtnState?this.SelectSkin:this.NoSelectSkin}}class p extends Laya.Script{constructor(){super(),p.Instance||(p.Instance=this)}onAwake(){}onStart(){this.loadHtmlObject()}loadHtmlObject(){Laya.Browser.window.address()}}class w{static init(){let e=Laya.ClassUtils.regClass;e("game/GameMgr.js",a),e("ui/AddCoinBtn.js",s),e("ui/UIButton.js",r),e("ui/BottomPanel.js",g),e("ui/ShopPanel/ShopToggle.js",h),e("ui/ShopPanel/ShopItem.js",o),e("ui/ShopPanel/ShopList.js",l),e("ui/MyPanel/MyPanelTogle.js",c),e("ui/RankPanel/RankToggle.js",m),e("ui/RankPanel/RankPanel.js",y),e("ui/RepairPanel/RepairPanel.js",d),e("ui/LoadingPanel/LoadingPanel.js",u),e("game/NetManager.js",p)}}w.width=750,w.height=1334,w.scaleMode="showall",w.screenMode="horizontal",w.alignV="middle",w.alignH="center",w.startScene="Main.scene",w.sceneRoot="",w.debug=!0,w.stat=!1,w.physicsDebug=!1,w.exportSceneToJson=!0,w.init();new class{constructor(){Config.isAntialias=!0,Config.useWebGL2=!1,window.Laya3D?Laya3D.init(750,1334):Laya.init(750,1334,Laya.WebGL),this.ape=null,this.showApe(),Laya.Physics&&Laya.Physics.enable(),Laya.stage.scaleMode="showall",Laya.stage.screenMode="none",Laya.stage.alignV="middle",Laya.stage.alignH="center",Laya.URL.exportSceneToJson=!0,Laya.ResourceVersion.enable("version-b772df9bcb.json",Laya.Handler.create(this,this.onVersionLoaded),Laya.ResourceVersion.FILENAME_VERSION)}onVersionLoaded(){Laya.AtlasInfoManager.enable("fileconfig.json",Laya.Handler.create(this,this.onConfigLoaded))}onConfigLoaded(){w.startScene&&Laya.Scene.open(w.startScene),null!=this.ape&&Laya.stage.addChild(this.ape)}showApe(){this.ape=new Laya.Sprite,Laya.stage.addChild(this.ape),this.ape.loadImage("./res/loadingWork.png"),Laya.Browser.window.removeLoadingWork()}}}();