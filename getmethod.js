// SC.initialize({
//   client_id: 'YOUR_CLIENT_ID'
// });

// $(document).ready(function() {
// 	console.log("ready!")


// })

function SCQuery() 
{
	var querytext = $("#querytext").val();
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			// console.log(xmlhttp.responseText)
			listofresults = jQuery.parseJSON(xmlhttp.responseText)
			// $('#thistext').append($("#specificity").val())
			specificity = $("#specificity").val()
			console.log(specificity)

			// robj = listofresults[0];
			// $('#thistext').html(rtext)
			i = $("#specificity").val() -1

			//go through as many results as were specified.
			while (i > -1) {
				//this isn't the first one... check out what iteration to use.
				perma = listofresults[i]["permalink"]

				permurl = listofresults[i]["permalink_url"]

				imgtg = "<img src='" + listofresults[i].avatar_url + "' height='12px' width='12px'>"
				//make a div for and concatenate each result
				s = "<div id='resultid_" + perma + "'>" + imgtg + "<a href='" + permurl + "'>" + perma + "</a></div>"

				$('#thistext').append(s)
				// console.log(s)
				i --;

			}
			console.log(listofresults)
			//show a link
		}
		else
		{
			console.log("that didn't work.")
		}
	}
	datrurl = "https://api.soundcloud.com/playlists.json?consumer_key=YOUR_CLIENT_ID&q=" + querytext
	xmlhttp.open("GET", datrurl, false);
	xmlhttp.send();
}
