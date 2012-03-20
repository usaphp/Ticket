class @Ticket
	tickets_init: ->
		$('.dest-input').focus ->
			if $(this).val() == $(this).data('placeholder')
				$(this).val('')
			$(this).nextAll('.suggest-w').fadeIn('fast')
			return
		$('.dest-input').blur ->
			if $(this).val() == ''
				$(this).val($(this).data('placeholder'))
			$(this).nextAll('.suggest-w').fadeOut('fast')
			return
		$('.days-w .day').click ->
			from = $('#hid_date_from').val()
			to = $('#hid_date_to').val()
			active = $('#hid_date_active').val()
			day = $(this).data('day-id')
			day_name = $(this).data('day-name')
			$('#hid_date_' + active).val(day)
			if active == 'from'
				$('.days-w .day').removeClass('selected').removeClass('from').removeClass('to')
				$('#hid_date_to').val('')
				$('#hid_date_from').val(day)
				$('#hid_date_active').val('to')
				$('.day[data-day-id='+day+']').addClass('selected').addClass('from')
				$('#date-from-tag').text(day_name)
				$('.date-from-w').fadeIn()
				$('.date-to-w').fadeOut()
				$('.way-select').removeClass('off').removeClass('on')
				$('.way-select.one-way').addClass('on')
				$('.way-select.two-way').addClass('off')
			else
				for i in [from..day]
					$('.days-w .day[data-day-id='+i+']').addClass('selected')
				$('.days-w .day[data-day-id='+from+']').addClass('from')
				$('.days-w .day[data-day-id='+day+']').addClass('to')
				$('#hid_date_to').val(day)
				$('#hid_date_active').val('from')
				$('#date-to-tag').text(day_name)
				$('.date-to-w').fadeIn()
				$('.way-select').removeClass('off').removeClass('on')
				$('.way-select.two-way').addClass('on')
				$('.way-select.one-way').addClass('off')
			return false
		$('.way-select.one-way.off').live 'click', (event) ->
			from = $('#hid_date_from').val()
			$('.days-w .day[data-day-id='+from+']').click()
			return false