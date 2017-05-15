<!DOCTYPE html>
<html data-ng-app="UserApp" xmlns="http://www.w3.org/1999/xhtml"
      xmlns:fb="http://ogp.me/ns/fb#">
	  
<head>
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width, initial-scale=1">
	<base href="<?php echo base_url() ?>" >
 <link href="<?php echo base_url();?>css/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
 <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
 <link href="<?php echo base_url();?>css/frontcss/style.css" rel="stylesheet" />
 <link href="<?php echo base_url();?>css/frontcss/responsive.css" rel="stylesheet" /> 
 <link rel='stylesheet' href='<?php echo base_url();?>css/frontcss/material.cyan-light_blue.min.css'>
 <link href="<?php echo base_url();?>css/css/datepicker.css" rel="stylesheet" type="text/css" />
 <link href="<?php echo base_url();?>calculator.css" rel="stylesheet" type="text/css" />
 <link rel='stylesheet' href='<?php echo base_url(); ?>css/fonts.css'>
	  <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css'>
	<link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.0.0-beta.2.4/assets/owl.carousel.min.css'> 

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-93892914-2', 'auto');
  ga('send', 'pageview');

</script>	
	<!-- start Mixpanel --><script type="text/javascript">(function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(l=a.match(RegExp(b+"=([^&]*)")))?l[1]:null};g&&c(g,"state")&&(i=JSON.parse(decodeURIComponent(c(g,"state"))),"mpeditor"===i.action&&(b.sessionStorage.setItem("_mpcehash",g),history.replaceState(i.desiredHash||"",e.title,j.pathname+j.search)))}catch(m){}var k,h;window.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,
0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";c=e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}})(document,window.mixpanel||[]);
mixpanel.init("da0f9fb5fa137b612bd0a55b97ad5cde");</script><!-- end Mixpanel -->
</head>
<body>
	<div>
	  <div data-ng-include="'<?php echo base_url();?>template/User/header.html'" data-ng-controller="HeaderController" ></div>
	  <div ui-view class="fade-in-up"></div>
		<input type="hidden" id="state" value="<?php echo $state; ?>">
	</div>
	
    <script src="<?php echo base_url();?>assets/js/jquery.min.js"></script>
	<script src="<?php echo base_url();?>assets/js/jquery-ui-1.10.3.min.js" type="text/javascript"></script>
	<script src="<?php echo base_url();?>assets/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="<?php echo base_url();?>assets/js/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js" type="text/javascript"></script>
		<script src="<?php echo base_url();?>assets/custom/js/bootstrap-datepicker.js"></script>
        <script src="<?php echo base_url()?>assets/global/plugins/angularjs/angular.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>assets/global/plugins/angularjs/angular-sanitize.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>assets/global/plugins/angularjs/angular-touch.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>assets/global/plugins/angularjs/plugins/angular-ui-router.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>assets/global/plugins/angularjs/plugins/ocLazyLoad.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>assets/global/plugins/angularjs/plugins/ui-bootstrap-tpls.min.js" type="text/javascript"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/ng-meta/0.3.9/ngMeta.js"></script>
		<script src="<?php echo base_url();?>assets/js/angular-ui-utils.min.js"></script>
        <script src="<?php echo base_url()?>js/User/user.js" type="text/javascript"></script>
       
        <script src='<?php echo base_url()?>assets/ngInfiniteScroll-1.0.0/build/ng-infinite-scroll.min.js' type='text/javascript'></script>
		
		<script src="<?php echo base_url()?>assets/global/scripts/app.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>assets/layouts/layout/scripts/layout.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>assets/layouts/global/scripts/quick-sidebar.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>assets/layouts/layout/scripts/demo.min.js" type="text/javascript"></script>
		<script src="<?php echo base_url()?>assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js"></script>
		<script src="<?php echo base_url();?>assets/js/angular-cookies.js"></script>

		<script src="<?php echo base_url();?>assets/custom/js/bootstrap.offcanvas.js"></script>
	
		<script src="<?php echo base_url();?>assets/custom/js/theia-sticky-sidebar.js"></script>
		
		<script src="<?php echo base_url();?>assets/custom/js/enscroll-0.6.1.min.js"></script>
		<script src="<?php echo base_url();?>assets/custom/js/wow.js"></script>
   
	<script src="<?php echo base_url();?>assets/js/material.min.js"></script>
	
      <script src="<?php echo base_url();?>assets/js/angular-animate.min.js" ></script>
	
     <script src="https://mgcrea.github.io/angular-strap/dist/angular-strap.js" data-semver="v2.3.8"></script>
    <script src="https://mgcrea.github.io/angular-strap/dist/angular-strap.tpl.js" data-semver="v2.3.8"></script>
	
	 <script type="text/javascript" src="<?php echo base_url();?>assets/js/ngStorage.min.js"></script>

<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyDub3PR2BcnlrM16xAwLmUCrXNwgGjZpjM&libraries=places'></script>
	
	<script src='<?php echo base_url();?>assets/js/jquery.magnific-popup.min.js'></script>		

	<script src='<?php echo base_url();?>assets/js/owl.carousel.min.js'></script>
	<script src='<?php echo base_url();?>assets/js/Chart.min.js'></script>
	
	<script src="<?php echo base_url() ?>assets/ng-idle-develop/angular-idle.js" type="text/javascript"></script>
	<script src="<?php echo base_url();?>assets/js/jquery.inputmask.extensions.js"></script>
		<script src="<?php echo base_url();?>assets/js/jquery.inputmask.js"></script>

	</body>
</html>