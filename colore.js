function ColoreStateMachine() {
	var self = this;
	this.context = "";
	this.contexts = [];
	this.settings = [];
	
	this.init = function() {
		$(document).ready(function() {
			$(window).on('hashchange', function() {
				self.update();
			});
			self.update();
		});
	}
	
	this.getHash = function() {
		var hash = location.hash;
		
		if( hash == '' )
			return false;
		
		if( hash.substring(0,1) == '\?' )
			hash = hash.substring(1);
		
		if( hash.substring(0,1) == '#' )
			hash = hash.substring(1);
		
		return hash;
	}

	this.addContext = function( context, handler ) {
		this.contexts[context] = handler;
	}

	this.loadContext = function( context ) {
		if( this.contexts[context] !== undefined ) {
			console.log( "ColoreStateMachine.loadContext: Loading '" + context + "'" );
			this.context = context;
			this.contexts[context]();
		} else {
			console.log( "ColoreStateMachine.loadContext: Missing context '" + context + "'" );
		}
	}
	
	this.setDefaultContext = function( context ) {
		console.log( "ColoreStateMachine.setDefaultContext: " + context );
		this.settings['default'] = context;
	}
	
	this.go = function( context ) {
		location.hash = context;
	}
	
	this.update = function() {
		var hash = this.getHash();
		
		console.log( "ColoreStateMachine.update: Detecting context: [" + hash + "]" );
		
		if( hash != false ) {
			this.loadContext( hash );
		} else if( this.context == "" ) {
			this.go( this.settings['default'] );
		}

	}
	
	this.init();
}