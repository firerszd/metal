// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: 
    {
        startBtn:cc.node,
        gameManager:cc.gameManager,
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        var canvs = cc.find("Canvas");
        this.gameManager = canvs.getComponent("gameManager");
        this.startBtn = cc.find("startBtn", this.node);
        var that = this;
        this.startBtn.on(cc.Node.EventType.TOUCH_END, function (event) 
        {
            that.gameManager.GameStart();
            console.log("BackButton");
            that.node.active = false;
        });
        this.scheduleOnce(function() 
        {  
            this.startBtn.active = true; 
        }, 1);  
    },

    start () {

    },

    // update (dt) {},
});
