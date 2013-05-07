SC.initialize({
  client_id: 'b027227c36b9b2baf0cbbc3898599127'
});

//used in html
function generateUsers() {

	  	$(".likeElement").click(function() {
	
			$('#users').html('');
			$('#songs').html('');

			datrurl = "https://api.soundcloud.com/users.json?consumer_key=b027227c36b9b2baf0cbbc3898599127&q=" + $(this).html()
			userQuery(datrurl, '#users')
			generateSongs()

	  	});

}



//used in thing()
function userQuery(qstring, divname) {

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			listofresults = jQuery.parseJSON(xmlhttp.responseText)

			count = 0
			i = 0

			$(divname).append("<ul>")

			if (listofresults.length == 0) {
				s = "<div class='userElement'><li>" + "Sorry, we didn't find an artist related to that like." + "</li></div>"
				$(divname).append(s)
			}
			else {
				while (count < 15 && i < listofresults.length) {

					if (listofresults[i]['playlist_count'] != 0) {
						console.log(listofresults[i])
						perma = listofresults[i]["permalink"]

						userid = listofresults[i]["id"]

						s = "<div class='userElement' id='" + userid + "'><li>" + perma + "</li></div>"

						$(divname).append(s)
						count ++
					}
					else {
						console.log(listofresults[i]['permalink'])
					}
					i ++;

				}
			}

			$(divname).append("</ul>")

		}
		
	}
	
	xmlhttp.open("GET", qstring, false);
	xmlhttp.send();
}




function generateSongs() {
  	$(".userElement").click(function() {
	    $('#songs').html('');

		datrurl = "https://api.soundcloud.com/users/" + $(this).attr('id') + "/tracks.json?consumer_key=b027227c36b9b2baf0cbbc3898599127"

		songQuery(datrurl, '#songs')

		prepareOEmbeds()
  	});

}

function songQuery(qstring, divname) {

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			listofresults = jQuery.parseJSON(xmlhttp.responseText)

			count = 0
			i = 0
			while (count < 5 && i < listofresults.length) {

				if (listofresults[i].length != 0) {

					// console.log(listofresults[i])
					perma = listofresults[i]["permalink"]



					purl = listofresults[i]["permalink_url"]

					s = "<div class='songElement' title='" + purl + "' id='" + perma + "'>" + "</div>"
					$(divname).append(s)
					SC.oEmbed(listofresults[i]["permalink_url"],{"color": "8b9dc3"} , document.getElementById(perma))

					count ++
				}

				i ++;
			}

		}
	}
	
	xmlhttp.open("GET", qstring, false);
	xmlhttp.send();
}

function prepareOEmbeds() {
	$(".songElement").click(function() {
		//may not want to do vvvvthis more than once.
		console.log($(this).attr('title'))
		SC.oEmbed($(this).attr('title'), document.getElementById($(this).attr('id')))


	})
}
