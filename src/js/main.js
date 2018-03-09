var smoothScroll = function () {
    console.log(this);
    console.log(event);
    if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function () {
            window.location.hash = hash;
        });
    }
}

var navbarControl = new function () {
    $(window).scroll(function () {
        // var screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 60;
        var pxToMove = 50;
        if ($(window).scrollTop() >= pxToMove) {
            $('.navbar').css({
                'background-color': 'white',
                'transition': '0.3s',
                'color': 'white',
                'box-shadow': '0 2px 2px #999'
            });
        } else {
            $('.navbar').css({
                'background-color': '#B0E0E6',
                'transition': '0.3s',
            });
        }
    });
}

$("#navbarCollapse a").on('click', smoothScroll);

//obrabianie czasu
function dateAndTime(dat) {
    var firstDat = dat.replace("+0100", "");
    var secondDat = firstDat.replace("T", " ");
    var slicedDat = secondDat.slice(0, -3);
    return slicedDat;
}

//sciagnie eventow z facebooka do diva o id #events_list
var eventsDiv = document.querySelector('#events_list');
var requestURL = 'https://graph.facebook.com/v2.11/PolandBW/events?time_filter=upcoming&access_token=551286351905707%7CJjuUlgc6uGyou4BXYAJKAzF-H1g';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function () {
    var fbEvents = request.response;
    if (fbEvents['data'].length != 0) {
        showEvents(fbEvents);
    }
    else {
        $('#wydarzenia').append("<div>Na tą chwilę nie ma żadnych wydarzeń</div>");
    }
}
function showEvents(jsonObj) {
    var events = jsonObj['data'];
    for (var i = 0; i < events.length; i++) {

        //nazwa
        var myName = document.createElement('h3');
        myName.textContent = events[i].name;
        var myNameA = document.createElement('a');
        myNameA.setAttribute('href', "https://www.facebook.com/events/" + events[i].id + "/");
        myNameA.setAttribute('target', "_blank");
        myNameA.appendChild(myName);

        // myPlace.textContent = events[i].place.name;
        // date.textContent = dateAndTime(events[i].start_time);
        // myDesc.textContent = events[i].description;

        // myArticle.appendChild(myNameA);
        // myArticle.appendChild(myPlace);
        // myArticle.appendChild(date);
        // myArticle.appendChild(myDesc);
        // eventsDiv.appendChild(myArticle);

        $('<h2>'+events[i].name+'</h2>')
        .addClass('e-event')
        .appendTo('#events_list');

        $('<div><span>Kiedy? </span>'+dateAndTime(events[i].start_time)+'</div>')
        .addClass('e-when')
        .appendTo('#events_list');

        $('<div><span>Gdzie? </span>'+events[i].place.name+'</div>')
        .addClass('e-when e-border')
        .appendTo('#events_list');

      
        $('<p>'+events[i].description+'</p>')
        .addClass('e-opis')
        .appendTo('#events_list');

        $('<p>Serdecznie zapraszamy!</p>')
        .addClass('tmp')
        .appendTo('#events_list');

    }
}