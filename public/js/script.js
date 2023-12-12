(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false);
  });
})();

        const taxSwitch = document.getElementById("flexSwitchCheckReverse");
        taxSwitch.addEventListener("click",()=>{
            let taxes = document.getElementsByClassName("Gst-Tax");

            console.log(taxes);
            for(tax of taxes){
                if(tax.style.display != "inline"){
                    
                    tax.style.display="inline";
                }
                else{
                    tax.style.display = "none";
                }

            }
        })
    