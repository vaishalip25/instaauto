<!DOCTYPE html>
<html data-ng-app="AdminApp" xmlns="http://www.w3.org/1999/xhtml"
      xmlns:fb="http://ogp.me/ns/fb#">
	  
<head>
	<meta charset="utf-8"> 
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<link href="<?php echo base_url();?>css/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
	<link href="<?php echo base_url();?>css/css/timepicker/bootstrap-timepicker.min.css" rel="stylesheet"/>
	<link href="<?php echo base_url();?>css/css/AdminLTE.css" rel="stylesheet" type="text/css" />
	<link href="<?php echo base_url();?>css/css/datepicker.css" rel="stylesheet" type="text/css" />
	<link href="<?php echo base_url();?>assets/global/css/fileinput.css" rel="stylesheet" type="text/css" />
	<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-timepicker/0.5.2/css/bootstrap-timepicker.min.css" rel="stylesheet" type="text/css" />
	<link href="<?php echo base_url();?>css/style.css" rel="stylesheet" type="text/css" />
	<link href="<?php echo base_url();?>css/responsive.css" rel="stylesheet" type="text/css" />
	<!--<link href="https://cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/css/jasny-bootstrap.css" rel="stylesheet" type="text/css" />-->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-grid/4.0.4/ui-grid.css" type="text/css">
	
</head>

<body>

<div>
<div data-ng-include="'template/Admin/sidebar.html'" data-ng-controller="SidebarController" ></div>

<div ui-view class="fade-in-up"></div>
	
</div>

</div>

      

		  <script src="<?php echo base_url();?>assets/js/jquery.min.js"></script>
		<script src="<?php echo base_url();?>assets/js/jquery-ui-1.10.3.min.js" type="text/javascript"></script>
	
		<script src="<?php echo base_url();?>assets/js/bootstrap.min.js" type="text/javascript"></script>
		<script src="<?php echo base_url();?>assets/js/fileinput.js"></script>
		<script src="<?php echo base_url();?>assets/js/plugins/input-mask/jquery.inputmask.js" type="text/javascript"></script>
        <script src="<?php echo base_url();?>assets/js/plugins/input-mask/jquery.inputmask.date.extensions.js" type="text/javascript"></script>
        <script src="<?php echo base_url();?>assets/js/plugins/input-mask/jquery.inputmask.extensions.js" type="text/javascript"></script>
		<script src="<?php echo base_url();?>
		assets/js/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url();?>assets/js/plugins/timepicker/bootstrap-timepicker.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url();?>assets/js/app.js" type="text/javascript"></script>
	

        <script src="<?php echo base_url()?>assets/global/plugins/angularjs/angular.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>assets/global/plugins/angularjs/angular-sanitize.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>assets/global/plugins/angularjs/angular-touch.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>assets/global/plugins/angularjs/plugins/angular-ui-router.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>assets/global/plugins/angularjs/plugins/ocLazyLoad.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>assets/global/plugins/angularjs/plugins/ui-bootstrap-tpls.min.js" type="text/javascript"></script>
		<script type="text/javascript" src="<?php echo base_url();?>assets/js/ngMeta.js"></script>
		<script src="<?php echo base_url();?>assets/js/angular-ui-utils.min.js"></script>
        <!-- END CORE ANGULARJS PLUGINS -->
        <!-- BEGIN APP LEVEL ANGULARJS SCRIPTS -->
        <script src="<?php echo base_url()?>js/Admin/admin.js" type="text/javascript"></script>
       
        <script src='<?php echo base_url()?>assets/ngInfiniteScroll-1.0.0/build/ng-infinite-scroll.min.js' type='text/javascript'></script>
		<!-- <script src="<?php echo base_url()?>js/User/directives.js" type="text/javascript"></script>-->
		
		<script src="<?php echo base_url()?>assets/global/scripts/app.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>assets/layouts/layout/scripts/layout.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>assets/layouts/global/scripts/quick-sidebar.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>assets/layouts/layout/scripts/demo.min.js" type="text/javascript"></script>
	<script src="<?php echo base_url()?>assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js"></script>
		<script src="<?php echo base_url();?>assets/js/angular-cookies.js"></script>

		<script src="<?php echo base_url();?>assets/custom/js/bootstrap.offcanvas.js"></script>
	
	   <script src="<?php echo base_url();?>wysiwyg editor/bootstrap-colorpicker-module.js"></script>
    <script src="<?php echo base_url();?>wysiwyg editor/angular-wysiwyg.js"></script>

	
		<script src="<?php echo base_url();?>assets/js/jquery.inputmask.extensions.js"></script>
		<script src="<?php echo base_url();?>assets/js/jquery.inputmask.js"></script>
		<script src="<?php echo base_url();?>assets/custom/js/theia-sticky-sidebar.js"></script>
		<script src="<?php echo base_url();?>assets/custom/js/enscroll-0.6.1.min.js"></script>
		<script src="<?php echo base_url();?>assets/custom/js/wow.js"></script>
		<script src="<?php echo base_url();?>assets/custom/js/bootstrap-datepicker.js"></script>
		<script src="	https://cdnjs.cloudflare.com/ajax/libs/bootstrap-timepicker/0.5.2/js/bootstrap-timepicker.min.js"></script>
	

	
      <script src="<?php echo base_url();?>assets/js/angular-animate.min.js" ></script>
     <script src="https://mgcrea.github.io/angular-strap/dist/angular-strap.js" data-semver="v2.3.8"></script>
    <script src="https://mgcrea.github.io/angular-strap/dist/angular-strap.tpl.js" data-semver="v2.3.8"></script>
	
	<script src="<?php echo base_url();?>assets/js/ui-grid.js"></script>
	<script src="<?php echo base_url();?>assets/js/pdfmake.js"></script>
        <script src="<?php echo base_url();?>assets/js/vfs_fonts.js"></script>
        <script src="<?php echo base_url();?>assets/js/ui-grid-unstable.js"></script>
		 <link rel="stylesheet" href="<?php echo base_url();?>assets/js/ui-grid-unstable.css" type="text/css">
	 <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/js/jasny-bootstrap.js" ></script>-->
	<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyDub3PR2BcnlrM16xAwLmUCrXNwgGjZpjM&libraries=places'></script>
	<script src="<?php echo base_url();?>assets/js/FileSaver.js" type="text/javascript"></script>
	
	 
	
	

<script>
$('.carousel').carousel();
</script>



</body>
</html>