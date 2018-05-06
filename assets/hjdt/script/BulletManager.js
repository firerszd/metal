
var lsManager = require("loadsourceManager");
var BulletManager = 
{    
    //子弹缓存池
    bulletArray:null,

    BulletManagerInit()
    {
        this.bulletArray = new Array();
    },

    CreateBullet:function(posNode, angle)
    {
        var bullet = this.HasFreeBullet();
        if(bullet == null)
        {
            lsManager.loadRes("prefab/Bullet", this.AfterCreateBullet, posNode, this, angle);
        }
        else
        {
            this.InitBullet(bullet, posNode, angle);
        }
    },

    AfterCreateBullet(bulletPrefab, posNode, that, angle)
    {
        var temp = bulletPrefab.addComponent("Bullet");
        that.bulletArray.push(temp);
        that.InitBullet(temp, posNode, angle);
    },

    update:function(dt)
    {
        if(this.bulletArray == null)
        {
            return;
        }
        for(var i = 0; i < this.bulletArray.length;++i)
        {
            var temp = this.bulletArray[i];
            if(temp == null || !temp.bUse)
            {
                continue;
            }
            var x = 0;
            var y = 0;
            if(temp.fAngle >= 0 && temp.fAngle <= 90)
            {
                x = temp.node.position.x + Math.cos(temp.fAngle) * dt * 600;
                y = temp.node.position.y + Math.sin(temp.fAngle) * dt * 600;
            }
            if(temp.fAngle > 90 && temp.fAngle <= 180)
            {
                x = temp.node.position.x - Math.cos(180 - temp.fAngle) * dt * 600;
                y = temp.node.position.y + Math.sin(180 - temp.fAngle) * dt * 600;
            }
            temp.node.setPosition(x, y);
            if(x <= -500 || x >= 500)
            {
                temp.bUse = false;
                temp.node.active = false;
            }
        }
    },

    //是否有不用的子弹对象
    HasFreeBullet()
    {
        for(var i = 0 ; i < this.bulletArray.length; ++i)
        {
            if(!this.bulletArray[i].bUse)
            {
                return this.bulletArray[i];
            }
        }
        return null;
    },

    //初始化子弹状态
    InitBullet(bullet, posNode, angle)
    {
        bullet.node.parent = posNode.parent;
        var x = 20;
        var y = 30;
        if(angle > 90)
        {
            x *= -1;
        }
        bullet.node.setPosition(posNode.position.x + x, posNode.position.y + y);
        bullet.fAngle = angle;
        bullet.bUse = true;
        bullet.node.active = true;
        var animation = bullet.node.getComponent(cc.Animation);
        var animState = animation.play('bullet1');
        animState.wrapMode = cc.WrapMode.Loop;
    },
};

module.exports = BulletManager;