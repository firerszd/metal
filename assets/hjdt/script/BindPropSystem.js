
/*************************************************************
 * 功能;属性回调管理
 * **********************************************************/
var DicHelper = require("DicHelper");
var BindPropSystem = 
{
    //<对象，<自定义属性名，回调>>
    customCallbackTable:Array,

    BindPropSystemInit()
    {
        this.customCallbackTable = DicHelper.Init();
    },

    Clear: function()
    {
        DicHelper.clear(this.customCallbackTable);
    },

    /// <summary>
    /// 自定义属性回调
    /// </summary>
    /// <param name="mObj"></param>
    /// <param name="prop"></param>
    /// <param name="callback"></param>
    /// <param name="FirstCall"></param>
    BindCustomProp: function(entity, prop, callback, FirstCall = true)
    {
        if (entity == null || callback == null || string.IsNullOrEmpty(prop))
        {          
            return;
        }
        
        var callGroup = DicHelper.find(this.customCallbackTable, entity.id);
        if (callGroup != null)
        {
            var list = DicHelper.find(callGroup, prop);
            if (list != null)
            {
                if (list.indexOf(callback) < 0)
                {
                    list.Add(callback);
                }
            }
            else
            {
                list = new Array();
                list.push(callback);
                DicHelper.add(callGroup, prop, list);
            }
        }
        else
        {
            callGroup = DicHelper.Init();
            var list = new Array();
            list.push(callback);
            DicHelper.add(callGroup, prop, list);
            DicHelper.add(this.customCallbackTable, entity.id, callGroup);
        } 

        //调用一次
        if (FirstCall && callback != null)
        {
            callback(entity);
        }
    }, 

    /// <summary>
    /// 移除所有自定义属性回调
    /// </summary>
    /// <param name="strIdent"></param>
    UnBindAllCustomProp : function(entityID)
    {
        var callGroup = DicHelper.find(this.customCallbackTable, entityID);
        if (temp == null) 
        {
            return;
        }
        DicHelper.clear(callGroup);
        DicHelper.remove(this.customCallbackTable, entityID);
    },

    //自定义属性解绑
    UnBindCustomProp:function(entity, prop, callback)
    {
        var callGroup = DicHelper.find(this.customCallbackTable, entity.id);
        if (callGroup == null)
        {
            return;
        }
        var list = DicHelper.find(callGroup, prop);
        if (list == null)
        {
            return;
        }
        var index = list.indexOf(callback);
        if (index < 0)
        {
            return;
        }
        
        list.splice(index, 1);
        if (list.length == 0)
        {
            DicHelper.remove(callGroup, prop);
        }
        if (callGroup.length == 0)
        {
            DicHelper.remove(customCallbackTable, entity.id);
        }
    },

    //回调
    CallBackCustomProp:function(entity, prop)
    {
        if (entity == null)
        { 
            return;
        }
        var callGroup = DicHelper.find(this.customCallbackTable, entity.id);
        if (callGroup == null)
        {
            return;
        }
        var list = DicHelper.find(callGroup, prop);
        if (list == null)
        {
            return;
        }
        for (var i = 0; i < list.length; ++i )
        {
            list[i](entity);
        }
    }    
}
module.exports = BindPropSystem;