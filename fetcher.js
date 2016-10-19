$(document).ready(function() {
    var apiKey = "";
    var hLink1 = "http://api.wunderground.com/api/32de4b1e84a402da/history_";
    var bLink2 = "/q/MD/Baltimore.json";
    var mLink2 = "/q/Spain/Madrid.json";

    var callbackAry = [];
    var callbackAry2 = [];

    //Baltimore
    var balt_mean_temp = [];
    var balt_average_max = [];
    var balt_average_min = [];
    var balt_climactic_temp = [];
    var balt_max_temp = [];
    var balt_min_temp = [];
    var balt_precip = [];

    //Madrid
    var mad_mean_temp = [];
    var mad_average_max = [];
    var mad_average_min = [];
    var mad_climactic_temp = [];
    var mad_max_temp = [];
    var mad_min_temp = [];
    var mad_precip = [];

    $("#balt_fetch").click(function() {
        fetchBaltimore();
    });

    $("#mad_fetch").click(function() {
        fetchMadrid();
    });

    function fetchLinkBalt(link, index) {
        var call = $.ajax({
            dataType: "json",
            url: link,
            success: function(data) {
                balt_mean_temp[index] = data.history.dailysummary[0].meantempi;
                balt_max_temp[index] = data.history.dailysummary[0].maxtempi;
                balt_min_temp[index] = data.history.dailysummary[0].mintempi;
                balt_precip[index] = data.history.dailysummary[0].precipi;
            }
        });

        callbackAry.push(call);
    }

    function fetchBaltimore() {
        var link = "";
        var year = "2016";
        var month = "09";
        var day = "";
        var overallIndex = 0;

        //Fetch September
        for (var i = 1; i <= 30; i++) {
                if (i < 10) {
                    day = "0" + i;
                } else {
                    day = i;
                }
                link = hLink1 + year + month + day + bLink2;
                fetchLinkBalt(link, overallIndex++);
        }

        //Fetch October
        month = "10";
        for (var i = 1; i <= 18; i++) {

                console.log(balt_mean_temp);
                if (i < 10) {
                    day = "0" + i;
                } else {
                    day = i;
                }

                link = hLink1 + year + month + day + bLink2;
                fetchLinkBalt(link, overallIndex++);
        }

        $.when.apply(this, callbackAry).done(function() {
            console.log(balt_max_temp);
            for (var i = 0; i < balt_mean_temp.length; i++) {

                $("#balt_mean_temp").append("<li>" + balt_mean_temp[i] + "</li");
                $("#balt_max_temp").append("<li>" + balt_max_temp[i] + "</li");
                $("#balt_min_temp").append("<li>" + balt_min_temp[i] + "</li");
                $("#balt_precip").append("<li>" + balt_precip[i] + "</li");
            }
        });
    }

    function fetchLinkMad(link, index) {
        var call = $.ajax({
            dataType: "json",
            url: link,
            success: function(data) {
                mad_mean_temp[index] = data.history.dailysummary[0].meantempi;
                mad_max_temp[index] = data.history.dailysummary[0].maxtempi;
                mad_min_temp[index] = data.history.dailysummary[0].mintempi;
                mad_precip[index] = data.history.dailysummary[0].precipi;
            }
        });

        callbackAry2.push(call);
    }

    function fetchMadrid() {
        var link = "";
        var year = "2016";
        var month = "09";
        var day = "";
        var overallIndex = 0;

        //Fetch September
        for (var i = 1; i <= 30; i++) {
                if (i < 10) {
                    day = "0" + i;
                } else {
                    day = i;
                }
                link = hLink1 + year + month + day + mLink2;
                fetchLinkMad(link, overallIndex++);
        }

        //Fetch October
        month = "10";
        for (var i = 1; i <= 18; i++) {

                console.log(mad_mean_temp);
                if (i < 10) {
                    day = "0" + i;
                } else {
                    day = i;
                }

                link = hLink1 + year + month + day + mLink2;
                fetchLinkMad(link, overallIndex++);
        }

        $.when.apply(this, callbackAry2).done(function() {
            for (var i = 0; i < mad_mean_temp.length; i++) {

                $("#mad_mean_temp").append("<li>" + mad_mean_temp[i] + "</li");
                $("#mad_max_temp").append("<li>" + mad_max_temp[i] + "</li");
                $("#mad_min_temp").append("<li>" + mad_min_temp[i] + "</li");
                $("#mad_precip").append("<li>" + mad_precip[i] + "</li");
            }
        });
    }
});
