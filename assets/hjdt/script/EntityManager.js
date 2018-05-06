var DicHelper = require("DicHelper");
var EntityManager = 
{    
    EntityArray:Array,
    FreeEntityArray:Array,
    RoleEntity:cc.Node,
    JoystickEntity:cc.Node,
    FireBtnEntity:cc.Node,
    EntityID:0,

    EntityManagerInit()
    {
        this.EntityArray = new Array();
        this.FreeEntityArray = new Array();
    },

    CreateEntity:function(tagStr)
    {
        var entity = this.GetFreeEntity();
        if(entity == null)
        {
            entity = cc.Class({
                properties: 
                {
                    id:0,
                    bUse:true,
                    tag:"",
                    node:cc.Node,
                }            
            });
            this.EntityArray.push(entity);
        }
        this.EntityID++;
        entity.id = this.EntityID;
        entity.tag = tagStr;
        return entity;
    },

    GetFreeEntity : function()
    {
        if(this.FreeEntityArray.length > 0)
        {
            return this.FreeEntityArray.shift();
        }
        return null;
    },

    GetEntityByTag:function(tagStr)
    {
        for(var i = 0; i < this.EntityArray.length; ++i)
        {
            if(this.EntityArray[i].tag == tagStr)
            {
                return this.EntityArray[i];
            }
        }
        return null;
    },
};

module.exports = EntityManager;