

$(function () {

//Variables for login page
var $user = $('#username');
var $pass = $('#password');
var $userid = localStorage.getItem("userid");


//Variables for guest list page
var $guests = $('#guests');
var $events = $('#events');

//Variables for add event page
var $ename = $('#Event');
var $dj = $('#DJ');
var $limit = $('#Limit');
var $fee = $('#Fee');
var $edate = $('#date_foo');
var $deadline = $('#myTime');
var $club = $('#Club');
var $banner = $('#fileupload');

//Variables for contact us page
var $cname= $('#name');
var $cemail= $('#email');
var $cphone= $('#web');
var $cquery= $('#query');


//login
$('#sub').on('click', function(){

 var login = {
	user: $user.val(),
	pass: $pass.val(),
	userid: $userid
 };
 
 $.ajax({
    type: 'POST',
	url: 'https://demo4707540.mockable.io/submit',
	data: login,
	success: function(data){		
			if($user.val()== data["username"]  &&  $pass.val() == data["password"])
			{
				if (typeof(Storage) !== "undefined") {		
			
					if(localStorage.getItem("userid")== null || data["userid"] != $userid ){
						//alert('new user');
						suserid = data["userid"];
						alert(suserid);
						localStorage.setItem("userid", data["userid"]);
						location.href = "dashboard.html";
					}
					else {
							if(data["userid"] == $userid){
							location.href = "dashboard.html";
							}
					}	
				}
				else{
					alert("Sorry, your browser does not support Web Storage...");
					location.href = "dashboard.html";
				}
			}
			else
			{
				alert('Incorrect username/password');
			}		
	
	},
	
	error: function(){
		alert('Cannot Login');
	}
	
 
 });

});

//Add Events

$('#ebutton').on('click', function(e){
	e.preventDefault();
 
 var allevents = {
	ename: $ename.val(),
	dj:  $dj.val(),
	limit:  $limit.val(),
	fee : $fee.val(),
	edate: $edate.val(),
	deadline:  $deadline.val(),
	club: $club.val(),
	banner : $banner.val()

 };
 
 $.ajax({
    type: 'POST',
	url: 'https://demo4707540.mockable.io/addevents',
	data: allevents,
	success: function(data){		
			if(data["id"] == 1)
			{
				alert('Event successfully added to your dashboard');
				location.href = "dashboard.html";
			}
			else
			{
				alert('Event not added to your dashboard');
			}		
	
	},
	
	error: function(){
		alert('Cannot contact our server at this moment');
	}	
 
 });

});


//Edit Events

$.ajax({
	type: 'GET',
	url: 'https://demo4707540.mockable.io/dashedit',
	success: function(data) {
			var eventid = $("#eventid").val();				
			if(eventid != 'undefined' && eventid==data["id"])
			{
				$('form').loadJSON(data);
			}
	},
	error: function(){
		alert('Error Loading Page');
	}

});


//Contact us

$('#cbutton').on('click', function(e){
	e.preventDefault();
	 
 var allcontacts = {
	cname: $cname.val(),
	cemail: $cemail.val(),
	cphone:  $cphone.val(),
	cquery:  $cquery.val()
	
 };
 
 $.ajax({
    type: 'POST',
	url: 'http://demo4707540.mockable.io/submit',
	data: allcontacts,
	success: function(data){
		  if(data["id"] == 1)
			{
				alert('We will get back to you shortly');
			}
			else
			{
				alert('Query not submitted');
			}		
	
	},
	
	error: function(){
		alert('Cannot contact our server at this moment');
	}
	
 
 });

});



// Guestlist
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

//Dashboard - Display/Edit Events

var eventTemplate = "" +
"<tr>"+
"<td><a href=event.html?id={{id}} id='edit'>Edit</a>/<a href=# data-id='{{id}}' class='remove'>Del</a></td>"+
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


//Delete Events

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

$("#time").timepicki();



});


//function to fetch id from URL 
function GetURLParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return decodeURIComponent(sParameterName[1]);
        }
    }
}

function checkid()
{
	var id = GetURLParameter('id');	
	if(id!='')
	{
	document.getElementById('eventid').value = id;
	}
}

function deluser()
{
	//alert('delete');
	localStorage.removeItem("userid");
	
	
}


