<?php
/**
 * @file template.php
 * \defgroup thisoldhouse Theme
 * \ingroup Themes
 * \brief template.php file for Theme.
 *
 *  This file begins with preprocessing the biggest/outermost elements and moves down
 *  to the smaller (html, page, node, region, block, etc.) Find helper functions, etc. at bottom.
 * @{
 */
/**
 * Implements hook_preprocess_html().
 *
 * @details Adds javascript files and HTML and BODY classes
 *          and manages HTML head title and print pages
 */
function thisoldhouse_preprocess_html(&$variables) {
}

/**
 * Implements hook_preprocess_page().
 *
 * @details Adds a new variable to the page template, `main_menu_tree` for use
 *   in displaying a full dropdown menu of the site's main menu.
 *   Manages print preview. Manages campaign idiosyncrasies.
 *   Provides extra classes on the main-content div.
 */
function thisoldhouse_preprocess_page(&$variables) {
	global $base_url;
}
/**
 * Implements hook_preprocess_node().
 */
function thisoldhouse_preprocess_node(&$variables) {
}
/**
 * Sets the body tag class and id attributes.
 *
 * From the Theme Developer's Guide, http://drupal.org/node/32077
 *
 * @param $is_front
 *   boolean Whether or not the current page is the front page.
 * @param $layout
 *   string Which sidebars are being displayed.
 * @return
 *   string The rendered id and class attributes.
 */
/**
 * Sets the body tag class and id attributes.
 *
 * From the Theme Developer's Guide, http://drupal.org/node/32077
 *
 * @param $is_front
 *   boolean Whether or not the current page is the front page.
 * @param $layout
 *   string Which sidebars are being displayed.
 * @return
 *   string The rendered id and class attributes.
 */
function phptemplate_body_attributes($is_front = false, $layout = 'none') {
  if ($is_front) {
    $body_id = $body_class = 'home';
  }
  else {
    // Remove base path and any query string.
    global $base_path;
    list(,$path) = explode($base_path, $_SERVER['REQUEST_URI'], 2);
    list($path,) = explode('?', $path, 2);
    $path = rtrim($path, '/');
    // Construct the id name from the path, replacing slashes with dashes.
    $body_id = str_replace('/', '-', $path);
    // Construct the class name from the first part of the path only.
    list($body_class,) = explode('/', $path, 2);
  }
  $body_id = $body_id;
  $body_class = 'section-'. $body_class;

  // Use the same sidebar classes as Garland.
  $sidebar_class = ($layout == 'both') ? 'sidebars' : "sidebar-$layout";

  return " id='$body_id' class='$body_class $sidebar_class' ";
}
