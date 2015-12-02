<?php
/**
 * @file sunset/templates/html.tpl.php
 * \file sunset/templates/html.tpl.php
 * \ingroup sunset
 * HTML template
 */
?>
<!DOCTYPE html>
<!--[if lt IE 7 ]> <html class="lt-ie10 lt-ie9 lt-ie8 lt-ie7 ie6" <?php //print $html_attributes; ?>> <![endif]-->
<!--[if IE 7 ]>    <html class="lt-ie10 lt-ie9 lt-ie8 ie7" <?php //print $html_attributes; ?>> <![endif]-->
<!--[if IE 8 ]>    <html class="lt-ie10 lt-ie9 ie8" <?php //print $html_attributes; ?>> <![endif]-->
<!--[if IE 9 ]>    <html class="lt-ie10 ie9" <?php //print $html_attributes; ?>> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!-->
<html <?php //print $html_attributes; ?>>
<!--<![endif]-->

<!--html.tpl.php-->
<head>
<script type="text/javascript" language="javascript"
	src="http://tiads.thisoldhouse.com/ads/tgx.js"></script>
<title><?php print html_entity_decode($head_title); ?></title>
  <?php print $head; ?>
  <?php print $styles; ?>
  <?php print $scripts; ?>
  <?php //print $ie_scripts; ?>
  <script type="text/javascript" language="javascript">
  // <![CDATA[  
var _sf_startpt=(new Date()).getTime(); try{Typekit.load();}catch(e){} 	
var adConfig = new TiiAdConfig("3475.toh2");
adConfig.setCmSitename("cm.toh");
adConfig.setRevSciTracking(true);

      this.THISOLDHOUSE = {
	  	 markup_id : { 
		 content: 'home', page: 'home', media: 'screen',
		 stringify: function(c,b){var f="|",e=["content","page","media"],d=0,g=this,a=[];c=c||f;b=b||e;for(d=0,len=b.length;d<len;d+=1){a.push(g[b[d]]||"")}return a.join(c)}
		 }, page_context: {}
	  };
	var adFactory = new TiiAdFactory(adConfig, "homepage");
adFactory.setParam("ptype", "main");
var _ad_position = 'homepage'; 
// ]]>  

	</script>
</head>
<body <?php print phptemplate_body_attributes($is_front); ?>>

  <?php print $page_top; ?>
  <div class="skip-link">
		<a href="#main-content" class="element-invisible element-focusable"><?php print t('Skip to main content'); ?></a>
	</div>
	<div id="top"></div>
	<div class="site-wrapper container-wrapper">
    <?php print $page; ?>
  </div>
  <?php print $page_bottom; ?>
</body>
</html>
