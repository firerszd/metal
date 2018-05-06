// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var CHelper = require("CHelper");
var BulletManager = require("BulletManager");
cc.Class({
    extends: cc.Component,

    properties: 
    {
        keyLeft:false,
        keyRight:false,
        keyDown:false,
        keyUp:false,
        bJump:false,
        body:cc.RigidBody,
        leftDelta:cc.Vec2,
        deltaMove:cc.Vec2,
        fireDown:false,
        roleAnimation:null,
        bRun:false,
        direct:false,               //false左边 人物朝向
        gameManager:cc.gameManager,

        fireAngle:0,                //射击角度
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.leftDelta = new cc.Vec2(150, 0);
        this.deltaMove = new cc.Vec2(0, 0);
        var canvs = cc.find("Canvas");
        this.gameManager = canvs.getComponent("gameManager");
        this.body = this.node.getComponent(cc.RigidBody);
        this.roleAnimation = this.node.getComponent("roleAnimation");
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown (event) {
        switch(event.keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this.keyLeft = true;
                this.keyRight = false;
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this.keyRight = true;
                this.keyLeft = false;
                break;
            case cc.KEY.up:
            case cc.KEY.w:
                this.keyUp = true;
                this.keyDown = false;
                break;
            case cc.KEY.down:
            case cc.KEY.s:
                this.keyDown = true;
                this.keyUp = false;
                break;
            case cc.KEY.k:
                this.RoleJump();
                break;
            case cc.KEY.j:
                this.RoleFire();
                break;
        }
    },

    onKeyUp (event) {
        switch(event.keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this.keyLeft = false;
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this.keyRight = false;
                break;
            case cc.KEY.up:
            case cc.KEY.w:
                this.keyUp = false;
                break;
            case cc.KEY.down:
            case cc.KEY.s:
                this.keyDown = false;
                break;
            case cc.KEY.k:
                break;
            case cc.KEY.j:
                this.fireDown = false;
                break;
        }
    },

    start () {

    },

    update (dt) 
    {
        this.deltaMove.x = 0;
        var move = false;
        var dir = false;
        if(this.keyRight)
        {     
            dir = true;
            move = true;
            this.deltaMove.x = this.leftDelta.x * dt;
        }
        else if(this.keyLeft)
        {
            dir = false;
            move = true;
            this.deltaMove.x = -this.leftDelta.x * dt;
        }
        this.deltaMove.x += this.node.position.x;       
        this.deltaMove.y = this.node.position.y;
        this.node.setPosition(this.deltaMove);
        if(move != this.bRun)
        {
            if(move)
            {
                this.roleAnimation.moveDown();
            }
            else
            {
                this.roleAnimation.idleDown();
            }
            this.bRun = move;
        }
        if(dir != this.direct && move)
        {
            if(dir)
            {
                this.node.scaleX = -1;
            }
            else
            {
                this.node.scaleX = 1;
            }
            this.direct = dir;
        }
    },

    onBeginContact(contact, selfCollider, otherCollider) 
    {
        this.bJump = false;
    },

    RoleJump()
    {
        if(!this.bJump)
        {
            this.bJump = true;
            CHelper.Box2dApplyForce(this.body, new cc.Vec2(0, 400));
        }
    },

    RoleFire()
    {
        this.fireDown = true;
        this.roleAnimation.fire();
        this.fireAngle = this.node.rotation;
        if(this.node.scaleX == 1)
        {
            this.fireAngle = 180 - this.fireAngle;
        }      
        BulletManager.CreateBullet(this.node, this.fireAngle);
    },

});
