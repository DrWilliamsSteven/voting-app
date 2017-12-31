'use strict';

(function () {

    const apiUrl = window.location.href;
    const voteButton = document.getElementsByClassName('voteButton');
    const voteDisplay = document.getElementsByClassName('voteDisplay');

    function updateVoteCount(data) {
        //console.log(data)
        const voteObject = JSON.parse(data);
        console.log(voteObject)

        voteObject.options.forEach(function (element, index, array) {
            voteDisplay[index].innerHTML = element.votes;
        });
    }

    for (let i = 0; i < voteButton.length; i++) {
        voteButton[i].addEventListener('click', function () {

            const id = this.id;
            const key = i;
            let newURL = "";

            if (apiUrl[apiUrl.length - 1] === '#') {
                newURL = apiUrl.substring(0, apiUrl.length - 1);
            } else {
                newURL = apiUrl;
            }
            newURL += '?id=' + id + '&key=' + key;

            ajaxFunctions.ajaxRequest('PUT', newURL, updateVoteCount);
        }, false);
    }

    var tweet = 'https://twitter.com/intent/tweet?text=New poll: ' + apiUrl;
    $(".twitter-share-button").attr("href", tweet);

})();