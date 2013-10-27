function postMessage() {
    var body = {
        feed: $("#postFeedName").val(),
        message: $("#feedMessage").val()
    };

    console.log(body);

    $.ajax({
        url: '/board/' + body.feed + '/post_by_name',
        contentType: "application/json; charset=utf-8",
        type: 'POST',
        dataType: "json",
        data: JSON.stringify(body)
    });
}

function listenForMessages() {
    var xhr = new XMLHttpRequest(),
        previousText = '';

    xhr.multipart = true;

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 3) {
            var text = (xhr.responseText || '').substr(previousText.length);

            appendMessages(JSON.parse(text));

            previousText = xhr.responseText;
        }

    };

    xhr.open('GET', '/board/' + $("#streamFeedName").val() + '/stream', true);
    xhr.send(null);
}

function appendMessages(messages) {
    var container = $("#messages");

    for (var i = 0; i < messages.length; i++) {
        var message = messages[i];
        var li = $("<li></li>");
        var imgUrl = getImgurLink(message.message);

        li.append(message.message);
        container.prepend(li);

        if(imgUrl) {
            appendImgurInfo(imgUrl, li);
        }
    }
}

function getImgurLink(message) {
    var matches = message.match('imgur.com/[0-9a-zA-Z]{7}')
    return (matches || [])[0];
}

function appendImgurInfo(url, li) {
    var id = url.substr(url.indexOf('/') + 1);

    $.ajax({
        url: 'https://api.imgur.com/3/image/' + id,
        type: 'GET',
        headers: {
            'Authorization' : 'Client-ID 2f229e861b659ba'
        },
        success: function(e) {
            li.append('<img src="' + e.data.link + '" />');
            li.append('<div class="imgTitle">' + (e.data.title || 'No Title') + '</div>');
            li.append('<div class="imgDesc">' + (e.data.description || 'No Description') + '</div>');
        }
    });
}

function bindAjax() {
    $(document).ready(function() {

        $("#postMessage").click(postMessage);
        $("#listen").click(listenForMessages);
    });

}