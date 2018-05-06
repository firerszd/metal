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
        roleControl:null,
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
        var FirenBtn = cc.find("FireBtn", this.node);
        var JumpBtn = cc.find("JumpBtn", this.node);
        FirenBtn.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        FirenBtn.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        JumpBtn.on(cc.Node.EventType.TOUCH_START, this.onJump, this);
    },

    onTouchStart: function (event) 
    {
        this.roleControl.RoleFire();        
    },

    onJump: function (event) 
    {
        this.roleControl.RoleJump();        
    },

    onTouchEnd: function (event) {
    },

    start () {

    },

    // update (dt) {},
});
