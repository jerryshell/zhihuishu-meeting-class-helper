function myAjaxjsonp(url, param, jsoncallback, callback, errorCallback) {
    $.ajax({
        url: url,
        type: "get",
        data: param,
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: jsoncallback,
        success: function (data) {
            callback(data);
        },
        error: function (e) {
            if (errorCallback) {
                errorCallback(e);
            }
        }
    });
}

function mySubmitSignTimes(relativeTime, end) {
    var param = {
        "liveCourseId": liveCourseId,
        "userId": userId,
        "relativeTime": relativeTime,
        "watchType": "2",
        "jsonpCallBack": "jsonpCallBack",
        "videoId": curVideoId,
        "sourceType": 1,
        "recruitId": recruitId
    };

    myAjaxjsonp(
        appUrl + "/live/setWatchHistory",
        param,
        param.jsonpCallBack,
        function (data) {
            console.log(relativeTime + ":success:" + data);
            relativeTime++;
            if (relativeTime > end) {
                return;
            }
            mySubmitSignTimes(relativeTime, end);
        },
        function (e) {
            console.log(relativeTime + ":error:" + e);
        }
    );
};

mySubmitSignTimes(1, 200)