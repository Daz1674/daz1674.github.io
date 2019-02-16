$('#contact_form').validate({
    errorPlacement: function(){},
    submitHandler: function(form) {
        var $form = $(form);

        var reCaptchaResponse = grecaptcha.getResponse();

        if(reCaptchaResponse) {
            $form.find('button[type=submit]').prop('disabled', true);
            form.submit();
        } else {
            $form.find('#g-recaptcha > div').css('border', '1px solid #a94442');
        }
    }
});