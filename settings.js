
function settingsSave() {	
	// убираем выделение ошибок
	$('.error').removeClass('error');
	
	if(!$('#login').val()){
		event.cancel = true;
				
		// показываем ошибку
		$('#login').addClass('error');
	}
	
	if (!$('#password').val()){
		event.cancel = true;
		
		// показываем ошибку
		$('#password').addClass('error');			
	}
	
	if(!event.cancel) {
		localStorage.setItem(1, $('#login').val());
		localStorage.setItem(2, hex_md5($('#password').val()));
	}

	document.getElementById("save-button").disabled = true;

	initSettings(); 
	//var option_window = opera.extension.tabs.getFocused();
	//opera.postError(option_window);
	//opera.extension.tabs.close(option_window);
}

function settingsChange()
{
	document.getElementById("save-button").disabled = false;
}

function settingsCancel()
{
	main();
}

function main() {
	// считываем старые значения настроек и показываем их в форме
	if (localStorage.getItem(1) == undefined)
		localStorage.setItem(1, "");
	if (localStorage.getItem(2) == undefined)
		localStorage.setItem(2, "");
	var login = localStorage.getItem(1);
	var password = localStorage.getItem(2);
	$('#login').val(login);
	$('#password').val(password);
	
	document.getElementById("save-button").disabled = true;
}

$(document).ready(main);