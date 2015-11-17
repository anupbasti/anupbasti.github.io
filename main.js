$(function () {

var $user = $('#username');
var $pass = $('#password');
var $guests = $('#guests');

$('#sub').on('click', function(){
 
 var order = {
	name: $user.val(),
	drink: $pass.val(),
 };
 
 $.ajax({
    type: 'POST',
	url: 'http://demo4707540.mockable.io/submit',
	data: order,
	success: function(data){
		alert('Login Successful');
		
	
	},
	
	error: function(){
		alert('Cannot Login');
	}
	
 
 });

});

var guestTemplate = "" +
"<tr>"+
"<td></td>"+
"<td>{{fname}}</td>"+
"<td>{{lname}}</td>"+
"<td>{{phone}}</td>"+
"<td>{{limit}}</td>"+
"</tr>";




function addGuests(guest){
	$guests.append(Mustache.render(guestTemplate,guest));
}

$.ajax({
	type: 'GET',
	url: 'http://demo4707540.mockable.io/order',
	success: function(guests) {
		$.each(guests, function(i, guest){
			addGuests(guest);
		});
	},
	error: function(){
		alert('Error Loading Page');
	}

});


/*

$ord.delegate('.remove', 'click', function() {
	var $li = $(this).closest('li');
	$.ajax({
	type: 'DELETE',
	url: 'http://demo4707540.mockable.io/del',
	
	success: function(){
			$li.fadeOut(300, function() {
			remove();
			});
	}
	
	});
});
*/
});
