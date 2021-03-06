/*
 Author: Zorin
 Github: https://github.com/PikaSama
 License: GPL-3.0 License
 Description: Loader of custom config.
 */
(async () => {
    await delay(500);
    // 新人标识
    const newviewer = localStorage.getItem("newbie");
    const headInsert = $("head");
    const bodyInsert = $("body");
    // 调色盘
    const palette = document.querySelector("is-palette2");
    // 静态资源版本
    const ver = "1.3.12";
    // 需要全局使用的变量
    let sidebar;
    let theme;
    let autoNight;
    let rtheme;
    let ua;
    // 监听主题点击事件函数，代码简化效率中等
    const paletteEvent = {
        click: index => {
            palette.shadowRoot.querySelectorAll("a")[index].click();
        },
        listen: (index,func) => {
            palette.shadowRoot.querySelectorAll("a")[index].addEventListener("click",func);
        },
        accent: index => {
            paletteEvent.listen(index,async () => {
                if (sidebar == "0" && ua != "pc") {
                    await delay(50);
                    paletteEvent.click(rtheme);
                }
            });
        },
        day: index => {
            paletteEvent.listen(index,() => {
                localStorage.setItem("cachedTheme",index);
                $(".input-radio-night").attr("class","input-radio");
                $("textarea.mvsys#night").removeAttr("id");
                $(".φbh").removeAttr("id");
                // 回调主题
                rtheme = index;
            });
        },
        night: index => {
            paletteEvent.listen(index,() => {
                localStorage.setItem("cachedTheme",index);
                $(".input-radio").attr("class","input-radio-night");
                $("textarea.mvsys").attr("id","night");
                $(".φbh").attr("id","darkmode");
                // 回调主题
                rtheme = index;
            });
        }
    }
    // 监听调色盘主题和强调色的点击事件
    paletteEvent.day(0);
    paletteEvent.night(1);
    paletteEvent.day(2);
    paletteEvent.day(3);
    paletteEvent.day(4);
    function listenerB() {
        paletteEvent.accent(5);
        paletteEvent.accent(6);
        paletteEvent.accent(7);
        paletteEvent.accent(8);
        paletteEvent.accent(9);
        paletteEvent.accent(10);
        paletteEvent.accent(11);
        paletteEvent.accent(12);
        paletteEvent.accent(13);
        paletteEvent.accent(14);
        paletteEvent.accent(15);
        paletteEvent.accent(16);
        paletteEvent.accent(17);
    }
    // 检测ua
    checkUA();
    // 加载配置
    if (palette != null) {
        loadconfig();
    }
    else {
        await delay(1000,loadconfig);
    }
    function checkUA() {
        // 移动端，加载移动端专用css
        if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
            // headInsert.append('<link href="//cdn.jsdelivr.net/gh/PikaSama/shelter-images@' + ver + '/static/radio-mobile.css" rel="stylesheet" />');
            headInsert.append('<link href="//zorin.beaa.cn/test/radio-mobile.css" rel="stylesheet" />');
            ua = "non-pc";
        }
        // PC端，加载普通css
        else {
            // headInsert.append('<link href="//cdn.jsdelivr.net/gh/PikaSama/shelter-images@' + ver + '/static/radio.css" rel="stylesheet" />');
            headInsert.append('<link href="//zorin.beaa.cn/test/radio.css" rel="stylesheet" />');
            ua = "pc";
        }
    }
    // 根据配置文件加载内容
    function loadconfig() {
        // 判断是否有配置文件且不是新人
        if (newviewer != null) {
            // 是，调用函数
            listenerB();
            sidebar = localStorage.getItem("sidebar_widget_background");
            nightMode_And_Theme();
            widget();
            cEffect();
            l2d();
            dynamicTxt();
        }
        // 不是，插入默认的内容
        else {
            bodyInsert.append('<script src="//cdn.jsdelivr.net/gh/PikaSama/shelter-images@' + ver +'/static/clickLove.js"></script>');
            bodyInsert.append('<script src="//cdn.jsdelivr.net/gh/PikaSama/live2d-widget@latest/autoload.js"></script>');
        }
    }
    // 黑暗模式 & 默认主题
    function nightMode_And_Theme() {
        // 读取配置
        autoNight = localStorage.getItem("auto_night");
        theme = parseInt(localStorage.getItem("default_theme"));
        // 获取当前时间
        let time = new Date().getHours();
        // 如果启用黑暗模式且处于工作时间
        if (autoNight == "1" && (time >= 19 || time <= 5)) {
            // 是，切换黑暗主题
            paletteEvent.click(1);
        }
        // 否，切换设置的默认主题
        else {
            paletteEvent.click(theme);
        }
    }
    // 默认强调色
    function widget() {
        // 读取配置
        let widget = parseInt(localStorage.getItem("default_theme_widget"));
        // 判断是否设置了强调色
        if (widget == 0) {
            paletteEvent.click(10);
        }
        else if (widget > 0 && widget < 6) {
            // 是，切换强调色
            widget = widget + 4;
            paletteEvent.click(widget);
        }
        else if (widget >= 6) {
            widget = widget + 5;
            paletteEvent.click(widget);
        }
    }
    // 点击特效
    function cEffect() {
        // 读取配置
        let clickeffect = localStorage.getItem("click_effect");
        // 判断选项，加载指定文件
        if (clickeffect == "0") {
            bodyInsert.append('<script src="//cdn.jsdelivr.net/gh/PikaSama/shelter-images@' + ver +'/static/clickLove.js"></script>');
        }
        else if (clickeffect == "1") {
            bodyInsert.append('<script src="//cdn.jsdelivr.net/npm/animejs@latest/anime.min.js"></script>');
            //bodyInsert.append('<script src="//cdn.jsdelivr.net/gh/PikaSama/shelter-images@' + ver +'/static/cb1.js"></script>');
            bodyInsert.append('<script src="//zorin.beaa.cn/test/cb1.js"></script>');
        }
        // clickeffect == "2"
        else {
            //bodyInsert.append('<script src="//cdn.jsdelivr.net/gh/PikaSama/shelter-images@' + ver +'/static/cb2.js"></script>');
            bodyInsert.append('<script src="//zorin.beaa.cn/test/cb2.js"></script>');
        }
    }
    // live2d看板娘
    function l2d() {
        // 读取配置
        let live2d = localStorage.getItem("live2d");
        // 如果启用，加载文件
        if (live2d == "1") {
            bodyInsert.append('<script src="//cdn.jsdelivr.net/gh/PikaSama/live2d-widget@latest/autoload.js"></script>');
        }
    }
    function dynamicTxt() {
        const typeplace = $(".φee");
        let dynText = localStorage.getItem("dynamic_text");
        // 插入span
        typeplace.append('<span id="typedtext"></span>');
        // 设置属性
        typeplace.attr("style", "height:3rem; display:block; font-size: 110%;");
        if (dynText == "1") {
            let contents = "";
            async function yiyan() {
                await fetch('https://v1.hitokoto.cn?c=i').then(resp => resp.json()).then(data => {
                    data.hitokoto = data.hitokoto.slice(0,-1);
                    data.hitokoto = data.hitokoto.replace(/，/g,"，^200");
                    data.hitokoto = data.hitokoto.replace(/。/g,"。^200");
                    data.hitokoto = data.hitokoto.replace(/？/g,"？^200");
                    data.hitokoto = data.hitokoto.replace(/！/g,"！^200");
                    data.hitokoto = data.hitokoto.replace(/；/g,"；^200");
                    contents+=data.hitokoto + "/";
                }).catch(err => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            async function run() {
                for (let i = 0;i < 3;i++) {
                    await yiyan();
                }
            }
            run().then(()=>{
                contents = contents.split("/");
                contents.pop();
                dynamicType(contents);
            });
        }
        else if (dynText == "2") {
            let contents;
            let apiDate = new Date().getDate();
            let apiMonth = new Date().getMonth() + 1;
            let apiYear = new Date().getFullYear();
            if (apiDate < 10) {
                apiDate = "0" + apiDate;
            }
            if (apiMonth < 10) {
                apiMonth = "0" + apiMonth;
            }
            let fullDate = apiYear + "-" + apiMonth + "-" + apiDate;
            console.log(fullDate);
            $.get("https://sentence.iciba.com/index.php?c=dailysentence&m=getdetail&title="+fullDate,data => {
                data.note = data.note.slice(0,-1);
                data.note = data.note.replace(/，/g,"，^200");
                data.note = data.note.replace(/。/g,"。^200");
                data.note = data.note.replace(/？/g,"？^200");
                data.note = data.note.replace(/！/g,"！^200");
                data.note = data.note.replace(/；/g,"；^200");
                contents = data.content.slice(0,-1) + "/" + data.note;
                dynamicType(contents.split("/"),50,25);
            },'jsonp');
        }
        else {
            dynamicType(["人生是逆流，^200也是随波逐流", "神机妙算皆徒劳，^200千般执念终成空", "七月初七，^100淮水竹亭，^100鞘笛相偎，^100无怨无悔"]);
        }
    }
})();