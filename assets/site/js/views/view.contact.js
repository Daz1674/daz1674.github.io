/*
Name: 			View - Contact
Written by: 	Okler Themes - (http://www.okler.net)
Version: 		4.9.2
*/

(function($) {

	'use strict';

	/*
	Contact Form: Basic
	*/
	$('#contactForm').validate({
		submitHandler: function(form) {

			var $form = $(form),
				$messageSuccess = $('#contactSuccess'),
				$messageError = $('#contactError'),
				$submitButton = $(this.submitButton),
				$errorMessage = $('#mailErrorMessage');

			$submitButton.button('loading');

			// Ajax Submit
			$.ajax({
				type: 'POST',
				url: $form.attr('action'),
				data: {
					sender_name: $form.find('#SenderName').val(),
					sender_email_address: $form.find('#SenderEmail').val(),
					sender_phone_number: $form.find('#SenderPhoneNumber').val(),
					message: $form.find('#Message').val(),
					_token: $('meta[name=_token]').attr('content')
				}
			}).always(function(data, textStatus, jqXHR) {

				$errorMessage.empty().hide();

				if (data.response == 'success') {

					$messageSuccess.removeClass('hidden');
					$messageError.addClass('hidden');

					// Reset Form
					$form.find('.form-control')
						.val('')
						.blur()
						.parent()
						.removeClass('has-success')
						.removeClass('has-error')
						.find('label.error')
						.remove();

					if (($messageSuccess.offset().top - 80) < $(window).scrollTop()) {
						$('html, body').animate({
							scrollTop: $messageSuccess.offset().top - 80
						}, 300);
					}

					$submitButton.button('reset');
					
					return;

				} else if (data.response == 'error' && typeof data.errorMessage !== 'undefined') {
					$errorMessage.html(data.errorMessage).show();
				} else {
					$errorMessage.html(data.responseText).show();
				}

				$messageError.removeClass('hidden');
				$messageSuccess.addClass('hidden');

				if (($messageError.offset().top - 80) < $(window).scrollTop()) {
					$('html, body').animate({
						scrollTop: $messageError.offset().top - 80
					}, 300);
				}

				$form.find('.has-success')
					.removeClass('has-success');
					
				$submitButton.button('reset');

			});
		}
	});

	/*
	Contact Form: Advanced
	*/
	$('#contactFormAdvanced').validate({
		onkeyup: false,
		onclick: false,
		onfocusout: false,
		rules: {
			'captcha': {
				captcha: true
			},
			'checkboxes[]': {
				required: true
			},
			'radios': {
				required: true
			}
		},
		errorPlacement: function(error, element) {
			if (element.attr('type') == 'radio' || element.attr('type') == 'checkbox') {
				error.appendTo(element.parent().parent());
			} else {
				error.insertAfter(element);
			}
		}
	});

}).apply(this, [jQuery]);