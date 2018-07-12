TTC = {};

TTC.doing = function(action, param,callback) {
    var url = 'https://api.douban.com/v2/book/' +action;
    param = param || {};
    $.ajax({
        type: 'POST',
        url: url,
        async:false,
        cache: false,
        dataType: "text",
        data: param,
        dataType: "json",
        success: function(data) {
            callback(data);
        }
    })
};