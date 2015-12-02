<?php
/**
 * @file sunset/templates/node.tpl.php
 * \file sunset/templates/node.tpl.php
 * \ingroup Sunset
 * Default node template
 */

hide($content['comments']);
hide($content['links']);
?>
<!-- node.tpl.php -->
<article id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>
  <?php print render($title_prefix); ?>
  <?php if(!empty($title) && !$page): ?>
  <header>
    <?php if (!$page && $title): ?>
      <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
    <?php endif; ?>
  </header>
  <?php endif; ?>
  <?php print render($title_suffix); ?>
  <div class="content">
    <?php print render($content); ?>
  </div>
</article>
