var DicHelper =
{ 
   properties: 
   { 
   }  
};

DicHelper.Init = function()
{
    var datastore = new Array();
    return datastore;
};

DicHelper.add = function(datastore, key, value)
{
    datastore[key] = value;
};

DicHelper.find = function(datastore, key)
{
    return datastore[key];
};

DicHelper.remove = function(datastore, key)
{
    if(datastore == null || key == null)
    {
        return;
    }
    if(this.find(datastore, key) == null)
    {
        return;
    }
    delete datastore[key];
};

DicHelper.showAll = function(datastore)
{
    var str = "";
    for(var key in datastore) {
        str += key + " -> " + datastore[key] + ";  "
    }
    console.log(str);
};

DicHelper.count = function(datastore)
{
    var n = 0;
    for(var key in Object.keys(datastore)) {
        ++n;
    }
    console.log(n);
    return n;
};

DicHelper.clear = function(datastore)
{
    for(var key in datastore) 
    {
        delete datastore[key];
    }
    //datastore.splice(0, datastore.length);
};
module.exports = DicHelper;