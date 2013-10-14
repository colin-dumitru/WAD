var options = {
    'listsBoards' : {
        label: 'List Boards',
        template: '',
        url: '/boards.json',
        method: 'GET'
    },
    'newBoard' : {
        label: 'New Board',
        template: '{"name" : "<INSERT NAME HERE>"}',
        url: '/boards.json',
        method: 'POST'
    },
    'listMessages' : {
        label: 'List Messages',
        template: '',
        url: '/boards/<board id>.json',
        method: 'GET'
    },
    'deleteBoard' : {
        label: 'Delete Board',
        template: '',
        url: '/board/delete/<board id>',
        method: 'DELETE'
    },
    'postMessage' : {
        label: 'Post Message',
        template: '{"message" : "insert message here"}',
        url: '/board/<board id>/post',
        method: 'POST'
    }
}

function handleRequestSelect() {
    var us = $(this);
    var option = us.val();

    $("#url").val(options[option].url);
    $("#method").val(options[option].method);
    $("#body").val(options[option].template);
}

function performRequest() {
    var url = $("#url").val();
    var method = $("#method").val();
    var body = $("#body").val();

    if (method.toUpperCase() == 'GET') {
        body = undefined;
    }

    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        type: method,
        dataType: "json",
        data: body,
        success: function(data) {
            $("#result").val(JSON.stringify(data));
        }
    });
}

function populateOptions() {
    var requestsSelect = $("#requestsSelect");

    for (var option in options) {

        if(options.hasOwnProperty(option)) {
            var elem = $(document.createElement('option'));

            elem
                .attr('value', option)
                .text(options[option].label);

            requestsSelect.append(elem);
        }
    }

    requestsSelect.change(handleRequestSelect);

    $("#loadButton").click(performRequest);
}

$(document).ready(populateOptions);
