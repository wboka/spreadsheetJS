/**
 *  @author 		Wayne T Boka
 *  @lastmodified 	201510291600
 *  @version		0.2.0
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
        	var settings = $.extend(defaults, options),
        		columnsToAdd = $("th", $("table tr").first()).length - 1;
        	
        	return this.each(function() {
        		rowHTML = "<tr class='spreadsheet-row'><th>" + settings.rowIndex++ + "</th>";
        		
        		rowHTML += methods.addColumns(columnsToAdd);
        		
        		rowHTML += "</tr>";
        		
        		$(this).append(rowHTML);
			});
        },
        addColumn: function(options) {
        	var settings = $.extend(defaults, options),
        		rowsToAdd = $("table tbody tr").length;
        	
        	return this.each(function() {
        		$("thead tr", $(this)).first().append("<th class='spreadsheet-column'>" + settings.columnHeader[settings.columnHeaderIndex++] + "</th>");
        		
        		for (var i = 0; i < rowsToAdd; i++) { 
        			$("tbody tr", $(this)).eq(i).append("<td><input class='spreadsheet-input' value='' /></td>");
        		}
			});
        },
        addColumns: function(numberOfColumns) {
        	var rowHTML = "";
        	
        	for (var i = 0; i < numberOfColumns; i++) {
    			rowHTML += "<td><input class='spreadsheet-input' value='' /></td>";
    		}
        	
        	return rowHTML;
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
