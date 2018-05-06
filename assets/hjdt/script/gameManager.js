// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var lsManager = require("loadsourceManager");
var BulletManager = require("BulletManager");
var EntityManager = require("EntityManager");
var ConstString = require("ConstString");
cc.Class({
    extends: cc.Component,

    properties: 
    {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        BulletManager.BulletManagerInit();
        EntityManager.EntityManagerInit();
    },

    start () {

    },

    GameStart()
    {
        lsManager.loadRes("prefab/role1", this.AfterCreateRole, this);
        lsManager.loadRes("prefab/BattleScene", this.AfterCreateScene, this);
        lsManager.loadRes("prefab/Joystick", this.AfterCreateJoystick, this);
        lsManager.loadRes("prefab/FireGroupBtn", this.AfterCreateFireGroupBtn, this);
    },

    AfterCreateRole(prefab, that)
    {
        var entity = EntityManager.CreateEntity(ConstString.EntityManager.Role);
        prefab.parent = that.node;
        entity.node = prefab;
        EntityManager.RoleEntity = entity;
        
        if(EntityManager.JoystickEntity.node != null)
        {
            that.SetJoystick();
        }
    },

    AfterCreateScene(prefab, that)
    {
        var entity = EntityManager.CreateEntity(ConstString.EntityManager.Scene);
        entity.node = prefab;
        prefab.parent = that.node;
        prefab.setLocalZOrder(-1);
    },

    AfterCreateJoystick(prefab, that)
    {
        var entity = EntityManager.CreateEntity(ConstString.EntityManager.Joystick);
        EntityManager.JoystickEntity = entity;
        entity.node = prefab;
        prefab.parent = that.node;
        var posNode = cc.find("Canvas/JoyPos");
        prefab.setPosition(posNode.x, posNode.y);        
        if(EntityManager.RoleEntity.node != null)
        {
            that.SetJoystick();     
        }
    },

    AfterCreateFireGroupBtn(prefab, that)
    {
        var entity = EntityManager.CreateEntity(ConstString.EntityManager.FireBtn);
        EntityManager.FireBtnEntity = entity;
        entity.node = prefab;
        prefab.parent = that.node;;
        var posNode = cc.find("Canvas/FirePos");
        prefab.setPosition(posNode.x, posNode.y);
    },

    SetJoystick()
    {        
        var script = EntityManager.JoystickEntity.node.getComponent('Joystick');
        var roleControl = EntityManager.RoleEntity.node.getComponent('roleControl'); 
        var joybgNode = cc.find("JoyBG", EntityManager.JoystickEntity.node);
        var joybgNodeScript = joybgNode.getComponent('JoystickBG');
        joybgNodeScript.roleControl = roleControl;
        var FireGroupBtn = EntityManager.FireBtnEntity.node.getComponent('FireGroupBtn');
        FireGroupBtn.roleControl = roleControl;
        script.SetControlNode(EntityManager.RoleEntity.node);
        script.Init();
        joybgNodeScript.Init();
    },

    update (dt) 
    {
        BulletManager.update(dt);
    },
});
