# DiscordMsgPlus
Welcome to the GitHub repo for DiscordMsgPlus — a Messenger Plus!' JScript (not to be confused with JavaScript) script for using the Discord HTTP v9 API. Currently it's in very early development stage, so it is not recommended to use this in production.
# Documentation
## How to load DiscordMsgPlus into your script
It's easy. You need to include this in the very top of your code:
```js
MsgPlus.LoadScriptFile('../DiscordMsgPlus/DiscordMsgPlus.js');
```
Every function will be loaded under the `Discord` object. Keep in mind that the users of your script have to install DiscordMsgPlus.
## `Discord` object
### `Login(Token)`
Save the token into another global variable called `Token`.

Example:
```js
Discord.Login('OTI0MjQ3MDI5Mjc2ODg1MDEy.YcbyHw.KakINtOgx1KpYmL3yx01dk_k_iU');
```
(Don't worry, we'll regenerate every token before posting it here!)
### `GetChannel(Id)`
Gets a channel by id. Returns a channel object.

Example:
```js
var Channel = Discord.GetChannel('932273155496624179');
```
## `Channel` object
### `SendMsg(Msg)`
Sends a message in the current channel.

Example:
```js
Channel.SendMsg('Hello! This message was sended using DiscordMsgPlus.')
```
### `GetMsgs(Amount)`
Gets certain amount of recent messages in the channel. The amount should be an integer from 1 to 100.

Example:
```js
// Prints all latest three messages.
var Msgs = Channel.GetMsgs(3);
Debug.Trace('Latest three messages are:');
for (var i = 0; i < Msgs.length; i++) {
  Debug.Trace(Msgs[i].author.username + ': ' + Msgs[i].content);
}
```
### `SendImg(Txt, Img)`
Sends an image in the channel. `Txt` is a comment to the message, `Img` is the path to it. Keep in mind that this function requires a ImgBB API key, which you can get from [here](https://api.imgbb.com/). To include the key, simply just do:
```js
Discord.ImgBBKey = 'api_key_goes_here';
```
This function actually creaetes an embed with an image URL from ImgBB. It also can only send very small image files, as I'm too lazy to not do it in the GET parameters, eww.

Example:
```js
Discord.ImgBBKey = 'gfjdklgd8zekj3h39frjs8489u89u89s54u894';
Channel.SendImg('Вот случайная картинка по запросу **симпл-димпл**:', 'C:\SimplDimpl.jpg');
```
### Other
The channel object has many more properties! See the [Discord API Docs](https://discord.com/developers/docs/resources/channel#channel-object).
