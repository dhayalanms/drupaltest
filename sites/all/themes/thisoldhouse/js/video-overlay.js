var VPO = {};
var player;

$(document).ready(function(){
	getLinkForVPO();
    VPO.init();
});

(function($) {

    // variables
    var currentUrl,
        videoUrl;  

    VPO.init = function(){
         $('.videoTouts ul.tout li a').each(function(){
            var permalink = $(this).attr("href"),
                obPermalink = '';

            $(this).on('click', function(event){
                event.preventDefault();
                videoUrl = permalink;
                VPO.getVideoData(videoUrl, 1);
            });
        });
    };
 
	VPO.getVideoData = function(videoUrl, doAdRefresh){
		if (doAdRefresh == 1) {
			var tmpvideoUrl = videoUrl;
			var tmpvideoUrl = tmpvideoUrl.replace('/toh/video','/toh/video/json');
			currentUrl = tmpvideoUrl.replace('00.html','00.json');
			
			$.ajaxSetup({async: false});
		  	$.getJSON(currentUrl, function (data) {
		  		currentOverlayVideoData = data;

		  	});
		  	$.ajaxSetup({async: true});

			VPO.modVP.loadVideoByID(currentOverlayVideoData.video.videoid);
			VPO.showVideoDetails(currentOverlayVideoData, doAdRefresh);
			
			var currentVideoID = currentOverlayVideoData.video.id;	
			VPO.init();
		}
		else { VPO.showVideoDetails(currentOverlayVideoData, 0); }
	};

	VPO.showVideoDetails = function(data, doAdRefresh){
		videoDetails = ich.videoDetails(data);
		$('div.videoDetailsWrap').html(videoDetails);

		if (doAdRefresh == 1) {
		    
		}
		//videoOverlayOmnitureRefresh(data);
	};

})(jQuery);

//attach click event for main site touts link -minus video page
function getLinkForVPO(){
    $("a.videoLinkOverlay").on('click', function(event){
		videoLinkOverlayClickBinding( event, $(this).attr('href'));
	});   
}

//for site links
function videoLinkOverlayClickBinding(event, videoUrl){
    event.preventDefault();
	
    $.colorbox({
        width:'980px', 
        height:'683px', 
        opacity:0.7,
        scrolling:false,
        iframe:true, 
        href: 'http://' + document.location.hostname + "/toh/static/r/overlay/video-overlay.html?videoUrl="+ videoUrl,
        onOpen:function(){
            $('#colorbox').addClass('videoOverlayWrap');
          },
        onClosed:function(){$('#colorbox').removeClass('videoOverlayWrap');}
    });
}


function videoOverlayOmnitureRefresh(data) {
    s_time.pageName = (typeof(data.video.omniturevaluepairs.pageName) != "undefined" ? data.video.omniturevaluepairs.pageName + "|overlay" : "");
    s_time.prop1 = (typeof(data.video.omniturevaluepairs.prop1) != "undefined" ? data.video.omniturevaluepairs.prop1 : "");
    s_time.prop2 = (typeof(data.video.omniturevaluepairs.prop2) != "undefined" ? data.video.omniturevaluepairs.prop2 : "");
    s_time.prop3 = (typeof(data.video.omniturevaluepairs.prop3) != "undefined" ? data.video.omniturevaluepairs.prop3 : "");
    s_time.prop4 = (typeof(data.video.omniturevaluepairs.prop4) != "undefined" ? data.video.omniturevaluepairs.prop4 : "");
    s_time.prop5 = (typeof(data.video.omniturevaluepairs.prop5) != "undefined" ? data.video.omniturevaluepairs.prop5 : "");
    s_time.prop6 = (typeof(data.video.omniturevaluepairs.prop6) != "undefined" ? data.video.omniturevaluepairs.prop6 : "");
    s_time.prop7 = (typeof(data.video.omniturevaluepairs.prop7) != "undefined" ? data.video.omniturevaluepairs.prop7 : "");
    s_time.prop8 = (typeof(data.video.omniturevaluepairs.prop8) != "undefined" ? data.video.omniturevaluepairs.prop8 : "");
    s_time.prop9 = (typeof(data.video.omniturevaluepairs.prop9) != "undefined" ? data.video.omniturevaluepairs.prop9 : "");
    s_time.prop10 = (typeof(data.video.omniturevaluepairs.prop10) != "undefined" ? data.video.omniturevaluepairs.prop10 : "");
    s_time.prop11 = (typeof(data.video.omniturevaluepairs.prop11) != "undefined" ? data.video.omniturevaluepairs.prop11 : "");
    s_time.prop12 = (typeof(data.video.omniturevaluepairs.prop12) != "undefined" ? data.video.omniturevaluepairs.prop12 : "");
    s_time.prop16 = (typeof(data.video.omniturevaluepairs.prop16) != "undefined" ? data.video.omniturevaluepairs.prop16 : "");
    s_time.prop17 = (typeof(videoUrl) != "undefined" ? videoUrl : "");
    s_time.prop20 = (typeof(data.video.omniturevaluepairs.prop20) != "undefined" ? data.video.omniturevaluepairs.prop20 : "");
    s_code=s_time.t();
}