// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
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

    onLoad () {},

    sendPostRequest(compent, ServerLink, sendstr, callback, func) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 400)) {
                console.log("连接成功");
                callback(compent, xhr.responseText, func);
            }
        };
        xhr.open("POST", ServerLink);
        //xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");  
        xhr.send(sendstr);
        console.log(sendstr);
    },

    sendGetRequest(url,callback, func) {
        var that = this;
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () 
        {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) 
            { 
                callback(that, xhr.responseText, func);
            }
        };
        xhr.open("GET", url , true);    
        xhr.send();
    },

    weixinAPI()
    {
        var jssdk = document.createElement('script');
        jssdk.async = true;
        jssdk.src ='http://res.wx.qq.com/open/js/jweixin-1.2.0.js';
        document.body.appendChild(jssdk);
        
        // /*---------JSSDK初始化-----------*/
        var data = 
        {
            appId:'',
            timestamp:'',
            nonceStr:'',
            signature:'',
        }
        jssdk.addEventListener('load',function()
        {
            console.log(wx);
            wx.config(
            {
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature, // 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ',
                'onMenuShareWeibo', 'onMenuShareQZone', 'chooseImage', 'uploadImage'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function()
            {            
                console.log("ready");
                var shareContent = 
                {
                    title: '', // 分享标题
                    link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: '', // 分享图标
                    desc: '', // 分享描述
                    success: function () 
                    {
                        console.log("shareContent");
                    },
                    cancel: function () {}
                }
                function _shareCfuc() { wx.onMenuShareTimeline(shareContent); wx.onMenuShareAppMessage(shareContent); };
                _shareCfuc();
            });
        });

    },
    
    start () {

    },

    // update (dt) {},
});
