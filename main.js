$(function () {

var $user = $('#username');
var $pass = $('#password');
var $guests = $('#guests');
var $events = $('#events');
var $ename= $('Event');
var $dj= $('DJ');
var $limit= $('Limit');
var $edate= $('date_foo');
var $deadline= $('myTime');
var $club= $('Club');
var $banner= $('fileupload');

$('#sub').on('click', function(){
 
 var login = {
	user: $user.val(),
	pass: $pass.val(),
 };
 
 $.ajax({
    type: 'POST',
	url: 'https://demo4707540.mockable.io/submit',
	data: login,
	success: function(data){
		$.each(data, function(i, ele){
			if(ele == 1)
			{
				location.href = "dashboard.html";
			}
			else
			{
				alert('Incorrect username/password');
			}
		});
		
		
		
	
	},
	
	error: function(){
		alert('Cannot Login');
	}
	
 
 });

});


$('#button').on('click', function(){
 
 var allevents = {
	ename: $ename.val();
	dj:  $dj.val();
	limit:  $limit.val();
	edate: $edate.val();
	deadline:  $deadline.val();
	club: $club.val();
	banner: $banner.val();
 };
 
 $.ajax({
    type: 'POST',
	url: 'https://demo8492314.mockable.io/addevents',
	data: allevents,
	success: function(data){
		$.each(data, function(i, ele){
			if(ele == 1)
			{
				alert('Event successfully added to your dashboard');
			}
			else
			{
				alert('Incorrect username/password');
			}
		});
		
		
		
	
	},
	
	error: function(){
		alert('Cannot Login');
	}
	
 
 });

});


/* to pre populate form data when click on Edit

$('#event').on('click', function(){
	echo('success');
  
 $.ajax({
	
	 
    type: 'GET',
	url: 'http://demo4707540.mockable.io/dash',
	success: function(data){
		//$('form').loadJSON(data);
		echo('success');
		
	
	},
	
	error: function(){
		alert('Cannot Load Data');
	}
	
 
 });

});

*/

var guestTemplate = "" +
"<tr>"+
"<td></td>"+
"<td>{{fname}}</td>"+
"<td>{{lname}}</td>"+
"<td>{{phone}}</td>"+
"<td>{{limit}}</td>"+
"</tr>";

var eventTemplate = "" +
"<tr>"+
"<td><a href=event.html id='edit'>Edit</a>/<a href=# data-id='{{id}}' class='remove'>Del</a></td>"+
//"<td><button data-id='{{id}}' class='remove'>Edit</button><br/><br/><button data-id='{{id}}' class='remove'>Delete</button></td>"+
"<td>{{event}}</td>"+
"<td>{{dj}}</td>"+
"<td>{{limit}}</td>"+
"<td>{{fee}}</td>"+
"<td>{{datetime}}</td>"+
"<td>{{deadline}}</td>"+
"<td>{{clubid}}</td>"+
"<td><img src={{banner}} width=120px height=90px></td>"+
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

function addEvents(event){
	$events.append(Mustache.render(eventTemplate,event));
}

$.ajax({
	type: 'GET',
	url: 'http://demo4707540.mockable.io/dashboard',
	success: function(events) {
		$.each(events, function(i, event){
			addEvents(event);
		});
	},
	error: function(){
		alert('Error Loading Page');
	}

});




$events.delegate('.remove', 'click', function() {
	var $tr = $(this).closest('tr');
	$.ajax({
	type: 'DELETE',
	url: 'http://demo4707540.mockable.io/del',
	
	success: function(){
			$tr.fadeOut(300, function() {
			remove();
			});
	}
	
	});
});

});
