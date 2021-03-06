/*
 Author: Zorin
 Github: https://github.com/PikaSama
 License: GPL-3.0 License
 Description: Custom settings for wordcount.
 */
setTimeout(() => {
    // 新人标识
    const mengxin = localStorage.getItem("newbie");
    // 静态资源版本
    const ver = "1.3.17";
    // 插入js的地方
    const bodyPlace = $("body");
    // 读取配置
    const wordcount = localStorage.getItem("wordcount_mode");
    // 为方便测试，默认加载debug版
    if (mengxin != null && wordcount == "0") {
        bodyPlace.append('<script src="//zorin.beaa.cn/test/debugCounter.min.js"></script>');
    }
    else if (mengxin != null && wordcount == "1") {
        bodyPlace.append('<script src="//zorin.beaa.cn/test/debugCounter-b.min.js"></script>');
    }
    else {
        bodyPlace.append('<script src="//zorin.beaa.cn/test/debugCounter-c.min.js"></script>');
    }
},300);