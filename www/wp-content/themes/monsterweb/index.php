<?php

$context = Timber::context();
$context['post'] = Timber::get_post();

Timber::render('./view/index.twig', $context);