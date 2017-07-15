'use strict';

(function() {

    var bearLinks = document.getElementsByClassName('bearLink');

    var myFunction = function() {
        var id = this.getElementsByClassName("_id")[0].innerHTML;
        var apiUrl = appUrl + '/bear/bears/' + id;
        console.log(apiUrl)
        ajaxFunctions.ajaxRequest('GET', apiUrl);
    };

    for (var i = 0; i < bearLinks.length; i++) {
        bearLinks[i].addEventListener('click', myFunction, false);
    }

})();
