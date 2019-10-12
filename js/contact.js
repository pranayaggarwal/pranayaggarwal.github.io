$(document).ready(function() {

	var form = document.getElementById("contact-form");

    // Success and Error functions for after the form is submitted
    
    function success() {
    	$("#contact-form").trigger('reset');
    	setTimeout(function(){  
    		$("#contactFormSubmit").html("<i class='fa fa-paper-plane'></i><a>Send Message</a>")
    	}, 5000);

    	$("#contactFormSubmit").html("<i class='fa fa-check'></i><a>Done, Thanks!!</a>")
    }

    function error() {
    	$("#contact-form").trigger('reset');
    	setTimeout(function(){  
    		$("#contactFormSubmit").html("<i class='fa fa-paper-plane'></i><a>Send Message</a>")
    	}, 5000);

    	$("#contactFormSubmit").html("<i class='fa fa-times'></i><a>Oops, Error!</a>")
    }

	function ajax(method, url, data, success, error) {
	    var xhr = new XMLHttpRequest();
	    xhr.open(method, url);
	    xhr.setRequestHeader("Accept", "application/json");
	    xhr.onreadystatechange = function() {
	      if (xhr.readyState !== XMLHttpRequest.DONE) return;
	      if (xhr.status === 200) {
	        success(xhr.response, xhr.responseType);
	      } else {
	        error(xhr.status, xhr.response, xhr.responseType);
	      }
	    };
	    xhr.send(data);
	  }


    // handle the form submission event

    // form.addEventListener("submit", function(ev) {
    //   ev.preventDefault();

    // });

	$('#contact-form').submit(function() {
		
		if($('#contact-form').hasClass('clicked')){
				return false;
			}
		
		$('#contact-form').addClass('clicked');
		
		var buttonWidth=$('#contact-form button').width();
		
		var buttonCopy = $('#contact-form button').html(),
			errorMessage = $('#contact-form button').data('error-message'),
			sendingMessage = $('#contact-form button').data('sending-message'),
			okMessage = $('#contact-form button').data('ok-message'),
			hasError = false;
		
		$('#contact-form button').width(buttonWidth);
		$('#contact-form .error-message').remove();
		
		$('.requiredField').each(function() {
			if($.trim($(this).val()) == '') {
				var errorText = $(this).data('error-empty');
				$(this).parents('.field-wrap').append('<span class="error-message" style="display:none;">'+errorText+'.</span>').find('.error-message').fadeIn('fast');
				$(this).addClass('inputError');
				hasError = true;
			} else if($(this).is("input[type='email']") || $(this).attr('name')==='email') {
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,10})?$/;
				if(!emailReg.test($.trim($(this).val()))) {
					var invalidEmail = $(this).data('error-invalid');
					$(this).parents('.field-wrap').append('<span class="error-message" style="display:none;">'+invalidEmail+'.</span>').find('.error-message').fadeIn('fast');
					$(this).addClass('inputError');
					hasError = true;
				}
			}
		});
		
		if(hasError) {
			$('#contact-form button').html('<i class="fa fa-times"></i><a>'+errorMessage+'</a>');
			setTimeout(function(){
				$('#contact-form button').html(buttonCopy);
				$('#contact-form button').width('auto');
				$('#contact-form').removeClass('clicked');
			},2000);
		}
		else {
			$('#contact-form button').html('<i class="fa fa-spinner fa-spin"></i><a>'+sendingMessage+'</a>');
			var data = new FormData(form);
      		ajax(form.method, form.action, data, success, error);

			// var formInput = $(this).serialize();
			// $.post($(this).attr('action'),formInput, function(data){
			// 	$('#contact-form button').html('<i class="fa fa-check"></i><a>'+okMessage+'</a>');
			// 	$('#contact-form')[0].reset();
			// 	setTimeout(function(){
			// 		$('#contact-form button').html(buttonCopy);
			// 		$('#contact-form button').width('auto');
			// 		$('#contact-form').removeClass('clicked');
			// 	},2000);
				
			// });
		}
		
		return false;	
	});
});