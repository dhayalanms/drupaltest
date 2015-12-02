<?php
/**
 * @file sunset/templates/block.tpl.php
 * \file sunset/templates/block.tpl.php
 * \ingroup Sunset
 * Default theme implementation to display a block.
 */
?>

<aside id="<?php print $block_html_id; ?>" class="<?php print $block_html_id; ?> <?php print $classes; ?>"<?php print $attributes; ?>>
  <div class="block-inner">
    <?php print render($title_prefix); ?>
      <?php if (!empty($block->subject)): ?>
        <header><h2<?php print $title_attributes; ?>><?php print $block->subject; ?></h2></header>
      <?php endif;?>
    <?php print render($title_suffix); ?>

    <?php print $content ?>
  </div>
</aside>
