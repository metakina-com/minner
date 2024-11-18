/**
 * ETH区块链相关
 */
declare class 


LayaGCS{
	/*
		ETH的功能类实例，封装了bip协议以及账户签名算法
	*/
	static ETHBip:Object;

	/*
		得到当前已经unlock的ETH账户，如果是undefined说明玩家还没登陆
	*/
	static get_current_account():string;
	/*
		初始化LayaGCS，需要传入Laya.stage根节点以及网络network
		 //初始化LayaGCS
   		 LayaGCS.initlize({
			laya_stage_node:laya.stage,     //Laya Air根节点
			network:0                       //ETH区块链网络（0位测试网络Rinkedby , 1为正式网络MainNet)
			auto_load_last_account:false    //自动读取上次登入的账户
		})
	*/
	static initlize(t:Object):void;
	/*
		是否已经初始化完成
	*/
	static initlized:boolean;
	/*	
		当前使用的区块链网络，0为Rinkedby , 1是正式网络
	*/
	static network:number;
	/*
		sdk资源回调完成
	*/
	static onSDKResouceLoaded():void;
	/*
		设置初始化完成回调
	*/
	static set_inited_callback(t:Function):void;
	/*
		打开登陆界面（如果已经登录，进入账户界面)
	*/
	static show_login_ui(t:any):void;
	/*
		已经设定的Laya.stage
	*/
	static target_stage:Object;
	/*
		
		这是一个完整的web3实例。LayaGCS的web3有一些改动。

		由于LayaOne提供了一个全节点，所以游戏前端无需同步区块数据

		为了更好的游戏体验，LayaGCS.web3不再提供同步方法，例如

		var balance = web3.eth.getBalance(LayaGCS.get_default_account()); //同步的写法，LayaGCS不再支持

		支持的写法

		1.
		co(function*(){
			var balance = yield function(done){
			web3.eth.getBalance(LayaGCS.get_default_account(),done)
			}

			console.log('账户余额为',balalnce)
		})

		2. web3.eth.getBalance(LayaGCS.get_default_account,function(err,result){
			console.log(result)
		})


	*/
	static web3:any;
}