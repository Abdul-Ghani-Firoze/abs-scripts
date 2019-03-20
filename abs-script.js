/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(function () {

    var loggedIn = false;
    var pageUrl = location.pathname + location.search;
    var productPage = pageUrl.indexOf("product") > -1;
    var categoryPage = pageUrl.indexOf("category") > -1;

    // track whether user is member
    if ($(".nav li:nth-child(2)").hasClass("user-menu")) {
        loggedIn = true;
        console.log("LOGGED IN");
    } else {
        loggedIn = false;
        console.log("NOT logged in");
    }

    // track category visit
    if (categoryPage) {
        console.log("it is a CATEGORY page");
        console.log("session ID: " + getSessionIdFromCookie());
        console.log("pageUrl: " + pageUrl);
        // send data to server
        sp.track('Entered category page', {member: loggedIn, sessionId: getSessionIdFromCookie(), categoryUrl: pageUrl});
    }

    // track viewing product page
    if (productPage) {
        console.log("it IS a product page");
        console.log("pageUrl: " + pageUrl);
        var viewingDateTime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
//        var formattedDate = dateFormat(viewingDateTime, "yyyy-mm-dd HH:MM:ss");
        console.log("viewed at: " + viewingDateTime);

        // send data to server
        sp.track('Entered product page', {productId: $('input:hidden[name=id]').val(), member: loggedIn, sessionId: getSessionIdFromCookie(), productUrl: pageUrl, enteredAt: viewingDateTime});
    }

    // track leaving product page
    $(window).on("beforeunload", function () {
        if (productPage) {
            var leavingDateTime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
            console.log("left at: " + leavingDateTime);
            sp.track('Leaving product page', {productId: $('input:hidden[name=id]').val(), sessionId: getSessionIdFromCookie(), productUrl: pageUrl, leftAt: leavingDateTime});
        }
    });

    function getSessionIdFromCookie() {
        var name = "PHPSESSID=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

});