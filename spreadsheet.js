/**
 *  @author 		Wayne T Boka
 *  @lastmodified 	201510291630
 *  @version		0.1.0
 *  @description	Plugin for html based spreadsheets
 *  @website		http://wboka.github.io/spreadsheetJS
 */

(function ($) {
	// Define defaults
	var defaults = {
		columnHeader: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
		columnHeaderIndex: 0,
		rowIndex: 0
	};
	
	// Define available methods
    var methods = {
		// Initialize checkboxes
        init: function(options) {
        	var settings = $.extend(defaults, options);
        	
            return this.each(function () {
            	$(this).append("<thead></thead>");
            	$(this).append("<tbody></tbody>");
            	
            	$("thead", $(this)).append("<tr class='spreadsheet-row'><th>&nbsp;</th><th class='spreadsheet-column'>" + settings.columnHeader[settings.columnHeaderIndex++] + "</th></tr>");
            	$("tbody", $(this)).append("<tr class='spreadsheet-row'><th>" + settings.rowIndex++ + "</th><td><input class='spreadsheet-input' value='' /></td></tr>");
            });
        },
        addRow: function(options) {
        	var settings = $.extend(defaults, options);
        	
        	return this.each(function() {
        		$(this).append("<tr class='spreadsheet-row'><th>" + settings.rowIndex++ + "</th><td><input class='spreadsheet-input' value='' /></td></tr>");
			});
        },
        addColumn: function(options) {
        	var settings = $.extend(defaults, options);
        	
        	return this.each(function() {
        		$("thead tr", $(this)).first().append("<th class='spreadsheet-column'>" + settings.columnHeader[settings.columnHeaderIndex++] + "</th>");
        		$("tbody tr", $(this)).first().append("<td><input class='spreadsheet-input' value='' /></td>");
			});
        },
		destroy: function() {
			return this.each(function() {
			
			});
		}
    };

    $.fn.spreadsheet = function (method, options) {
		// Check if the desired method exists
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        
        return methods['init'].apply(this, Array.prototype.slice.call(arguments, 1));
    };
})(jQuery);
