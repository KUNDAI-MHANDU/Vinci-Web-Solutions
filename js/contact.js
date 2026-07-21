(function(){
  const form=document.getElementById('contactForm');
  const status=document.getElementById('formStatus');
  if(!form||!status)return;
  form.addEventListener('submit',function(event){
    event.preventDefault();
    if(!form.checkValidity()){
      form.reportValidity();
      status.textContent='Please complete each field so we know how to respond.';
      return;
    }
    const button=form.querySelector('button[type="submit"]');
    button.disabled=true; button.setAttribute('aria-busy','true'); button.firstChild.textContent='Sending… ';
    status.textContent='';
    window.setTimeout(function(){
      form.reset(); button.disabled=false; button.removeAttribute('aria-busy'); button.firstChild.textContent='Send message ';
      status.textContent='Thanks — your message is ready for us. We’ll be in touch within one working day.';
    },700);
  });
})();
