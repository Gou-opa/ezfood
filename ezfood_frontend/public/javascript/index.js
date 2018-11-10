$(function() {

   $(".input input").focus(function() {

      $(this).parent(".input").each(function() {
         $("label", this).css({
            "line-height": "18px",
            "font-size": "18px",
            "font-weight": "100",
            "top": "0px"
         })
         $(".spin", this).css({
            "width": "100%"
         })
      });
   }).blur(function() {
      $(".spin").css({
         "width": "0px"
      })
      if ($(this).val() == "") {
         $(this).parent(".input").each(function() {
            $("label", this).css({
               "line-height": "60px",
               "font-size": "24px",
               "font-weight": "300",
               "top": "10px"
            })
         });

      }
   });

   $(".button").click(function(e) {
      if($('#error').html()==''){
        var pX = e.pageX,
        pY = e.pageY,
        oX = parseInt($(this).offset().left),
        oY = parseInt($(this).offset().top);

        $(this).append('<span class="click-efect x-' + oX + ' y-' + oY + '" style="margin-left:' + (pX - oX) + 'px;margin-top:' + (pY - oY) + 'px;"></span>')
        $('.x-' + oX + '.y-' + oY + '').animate({
            "width": "500px",
            "height": "500px",
            "top": "-250px",
            "left": "-250px",

        }, 600);
        $("button", this).addClass('active');
      }
   })

   $(".alt-2").click(function() {
      $("#reError").html("");
      $("#error").html("");
      if (!$(this).hasClass('material-button')) {
         $(".shape").css({
            "width": "100%",
            "height": "100%",
            "transform": "rotate(0deg)"
         })

         setTimeout(function() {
            $(".overbox").css({
               "overflow": "initial"
            })
         }, 600)

         $(this).animate({
            "width": "140px",
            "height": "140px"
         }, 500, function() {
            $(".box").removeClass("back");

            $(this).removeClass('active')
         });

         $(".overbox .title").fadeOut(300);
         $(".overbox .input").fadeOut(300);
         $(".overbox .button").fadeOut(300);

         $(".alt-2").addClass('material-buton');
      }

   })

   $(".material-button").click(function() {

      if ($(this).hasClass('material-button')) {
         setTimeout(function() {
            $(".overbox").css({
               "overflow": "hidden"
            })
            $(".box").addClass("back");
         }, 200)
         $(this).addClass('active').animate({
            "width": "700px",
            "height": "700px"
         });

         setTimeout(function() {
            $(".shape").css({
               "width": "50%",
               "height": "50%",
               "transform": "rotate(45deg)"
            })

            $(".overbox .title").fadeIn(300);
            $(".overbox .input").fadeIn(300);
            $(".overbox .button").fadeIn(300);
         }, 700)

         $(this).removeClass('material-button');

      }

      if ($(".alt-2").hasClass('material-buton')) {
         $(".alt-2").removeClass('material-buton');
         $(".alt-2").addClass('material-button');
      }

   });

});
function nameKeyUp(e) {
    if (e.keyCode == 13) $("#pass").focus();
}

function renameKeyUp(e) {
    $("#loi_hoten").html("");
    if (e.keyCode == 13) $("#regpass").focus();
}

function repassKeyUp(e) {
    if (e.keyCode == 13) $("#reregpass").focus();
}
function signInCheck(){
    //xoa cac thong bao loi
    $("#error").html("");   
    //kiem tra loi
    if ($("#name").val() == "" &&  $("#pass").val() == "" ) {
        $("#error").html("Chưa nhập tên đăng nhập và mật khẩu.");
    }
    
    if ($("#name").val() == "" &&  $("#pass").val() != "" ) {
        $("#error").html("Chưa nhập tên đăng nhập.");
    }
    
    if ($("#name").val() != "" &&  $("#pass").val() == "" ) {
        $("#error").html("Chưa nhập mật khẩu.");
    }
}
function signUpCheck(){
    //xoa cac thong bao loi
    $("#reError").html("");   
    //kiem tra loi
    if ($("#regname").val() == "" &&  $("#regpass").val() == "" ) {
        $("#reError").html("Chưa nhập tên đăng nhập và mật khẩu.");
    }
    
    if ($("#regname").val() == "" &&  $("#regpass").val() != "" ) {
        $("#reError").html("Chưa nhập tên đăng nhập.");
    }
    
    if ($("#regname").val() != "" &&  $("#regpass").val() == "" ) {
        $("#reError").html("Chưa nhập mật khẩu.");
    }
    if ($("#regname").val() != "" &&  $("#regpass").val() != "" && $("#reregpass").val() == "") {
        $("#reError").html("Chưa nhập lại mật khẩu.");
    }
    if ($("#regname").val() != "" &&  $("#regpass").val() != "" && $("#reregpass").val() != $("#regpass").val()) {
        $("#reError").html("Hai mật khẩu không giống nhau.");
    }
    if ($("#regname").val() != "" &&  $("#regpass").val() != "" && $("#reregpass").val() == $("#regpass").val()) {
        $("#reError").html("");
        alert('Bạn đã đăng ký thành công!')
        $(".alt-2").click();
    }
}
$(document).ready(function(){  
    //chuyen dong khi an enter  
    $("#name").focus();
    $("#name").keyup(nameKeyUp);
    $("#rename").keyup(renameKeyUp);
    $("#repass").keyup(repassKeyUp);
    //xu ly su kien bam nut dang nhap/dang ky
    $("#signIn").click(signInCheck);
    $("#signUp").click(signUpCheck);
});