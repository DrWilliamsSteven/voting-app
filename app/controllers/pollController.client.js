'use strict';

(function() {

    const apiUrl = window.location.href;
    const voteButton = document.getElementsByClassName('voteButton');
    const voteDisplay = document.getElementsByClassName('voteDisplay');

    function updateVoteCount(data) {
        //console.log(data)
        const voteObject = JSON.parse(data);
        voteDisplay[0].innerHTML = voteObject.votes.option1;
        voteDisplay[1].innerHTML = voteObject.votes.option2;
        voteDisplay[2].innerHTML = voteObject.votes.option3;
        voteDisplay[3].innerHTML = voteObject.votes.option4;
    }

    for (let i = 0; i < voteButton.length; i++) {
        voteButton[i].addEventListener('click', function() {

            const id = this.id;
            let newURL = "";

            if (apiUrl[apiUrl.length - 1] === '#') {
                newURL = apiUrl.substring(0, apiUrl.length - 1);
            } else {
                newURL = apiUrl;
            }
            newURL += '?id=' + id;

            ajaxFunctions.ajaxRequest('PUT', newURL, updateVoteCount);
        }, false);
    }

    var tweet = 'https://twitter.com/intent/tweet?text=New poll: ' + apiUrl;
    $(".twitter-share-button").attr("href", tweet);

})();
