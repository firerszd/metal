var CHelper = 
{    
    zeroVec: new cc.Vec2(0 ,0),

    Box2dApplyForce: function (body, vec)
    {
        body.linearVelocity = vec;
        body.applyForceToCenter(this.zeroVec);
    }
};

module.exports = CHelper;