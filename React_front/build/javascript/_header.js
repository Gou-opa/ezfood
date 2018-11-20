document.addEventListener('DOMContentLoaded', function() {
    var icon_toggle = document.querySelector('#icon')
    icon_toggle.addEventListener('click', function() {
        document.querySelector('.dropdown-avatar').classList.toggle('active');
    }); 
    // end hieu ung avatar

    var icon_left_menu = document.querySelector('.fa.fa-bars');
    icon_left_menu.addEventListener('click', function() {
        document.querySelector('#left_menu').classList.toggle('active');
    })
    
})

