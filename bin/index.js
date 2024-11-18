/**
 * 设置LayaNative屏幕方向，可设置以下值
 * landscape           横屏
 * portrait            竖屏
 * sensor_landscape    横屏(双方向)
 * sensor_portrait     竖屏(双方向)
 */
window.screenOrientation = "landscape";

//-----libs-begin-----

loadingWork()
loadLib("libs/laya.core.js")
loadLib("libs/laya.ani.js")
loadLib("libs/laya.ui.js")
loadLib("libs/laya.physics.js")
loadLib("libs/LayaGCS.min.js")
loadLib("libs/web3-50b331ceab.min.js")
loadLib("libs/web3-provider-ecd0acbd0f.min.js")
loadLib("libs/web3modal-aac4569bbf.min.js")
//-----libs-end-------
loadLib("js/bundle.js");
