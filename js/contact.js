(function(){
  const form=document.getElementById('contactForm');
  const status=document.getElementById('formStatus');
  if(!form||!status)return;
  form.addEventListener('submit',async function(event){
    event.preventDefault();
    if(!form.checkValidity()){
      form.reportValidity();
      status.textContent='Please complete each field so we know how to respond.';
      return;
    }
    const button=form.querySelector('button[type="submit"]');
    button.disabled=true; button.setAttribute('aria-busy','true'); button.firstChild.textContent='Sending… ';
    status.textContent='';
    try{
      const response=await fetch('/',{
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:new URLSearchParams(new FormData(form)).toString()
      });
      if(!response.ok)throw new Error('Form submission failed');
      form.reset();
      status.textContent='Thanks — your message is ready for us. We’ll be in touch within one working day.';
    }catch(error){
      status.textContent='Sorry, your message could not be sent. Please try again or contact us directly by email.';
    }finally{
      button.disabled=false; button.removeAttribute('aria-busy'); button.firstChild.textContent='Send message ';
    }
  });
})();
