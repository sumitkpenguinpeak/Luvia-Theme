$(function () {
  const $panels = $('.section-faqs .panel-group');
  const animationDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 320;

  $panels.filter('.is-open').find('.panel-body').show();

  $panels.find('.panel-header').on('click', function () {
    const $panel = $(this).closest('.panel-group');
    const $answer = $panel.find('.panel-body');

    if ($panel.hasClass('is-open')) {
      $panel.removeClass('is-open');
      $(this).attr('aria-expanded', 'false');
      $answer.attr('aria-hidden', 'true').stop(true, true).slideUp(animationDuration, 'swing');
      return;
    }

    $panels.not($panel).each(function () {
      const $otherPanel = $(this);
      $otherPanel.removeClass('is-open');
      $otherPanel.find('.panel-header').attr('aria-expanded', 'false');
      $otherPanel.find('.panel-body').attr('aria-hidden', 'true').stop(true, true).slideUp(animationDuration, 'swing');
    });

    $panel.addClass('is-open');
    $(this).attr('aria-expanded', 'true');
    $answer.attr('aria-hidden', 'false').stop(true, true).slideDown(animationDuration, 'swing');
  });
});