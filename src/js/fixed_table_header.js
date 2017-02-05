/*
by bLue
Version: 1.0.4
Link: https://github.com/dreamerblue/stepbystep
Last Updated: 02/04/2017
*/

/*
Powered by Mike.Jiang
Originator's Email: dataadapter@hotmail.com
Date: 2012-09-05
Link: http://www.cnblogs.com/dataadapter/archive/2012/09/06/2672190.html
*/

(function ($) {
	$.fn.extend({
		FixedHead: function (options) {
			var op = $.extend({ tableLayout: "auto" }, options);
			return this.each(function () {
				var $this = $(this);
				var $thisParentDiv = $(this).parent();
				$thisParentDiv.wrap("<div class='fixedtablewrap'></div>").parent().css({ "position": "relative" });
				var x = $thisParentDiv.position();
				if($this.attr("id")=="table2")
					$div = "<div id='fixedheadwrap2' class='fixedheadwrap' style='clear: both; overflow: hidden; z-index: 2; position: absolute; border-right: 1px solid #ddd;'></div>";
				else $div = "<div id='fixedheadwrap1' class='fixedheadwrap' style='clear: both; overflow: hidden; z-index: 2; position: absolute;'></div>";
				var fixedDiv = $($div)
					.insertBefore($thisParentDiv)
					.css({ "width": Math.max($thisParentDiv[0].clientWidth, $(this).parent().eq(0).outerWidth()), "left": x.left, "top": x.top });
				var $thisClone = $this.clone(true);
				$thisClone.find("tbody").remove();
				$this.find("thead").remove();
				$thisClone.appendTo(fixedDiv);
				$this.css({ "marginTop": 0, "table-layout": op.tableLayout });
				$thisParentDiv.scroll(function () {
					fixedDiv[0].scrollLeft = $(this)[0].scrollLeft;
				});
				var $fixHeadTrs = $thisClone.find("thead tr");
				var $orginalHeadTrs = $this.find("thead");
				$fixHeadTrs.each(function (indexTr) {
					var $curFixTds = $(this).find("td");
					var $curOrgTr = $orginalHeadTrs.find("tr:eq(" + indexTr + ")");
					$curFixTds.each(function (indexTd) {
						$(this).css("width", $curOrgTr.find("td:eq(" + indexTd + ")").width());
					});
				});
			});
		}
	});
})(jQuery);

$(document).ready(function () {
	$("#table1").FixedHead({ tableLayout: "fixed" });
	$("#table2").FixedHead({ tableLayout: "fixed" });
});
