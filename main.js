function drawBalance(xml)
{
	try
	{
		var rub;
		{		
			var balance = $("balance", xml);
			if (balance.length)
			{
				var date = new Date();
				var strDate = date.toLocaleDateString() + " "+date.toLocaleTimeString();
				outDate = strDate.substring(0,16);
				$('#date').text(outDate);
				rub = parseFloat(balance[0].textContent).toFixed(2);
				if (typeof (GMButton) == "undefined")
				{
					rub_int = parseInt(balance[0].textContent);
					opera.extension.postMessage(rub_int);
					opera.extension.postMessage("seticon");
				}
				else
				{
					GMButton.badge.textContent = rub_int;
					GMButton.icon = "/images/icon.png";
				}			
				$('#balance').text(rub+'р.');	
			}
			if ($('#extentionContent').length)
			{
				var debetBound = $("debetBound", xml);
				if (debetBound.length)
				{
					$('#debetBound').text(debetBound[0].textContent+ 'р.');
				}

				var days2BlockStr = $("days2BlockStr", xml);
				if (days2BlockStr.length)
				{
					$('#days2BlockStr').text(days2BlockStr[0].textContent);
				}
			
			
				var contractId = $("contractId", xml);
				if (contractId.length)
				{
					$('#contractId').text(contractId[0].textContent);
				}
			
				var promisedPayment = $("promisedPayment", xml);
				if (promisedPayment.length)
				{
					var isOpen = promisedPayment.find("isOpen");
					if (isOpen.length && isOpen[0].textContent == "1")
					{
						opera.extension.postMessage("big");
						$('#debet').get(0).style.display = '';
					}
					else
					{
						opera.extension.postMessage("small");
						$('#debet').get(0).style.display = 'none';
					}
				}
		
				var name = $("name", xml);
				if (name.length)
				{			
					var reg = /(\D+)\s(\D+)\s(\D+)/;
					var arr = reg.exec(name[0].textContent);
				
					var text = $('#first_name')[0].childNodes;
					text[0].nodeValue = arr[1];
					text[2].nodeValue = arr[2];
					text[4].nodeValue = arr[3];
				}
			}		
		}
	if (rub)
		return true;
	}
		
	catch (err)
	{
	}
	
	return false;
}

function draw()
{	
	var xmlhttp = new XMLHttpRequest();
	
	var login = localStorage.getItem(1);
	var password = localStorage.getItem(2);	
	{
		var apiUrl = "https://api.novotelecom.ru/billing/?" +
            "method=userInfo&login=" + login + "&passwordHash=" + password +
            "&clientVersion=2";
		xmlhttp.open('GET', apiUrl, true);
		//xmlhttp.open('POST', 'https://billing.novotelecom.ru/billing/user/api/?method=userInfo&login='+login+'&password=' + password, true);
		xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
		xmlhttp.setRequestHeader("Connection", "close");		
		xmlhttp.send(null);

		xmlhttp.onreadystatechange = function() 
		{
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
				if (!drawBalance(xmlhttp.responseXML)){	
					
					opera.extension.postMessage("FAIL");
					if ($('#extentionContent').length)
					{
						opera.extension.postMessage("message");
						$('#extentionContent').get(0).style.display = 'none';
						$('#message').get(0).style.display = '';
						$('#message').text(strings.connectError);
					}			
				}
				else{
					if ($('#extentionContent').length)
					{
						$('#extentionContent').get(0).style.display = '';
						$('#message').get(0).style.display = 'none';
					}
				}
		}
	}
}

function initSettings() {
	if (localStorage.getItem(1) == undefined)
		localStorage.setItem(1, "");
	if (localStorage.getItem(2) == undefined)
		localStorage.setItem(2, "");

	var login = localStorage.getItem(1);
	var password = localStorage.getItem(2);	
	
	if(login == '' || password == '') {
		{
			if ($('#extentionContent').length)
			{
				opera.extension.postMessage("message");
				$('#extentionContent').get(0).style.display = 'none';
				$('#message').text(strings.inputLogin);
				$('#message').get(0).style.display = 'inline-block';
			}
		}			
	}
	else{
		if ($('#extentionContent').length)
		{
			opera.extension.postMessage("message");
			$('#extentionContent').get(0).style.display = 'none';
			$('#message').text(strings.connecting);
			$('#message').get(0).style.display = '';
		}
            draw();
	}
}