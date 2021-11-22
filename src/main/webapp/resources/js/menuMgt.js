$(function() {
	attachEvent();
});

var attachEvent = function() {
	$("#plusMenu").click(function() {
		$("#menuDelBtn").hide();
		$("#menuSaveBtn").css("margin-left", "40%");
		$("#menuId, #menuSn").val("");
	});

	$("#menuSaveBtn").click(function() {
		$.ajax({
			url: "/MenuInfo",
			success: function() {
				/*성공했을 때 */
			}
		});
	});
}