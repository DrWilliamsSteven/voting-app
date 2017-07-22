'use strict';

(function() {

    var apiUrl = window.location.href;
    var voteButton = document.getElementsByClassName('voteButton');
    var voteDisplay = document.getElementsByClassName('voteDisplay');

    function updateVoteCount(data) {
        //console.log(data)
        var voteObject = JSON.parse(data);
        voteDisplay[0].innerHTML = voteObject.votes.option1;
        voteDisplay[1].innerHTML = voteObject.votes.option2;
        voteDisplay[2].innerHTML = voteObject.votes.option3;
        voteDisplay[3].innerHTML = voteObject.votes.option4;
    }

    for (var i = 0; i < voteButton.length; i++) {
        voteButton[i].addEventListener('click', function() {

            var id = this.id;
            if (apiUrl[apiUrl.length - 1] === '#') {
                var newURL = apiUrl.substring(0, apiUrl.length - 1)
            } else {
                newURL = apiUrl
            }
            newURL += '?id=' + id;

            ajaxFunctions.ajaxRequest('PUT', newURL, updateVoteCount)
        }, false);
    }

})();
