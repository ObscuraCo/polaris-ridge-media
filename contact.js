(function(){
  var form = document.getElementById('contact-form');
  if(!form) return;

  var params = new URLSearchParams(window.location.search);
  var service = params.get('service');
  if(service){
    var select = form.querySelector('[name="service"]');
    if(select){
      var match = Array.prototype.find.call(select.options, function(opt){ return opt.value === service; });
      if(match) select.value = service;
    }
  }

  var statusEl = document.getElementById('form-status');
  var submitBtn = form.querySelector('button[type="submit"]');
  var submitLabel = submitBtn ? submitBtn.textContent : '';

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(submitBtn){
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }
    statusEl.textContent = '';
    statusEl.className = 'form-status';

    var payload = {};
    new FormData(form).forEach(function(value, key){ payload[key] = value; });

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function(res){ return res.json(); })
      .then(function(data){
        if(data.success){
          form.hidden = true;
          var introEl = document.getElementById('contact-intro');
          if(introEl) introEl.hidden = true;
          statusEl.textContent = "Thanks, that's on its way. We'll be in touch soon.";
          statusEl.className = 'form-status form-status-success';
        } else {
          throw new Error(data.message || 'Something went wrong.');
        }
      })
      .catch(function(){
        statusEl.textContent = "That didn't go through. Please try again, or reach us directly at questions@polarisridgemedia.com.";
        statusEl.className = 'form-status form-status-error';
        if(submitBtn){
          submitBtn.disabled = false;
          submitBtn.textContent = submitLabel;
        }
      });
  });
})();
