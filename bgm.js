$(function() {

    $('#bgm').on('click', function(e) {
        if (e.target !== e.currentTarget) return false
    })

    $('#bgm_pp_btn').on('click', function() {

        if (parseInt($('#bgm').css('right')) < 0) {  // 숨겨짐

            if ($('#mcard_bgm').get(0).paused == false) {  // 재생중이면

                // STOP
                $(this).removeClass('bgm_pp_btn_play')
                $('#mcard_bgm').get(0).pause()

            } else {

                // PLAY
                $(this).addClass('bgm_pp_btn_play')
                $('#mcard_bgm').get(0).play()

                // OPEN
                $('#bgm').delay(500).animate({
                    'right': '12px'
                }, 120)

                // AUTO CLOSE : TIMER
                setTimeout(function(){
                    $('#bgm').animate({
                        'right': '-202px'
                    })
                }, 3000)

            }

        } else {

            // STOP
            $(this).removeClass('bgm_pp_btn_play')
            $('#mcard_bgm').get(0).pause()

            // CLOSE
            $('#bgm').animate({
                'right': '-202px'
            })

        }

    })


    // CLOSE
    $('#bgm_close_btn').on('click', function() {
        $('#bgm').animate({
            'right': '-186px'
        })
    })


    // NEXT SONG
    $('#mcard_bgm').on('ended', function() {

        var sseq = 0
        var sseq_max = 0
        $('song').each(function() {
            sseq_max = $(this).data('sseq')
            if ($('#mcard_bgm').get(0).currentSrc == encodeURI($(this).attr('src'))) {
                sseq = $(this).data('sseq')
            }
            
        })

        var sseq_next = sseq + 1
        if (sseq_next > sseq_max) sseq_next = 1
        var bgm_next = $('song[data-sseq='+sseq_next+']')

        $('#bgm_cover_img').attr('src', '//gws1.bojagicard.com/audio/'+$(bgm_next).data('cover'))
        $('#bgm_now_song').text($(bgm_next).data('song'))
        $('#bgm_now_arti').text($(bgm_next).data('arti'))
        $('#mcard_bgm > source').attr('src', $(bgm_next).attr('src'))
        $('#mcard_bgm').get(0).load()
        $('#mcard_bgm').get(0).play()
        
    })

    setInterval(function() {
        bgm_prog_update()
    }, 100)


    /*
    $(window).bind('scroll', function() {
    
        if (parseInt($('#bgm').css('right')) > 0) {  // 펼쳐져 있으면

            // AUTO CLOSE : SCROLL
            setTimeout(function(){
                $('#bgm').animate({
                    'right': '-186px'
                })
            }, 1000)

        }
    
    })
    */


})



function bgm_prog_update() {
    if ($('#mcard_bgm').get(0).paused == false) {
        var cur = $('#mcard_bgm').get(0).currentTime
        var dur = $('#mcard_bgm').get(0).duration
        var per = parseInt(cur / dur * 100)
        var wpx = 85 / 100 * per
        $('#bgm_now_prog_played').css('width', wpx+'px')
        if (cur == dur) {
            $('#mcard_bgm').get(0)
        }
    }
}