(function () {
  const script = document.currentScript;
  const creator = script.getAttribute('data-creator') || 'me';
  const style = script.getAttribute('data-style') || 'button';
  const iframe = document.createElement('iframe');

  iframe.src = `https://tipjar.plus/widget/preview?handle=${creator}&style=${style}`;
  iframe.style.border = 'none';
  iframe.style.width = '200px';
  iframe.style.height = '60px';
  iframe.style.position = 'fixed';
  iframe.style.bottom = '20px';
  iframe.style.right = '20px';
  iframe.style.zIndex = '9999';
  iframe.allowTransparency = true;

  document.body.appendChild(iframe);
})();
