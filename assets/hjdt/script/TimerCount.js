
var DicHelper = require("DicHelper");
var TimerCount =
{ 
   properties: 
   {
       dicAddTeam:Array,
       dicDeleteKey:Array,
       dicRunTeam:Array,
       dicTimerPool:Array,
       timeNow:0,
       pause:false,
       keyName:null
   }  
};

TimerCount.Init = function()
{
    this.timeNow = 0;
    this.dicAddTeam = DicHelper.Init();
    this.dicDeleteKey = new Array();
    this.dicRunTeam = DicHelper.Init();
    this.dicTimerPool = new Array();
    this.keyName = {};
    　　　　　　　　  this.keyName.GameContinue = "GameContinue";
    　　　　　　　　  this.keyName.StartPause = "StartPause";
    　　　　　　　　  this.keyName.GameOverDetail = "GameOverDetail";
    　　　　　　　　  this.keyName.GameWinDetail = "GameWinDetail";
    　　　　　　　　  this.keyName.StartCreateItem = "StartCreateItem";
    　　　　　　　　  this.keyName.CreateItem = "CreateItem";
};

TimerCount.AddTime = function(dt)
{
    if(this.pause)
    {
        return;
    }
    this.timeNow += dt;
    this.AddDeleteTimer();
    this.CheckTimer();
};

TimerCount.AddDeleteTimer = function()
{
    // 增加和删除计时器
    for(var i = 0; i < this.dicDeleteKey.count; ++i) 
    {
        var key = this.dicDeleteKey[i];
        var data = DicHelper.find(this.dicRunTeam, key)
        if(data != null)
        {
            this.dicTimerPool.push(data);
        }
        DicHelper.remove(this.dicRunTeam, key);
    }
    DicHelper.clear(this.dicDeleteKey);
    for(var key in this.dicAddTeam) 
    {
        DicHelper.add(this.dicRunTeam, key, this.dicAddTeam[key]);       
    }
    DicHelper.clear(this.dicAddTeam);
};

//普通计时器
TimerCount.CreateRepeateTimeOne = function(strTimerName, count, interval, callBack, atOnce, ...param)
{
    this.CreateTimeOne(strTimerName, count, interval, callBack, atOnce, ...param);
};

//延时计算器
TimerCount.CreateDelayTimeOne = function(strTimerName, interval, callBack, ...param)
{
    this.CreateTimeOne(strTimerName, 1, interval, callBack, false, ...param);
};

TimerCount.CreateTimeOne = function(strTimerName, count, interval, callBack, atOnce, ...param)
{
    var timeone = this.GetFreeTimeOne(strTimerName);
    if(timeone == null)
    {
        timeone = cc.Class({
            properties: 
            {
                 // 计时器名字
                strTimerName:"",
                // 重复次数
                count:"",
                //回调
                callBack:"",
                // 当前次数
                curCount:"",
                // 触发间隙
                interval:3,
                //上次触发时多走的时间
                timeLeft:0.1,
                //上次触发的时间
                lastTime:0,
                // 参数
                param:null,
            }            
        });
        DicHelper.add(this.dicAddTeam, strTimerName, timeone);   
    }
    timeone.strTimerName = strTimerName;
    timeone.count = count;
    timeone.callBack = callBack;
    timeone.interval = interval;
    timeone.param = param;
    timeone.curCount = 0;
    timeone.timeLeft = 0;
    if(atOnce)
    {
        timeone.lastTime = 0;
    }
    else
    {
        timeone.lastTime = this.timeNow;
    }
};

TimerCount.GetFreeTimeOne = function(strTimerName)
{
    var temp = DicHelper.find(this.dicRunTeam, strTimerName);
    if(temp != null)
    {
        return temp;
    }
    if(this.dicTimerPool.count > 0)
    {
        return this.dicTimerPool.shift();
    }
    return null;
};

TimerCount.CheckTimer = function()
{
    for(var key in this.dicRunTeam)
    { 
        var tOne = this.dicRunTeam[key];
        if(this.dicDeleteKey.indexOf(tOne.strTimerName) > -1)
        {
            continue;
        }
        if(tOne.curCount >= tOne.count && tOne.count != -1)
        {
            this.dicDeleteKey.push(tOne.strTimerName);    
            continue;
        }
        
        var temp = this.timeNow - tOne.lastTime - tOne.timeLeft;
        if(temp > tOne.interval)
        {
            // 执行方法
            if (tOne.callBack != null)
            {
                tOne.callBack(...tOne.param);
            }
            tOne.timeLeft = tOne.interval - temp;
            tOne.lastTime = this.timeNow;
            tOne.curCount++; 
        }
    }
};

TimerCount.Pause = function()
{
    this.pause = true;
};

TimerCount.Continue = function()
{
    this.pause = false;
};

TimerCount.RemoveTimer = function(strName)
{
    DicHelper.add(this.dicRunTeam, key, this.dicAddTeam[key]);
};
 
module.exports = TimerCount;