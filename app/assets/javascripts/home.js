var options = {
    'listsBoards' : {
        label: 'List Boards',
        template: ''
    },
    'newBoard' : {
        label: 'New Board',
        template: ''
    }
}

function handleRequestSelect() {
    var us = $(this);
    var option = us.val();
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
}

$(document).ready(populateOptions);
