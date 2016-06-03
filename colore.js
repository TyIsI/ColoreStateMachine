function ColoreStateMachine() {
	var self = this;
	this.context = "";
	this.contexts = [];
	this.settings = [];
	
	this.init = function() {
		$(document).ready(function() {
			$(window).on('hashchange', function() {
				var hash = location.hash.substring(1);
				self.loadContext( hash );
			});
		});
	}

	this.addContext = function( context, handler ) {
		this.contexts[context] = handler;
	}

	this.loadContext = function( context ) {
		if( this.contexts[context] !== undefined ) {
			this.context = context;
			this.contexts[context]();
		} else {
			console.log( "Colore: Missing context" );
		}
	}
	
	this.setDefaultContext = function( context ) {
		this.settings['default'] = context;
		if( this.context == "" ) {
			this.go( context );
		}
	}
	
	this.go = function( context ) {
		location.hash = context;
	}
	
	this.init();
}