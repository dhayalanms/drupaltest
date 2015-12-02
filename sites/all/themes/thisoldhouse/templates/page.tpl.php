
<div class="hdr-ad">
	<div id="hdr-ad-container">
		<!--@TopArticle -->
	  <?php if (!empty($page['header_top'])) { print render($page['header_top']); } ?>

	</div>
</div>
<header id="toh-header">
	<div class="hdr-spacer"></div>
	<div class="hdr-features">
<?php if (!empty($page['header'])) { print render($page['header']); }  ?>	
	</div>
</header>
<nav id="toh-nav">
	<!--including /toh/static/r/global-nav.txt -->
	<ul>
	<?php if (!empty($page['nav_main'])) { print render($page['nav_main']); }  ?>
    </ul>
</nav>

<div id="mod-ad-opa-ofie">
	<div id="ad-opa-101x1">
		<script type="text/javascript">
			  var ad = adFactory.getMultiAd(new Array("101x1","970x250","970x66"));
		      ad.setPosition(1);
		      ad.write();
		    </script>
	</div>
</div>



<script type="text/javascript">
			
		(function(){
		  THISOLDHOUSE.page_context.sidebar_config = {
		  	badges: { 'print_badge': false, 'stumbleupon': false, 'google_plusone': false, 'email_badge': false, 'twitter': false},
		   
		    pinterest: {
              alt_init: true,
              html: '<img src="http://passets-cdn.pinterest.com/images/about/buttons/pinterest-button.png" alt="Follow us on Pinterest" />',
              attributes: {
                target: '_blank',
                href: 'http://pinterest.com/thisoldhouse'
              }
            }
		  }
		})();
</script>
<div class="social-sidebar" id="social-bar">
	<ul class="badge-list">
		<li class="badge-facebook-like badge"></li>
		<li class="badge-pinterest badge"></li>
		<li class="badge-twit badge"><a target="_blank"
			href="https://twitter.com/thisoldhouse"></a></li>
		<li class="badge-tumblr badge"><a target="_blank"
			href="http://thisoldhouse.tumblr.com/"></a></li>
		<li class="badge-google-plus badge"><a target="_blank"
			href="https://plus.google.com/+thisoldhouse/posts"></a></li>
		<li class="badge-instagram badge"><a target="_blank"
			href="http://instagram.com/thisoldhouse#"></a></li>
		<li class="badge-youtube badge"><a
			href=" https://www.youtube.com/user/thisoldhouse" target="_blank"></a></li>
		<li class="tab">S<br />H<br />A<br />R<br />E
		</li>
	</ul>
</div>
<div class="social-sidebar video-social-sidebar">
	<ul class="badge-list">
		<li class="badge">
			<h1 class="tv-link">VIDEO</h1> <a href="/toh/video"
			class="side-video">See What's Trending Now!</a> <a href="/toh/video"><span
				class="trending-back"></span></a>
		</li>
	</ul>
</div>
<div id="toh-main">

	<div class="main-content">
	<?php if (!empty($page['content'])) { print render($page['content']); }  ?>
	</div>
	<div class="main-aside">
		<ul class="episode-list">
   <?php if (!empty($page['sidebar_first'])) { print render($page['sidebar_first']); }  ?>
		</ul>
	</div>
</div>

<!--[if IE 5]> Vignette StoryServer 6.0 Wed Sep 30 02:39:43 2015 <![endif]-->

<footer>
	<section id="toh-footer">
    <?php if (!empty($page['footer'])) { print render($page['footer']); }  ?>
   </section>
</footer>
