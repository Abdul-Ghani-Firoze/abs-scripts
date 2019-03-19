/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(function () {
//    function generateUserId() {
//        console.log("creating userId");
//        function User() {}
//        ;
//        User.prototype.userId = Math.floor(Math.random() * 26) + Date.now();
//        User.prototype.getId = function () {
//            return this.userId;
//        };
//    }

//    generateUserId();

    // track whether user is member


    // track viewing product page
    var pageUrl = window.location.pathname;
    var productPage = false;

    if (pageUrl.indexOf("product") > -1) {
        console.log("it IS a product page");
        productPage = true;
        var viewingDateTime = new Date();
        var formattedDate = dateFormat(viewingDateTime, "yyyy-mm-dd HH:MM:ss");
        console.log("viewed at: " + formattedDate);

        // send data to server
        sp.track('Entered product page', {productId: $('input:hidden[name=id]').val(), enteredAt: formattedDate});
    }

    // track leaving product page
    $(window).on("beforeunload", function () {
        if (productPage) {
            var leavingDateTime = new Date($.now());
            console.log("left at: " + leavingDateTime);
            sp.track('Leaving product page', {leftAt: leavingDateTime});
        }
    });



});