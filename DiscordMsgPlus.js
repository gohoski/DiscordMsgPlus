var WinHttpRequest = new ActiveXObject('WinHttp.WinHttpRequest.5.1'); // ActiveX object for HTTP requests
var Token;
var Discord = new Object();

Discord.Login = function (T) {
	Token = T; // Saving the token
}

Discord.GetChannel = function (Id) {
	WinHttpRequest.Open('GET', 'https://discord.com/api/v9/channels/' + Id, false); // Opening a request to get a channel
	WinHttpRequest.SetRequestHeader('User-Agent', 'DiscordMsgPlus');
	WinHttpRequest.SetRequestHeader('Authorization', 'Bot ' + Token);
	WinHttpRequest.Send(); // Sending it
	eval('Channel = ' + WinHttpRequest.ResponseText); // Parsing JSON
	Channel.SendMsg = function (Msg) {
		WinHttpRequest.Open('POST', 'https://discord.com/api/v9/channels/' + Id + '/messages', false);
		WinHttpRequest.SetRequestHeader('User-Agent', 'DiscordMsgPlus');
		WinHttpRequest.SetRequestHeader('Authorization', 'Bot ' + Token);
		WinHttpRequest.SetRequestHeader('Content-Type', 'application/json');
		WinHttpRequest.Send('{"content":"' + Msg + '"}');
	}
	Channel.GetMsgs = function (Amount) {
		if (Amount > 100 || Amount < 1) {
			throw new Error(1, 'Amount should be in between 1-100');
		}
		WinHttpRequest.Open('GET', 'https://discord.com/api/v9/channels/' + Id + '/messages?limit=' + Amount, false);
		WinHttpRequest.SetRequestHeader('User-Agent', 'DiscordMsgPlus');
		WinHttpRequest.SetRequestHeader('Authorization', 'Bot ' + Token);
		WinHttpRequest.SetRequestHeader('Content-Type', 'application/json');
		WinHttpRequest.Send();
		eval('Msgs = ' + WinHttpRequest.responseText);
		return Msgs;
	}
	Channel.SendImg = function (Txt, Img) {
		if (Discord.ImgBBKey == null) {
			throw new Error(2, 'No ImgBB API key provided');
		}
		WinHttpRequest.Open('POST', 'https://api.imgbb.com/1/upload?key=' + Discord.ImgBBKey + '&image=' + ConvertImageToBase64(Img), false);
		WinHttpRequest.SetRequestHeader('Content-Type', 'application/json')
		WinHttpRequest.Send();
		if (WinHttpRequest.ResponseText.indexOf('<html>') != -1) {
			throw new Error(3, 'Image too big. Only files under ~3 KB work')
		}
		eval('Response = ' + WinHttpRequest.ResponseText);
		WinHttpRequest.Open('POST', 'https://discord.com/api/v9/channels/' + Id + '/messages', false);
		WinHttpRequest.SetRequestHeader('User-Agent', 'DiscordMsgPlus');
		WinHttpRequest.SetRequestHeader('Authorization', 'Bot ' + Token);
		WinHttpRequest.SetRequestHeader('Content-Type', 'application/json');
		WinHttpRequest.Send('{"content":"' + Txt + '","embeds":[{"image":{"url":"' + Response.data.url + '"}}]}');
	}
	return Channel;
}

function ConvertImageToBase64(filePath) {
	var inputStream = new ActiveXObject('ADODB.Stream');
	inputStream.Open();
	inputStream.Type = 1;  // adTypeBinary
	inputStream.LoadFromFile(filePath);
	var bytes = inputStream.Read();
	var dom = new ActiveXObject('Microsoft.XMLDOM');
	var elem = dom.createElement('tmp');
	elem.dataType = 'bin.base64';
	elem.nodeTypedValue = bytes;
	var ret = encodeURIComponent(elem.text.replace(/[^A-Z\d+=\/]/gi, ''));
	return ret;
}

Discord.ImgBBKey == null;