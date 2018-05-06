var loadsourceManager = 
{
    moveSpeed: 10,
    version: "0.15",
    showTutorial: true,

    loadRes: function (path, callback, ...that)
    {
        cc.loader.loadRes(path, function (err, prefab) 
        {
            var newNode = cc.instantiate(prefab);
            callback(newNode, ...that);
        });
    }
};

module.exports = loadsourceManager;