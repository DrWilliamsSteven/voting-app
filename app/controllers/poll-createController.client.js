'use strict';
document.addEventListener("DOMContentLoaded", function (event) {
    //your code to run since DOM is loaded and ready
    var counter = 2;
    var limit = 30;

    function addInput() {
        if (counter == limit) {
            alert("You have reached the limit of adding " + counter + " inputs");
        } else {
            var newdiv = document.createElement('div');
            counter++;
            newdiv.innerHTML = "Option " + counter + " <br><input type='text' name='options[]'>";
            document.getElementById('newpoll').appendChild(newdiv);
        }
    }

    // your function
    function createNewPoll(event) {
        event.preventDefault();

        var form = $("#newpoll");
        var data = form.serializeArray();

        // send ajax
        $.ajax({
            url: '/poll/create-poll', // url where to submit the request
            type: "POST", // type of action POST || GET
            //dataType: 'json', // data type
            data: data, // post data || get data
            success: function (result) {
                // you can see the result from the console                
                console.log(result);
                window.location.href = "/poll/";
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
    };

    var form = document.getElementById("newpoll");
    form.addEventListener('submit', createNewPoll, true);

    var addbutton = document.getElementById("addOption");
    addbutton.addEventListener('click', addInput, true);

});