$(function() {
    console.log('HELLO');

    //object for scores
    var tally = {
        industrial: 0,
        black: 0,
        prog: 0,
        grunge: 0,
        grind: 0
    }

    //object for quiz results
    var results = {
        industrial: {
            name: "Industrial",
            description: "You are not afraid to be different, you are artistic, passionate and find the beauty in chaos.  You have a vast knowledge on literature as reading is your favorite thing to do in your spare time, William S Burroughs and Philip K Dick are your favorites."
        },
        black: {
            name: "Black Metal",
            description: `You don't let society define you, you define yourself. You enjoy standing out in a crowd, however if there is a crowd, you tend to be far from it. "Got no religion, don't need no friends.  Got all I want, don't need to pretend" -Ozzy Osbourne`
        },
        prog: {
            name: "Prog Rock",
            description: "Fantasy novels and MMORPGs are your jam.  You are a highly intelligent individual, the type that was able to solve a rubix cube at the age of young age of 7.  Nobody understands your complexity except for your friends, who are as good as family.."
        },
        grunge: {
            name: "Grunge",
            description: "Ripped jeans, long hair, layered clothes and thrift shopping, that's you.  You can appreciate all genres of music but usually stick to the classics.  You're a sensitive person, but your eclectic taste in music is your salvation. "
        },
        grind: {
            name: "GrindCore",
            description: "Your sometimes parents wonder where they went wrong, but behind the all tattoos vulgar t-shirts there is a sweet, caring person who will always stand up for what you believe in.  Your friends and family can always count on you, because you always put them first."
        }
    }
        //Start the Quiz button
        $('.buttonStart').on('click', function(e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: $(`#question1`).offset().top},
                'slow');
        })

        //Variables
        let count = 1;

    //Function to move to next question.
    function nextQuestion (){
        count ++
        console.log(count)
        $('html,body').animate({
            scrollTop: $(`#question${count}`).offset().top},
            'slow');
    };


    //function to tally score after each question is answered
    $('form').on('submit', function(e) {
        e.preventDefault();
        //record and store selection in a variable
        let answer = $(this).find('input:radio:checked').val();
        //add answer to tally object
        if (answer) {
            tally[answer]++
            nextQuestion();
            console.log(answer);
            console.log(tally);
        }
        else {
            $(this).find('.warning').text('Please make a selection')
        }
    })
    $('#finalSubmit').on('click', function(e){
        e.preventDefault();
        var answers = $('form').find('input:radio:checked');
        if (answers.length === 6) {
            var scoresKeys = Object.keys(tally);
            var scoresArray = scoresKeys.map(function(key) {
                return {
                    value: key,
                    score: tally[key]
                }
            });
            scoresArray.sort(function(a, b) {
                return b.score - a.score;
            });
            console.log(scoresArray);
            //From that array, lets make some usable variables.
            var winningScore = scoresArray[0].score;
            var winningGenre = scoresArray[0].value;
            console.log('winningGenre' + winningGenre);
            $('.seeMyResults').addClass('display');
            $('.h2_result').text(`You Are ${results[winningGenre].name}`);
            $('.result').text(`${results[winningGenre].description}`);
            $('html,body').animate({
                scrollTop: $(`#seeMyResults`).offset().top},
                'slow');

        }
    })
    //restart
    $('#retake').on('click', function() {
        location.reload();
        $('html,body').scrollTop(0);
    });
    //THE BELOW WORKS FOR TWITTER SHARING
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
            t = window.twttr || {};
        if (d.getElementById(id)) return t;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function(f) {
            t._e.push(f);
        };

        return t;
    }(document, "script", "twitter-wjs"));
});