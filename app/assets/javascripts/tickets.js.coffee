class @Ticket
	tickets_init: ->
		$('.dest-from-w .i-text').focus ->
			$('.from-suggest').fadeIn('fast')
			return
		$('.dest-from-w .i-text').blur ->
			$('.from-suggest').fadeOut('fast')
			return