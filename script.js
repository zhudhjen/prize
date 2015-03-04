var    anss     = [];
var    drawer   = null;
var    rest     = -1;
var    total    = 0;
var    level    = 0;
var    need_new = true;
var    started  = false;

function pad(n){
    n    = n+'';
    return    n.length>=3 ? n:new Array(4-n.length).join('0')+n;
}

function start(){
    console.log("started");
    if (started === false) {
        started = true;
        //$('#num').css({left:20px});
        $('#num').animate({left:'-300px'}, 200);
        $("#anssheel").css({visibility:'visible'});
        $("#anssheel").animate({opacity:'1',left:'426'}, 200);

    };
    if (drawer === null){
        rest    = -1;
        total   = 0;
        for (i=1; i<=$('input#total').val(); i++)
            anss[i]    = false;
        drawer    = setInterval(function(){
            if (!rest){
                clearInterval(drawer);
                drawer    = null;
                // $('#ans').prepend('<p>');
                $('#ans').prepend('<p class="prizes">'+$('input#prize').val()+'</p>');
                $("#start").removeAttr('disabled');
                $("input").removeAttr('disabled');
                return;
            }
            if (total >= $('input#total').val()){
                alert('抽完了QAQ');
                clearInterval(drawer);
                drawer    = null;
                return;
            }
            rand    = Math.floor(Math.random() * $('input#total').val())+1;
            while (anss[rand]){
                if (++rand > 216)
                    rand    = 1;
            }
            if (rest > 0){
                total++;
                anss[rand]    = true;
                rand    = pad(rand);
                console.log(rest);
                $('#ans').prepend(rand+' ');
                rest--;
            }
            rand    = pad(rand);
            console.log(rand/100);
            $("#num1").html(rand[0]);
            $("#num2").html(rand[1]);
            $("#num3").html(rand[2]);                
        }, 80);
        $("#start").html('停止');
        $("input").prop('disabled',true);
    } else {
        if (need_new){
            $('#anssheel').prepend('<div id="ans" class="answers"></div>');
            need_new    = false;
        }
        rest    = $('#cnt').val();
        // $('#ans').prepend('</p>');
        $("#start").html('开始');
        $("#start").attr('disabled','disabled');
    }
}


$(document).ready(function(){
    $("#total").blur(function(){
        for (i=1; i<=$('input#total').val(); i++)
            anss[i]    = false;
    });
    $("#cnt").val(1);
    $("#info").blur(function(){
        console.log("txtblur");
        if ($("#info").val()==="") {
            console.log("empty!");
            $("#info").val("点击以编辑活动信息");
            $("#info").css({'color':'#bbb'})
        }
    });
    $("#info").click(function(){
        console.log("txtclick");
        if ($("#info").val()==="点击以编辑活动信息") {
            console.log("empty!");
            $("#info").val("");
            $("#info").css({'color':'#6495ed'})
        }
        this.select();
    });
    $("#start").click(start);
    $('input#prize').blur(function(){
        if (!$(this).val())
            $(this).val('特等奖');
        $('button#level').html($(this).val());
    });
});
