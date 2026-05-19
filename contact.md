---
layout: default
title: Contact | Jordan Waxman
description: Tell me what you&rsquo;re working on. I&rsquo;ll review your note and we&rsquo;ll book a 30-minute call.
---

<div class="page-content">
  <div class="container">
    <div class="contact-content">
      <h1>Let&rsquo;s talk.</h1>
      <p class="intake-intro">Tell me what you&rsquo;re working on. I&rsquo;ll review your note and we&rsquo;ll book a 30-minute call from there.</p>

      <form id="intake-form" class="intake-form">

        <div class="form-field">
          <label for="contactName">Your name</label>
          <input id="contactName" name="contactName" type="text" required maxlength="120" autocomplete="name" placeholder="Jane Smith">
        </div>

        <div class="form-field">
          <label for="email">Email</label>
          <input id="email" name="email" type="email" required maxlength="200" autocomplete="email" placeholder="jane@company.com">
        </div>

        <div class="form-field">
          <label for="businessName">Company</label>
          <input id="businessName" name="businessName" type="text" required maxlength="200" autocomplete="organization" placeholder="Acme Corp">
        </div>

        <div class="form-field">
          <label for="problemStatement">What&rsquo;s the work?</label>
          <textarea id="problemStatement" name="problemStatement" required maxlength="2000" rows="5" placeholder="Tell me what you&rsquo;re trying to do, what&rsquo;s broken, or where you&rsquo;re stuck. No need to polish it."></textarea>
        </div>

        <input name="source" type="hidden" value="website-intake-form">

        <!-- Honeypots: CSS-hidden from humans, visible to bots -->
        <div class="honeypot-wrap" aria-hidden="true">
          <label>Website <input name="website" type="text" tabindex="-1" autocomplete="off"></label>
          <label>Fax <input name="fax" type="text" tabindex="-1" autocomplete="off"></label>
        </div>

        <!-- Cloudflare Turnstile -->
        <div class="form-field form-field--turnstile">
          <div class="cf-turnstile"
               data-sitekey="0x4AAAAAADR6C8u_uhPEEyCF"
               data-callback="onTurnstileSuccess"
               data-error-callback="onTurnstileError"
               data-expired-callback="onTurnstileExpired">
          </div>
        </div>

        <div class="form-field">
          <button id="intake-submit" type="submit" class="form-submit" disabled>Send &rarr;</button>
          <p class="form-hint">I&rsquo;ll reply within one business day.</p>
        </div>

      </form>

      <div id="form-status" role="status" aria-live="polite"></div>

      <p class="contact-email">Prefer email? <a href="mailto:jordan@jordanwaxman.com">jordan@jordanwaxman.com</a></p>
    </div>
  </div>
</div>

<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>

<script>
(function () {
  var submitBtn = document.getElementById('intake-submit');
  var statusDiv = document.getElementById('form-status');
  var form = document.getElementById('intake-form');

  function onTurnstileSuccess() {
    submitBtn.disabled = false;
  }

  function onTurnstileError() {
    submitBtn.disabled = true;
    showError('Security check failed. Please refresh the page and try again.');
  }

  function onTurnstileExpired() {
    submitBtn.disabled = true;
  }

  window.onTurnstileSuccess = onTurnstileSuccess;
  window.onTurnstileError = onTurnstileError;
  window.onTurnstileExpired = onTurnstileExpired;

  function showError(msg) {
    statusDiv.innerHTML = '<p class="form-error">' + msg + '</p>';
    if (window.turnstile) { window.turnstile.reset(); }
    submitBtn.disabled = true;
  }

  function renderSuccess(redirectUrl) {
    form.style.display = 'none';
    statusDiv.innerHTML =
      '<div class="form-success-wrap">' +
        '<h2>Thanks &mdash; let&rsquo;s talk.</h2>' +
        '<p>Pick a 30-minute slot below. I&rsquo;ll review your note before the call.</p>' +
        '<iframe src="' + redirectUrl + '" width="100%" height="800" loading="lazy" style="border:none;margin-top:24px;border-radius:4px;min-height:600px;max-height:90vh;"></iframe>' +
        '<p style="margin-top:12px;font-size:14px;color:var(--text-muted);">' +
          '<a href="' + redirectUrl + '" target="_blank" rel="noopener">Open booking page in a new tab &rarr;</a>' +
        '</p>' +
      '</div>';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    submitBtn.disabled = true;
    statusDiv.innerHTML = '';

    var data = Object.fromEntries(new FormData(form));

    fetch('/api/intake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(function (r) {
      return r.json().then(function (result) {
        return { status: r.status, result: result };
      });
    })
    .then(function (res) {
      if (res.status === 200 && res.result.status === 'ok') {
        renderSuccess(res.result.redirect_url);
      } else if (res.status === 429) {
        showError("You&rsquo;ve sent a few inquiries already &mdash; please email <a href='mailto:jordan@jordanwaxman.com'>jordan@jordanwaxman.com</a> directly if it&rsquo;s urgent.");
        submitBtn.disabled = false;
      } else {
        showError('Something went wrong. Please try again or email <a href="mailto:jordan@jordanwaxman.com">jordan@jordanwaxman.com</a>.');
        submitBtn.disabled = false;
      }
    })
    .catch(function () {
      showError('Network issue. Please check your connection and try again.');
      submitBtn.disabled = false;
    });
  });
}());
</script>
