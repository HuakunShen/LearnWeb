# Browser Storage

## Overview

- Cookies
- Local Storage
- Session Storage

All data are stored in client browser.

|                    | Cookies            | Local Storage | Session Storage |
| ------------------ | ------------------ | ------------- | --------------- |
| Capacity           | 4kb                | 10mb          | 5mb             |
| Browsers           | HTML4/HTML5        | HTML5         | HTML5           |
| Accessible From    | Any Window         | Any Window    | Same Tab        |
| Expires            | Manually Set       | Never         | On Tab Close    |
| Storage Location   | Browser and Server | Browser Only  | Browser Only    |
| Sent with Requests | Yes                | No            | No              |

These data can be found in **Application** tab of Dev Tools of a Browser.

## Cookies

[MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)

Cookies are sent to server every time a request is made, that's why it's small comparing to the other 2.

`cookies` are set by `document.cookie=...`, when new cookies are added, the old ones are not overriden.

```javascript
document.cookie = "name=xxx; expires=" + new Date(2020, 0, 1).toUTCString(); // expires on 2020/1/1
document.cookie = "name=yyy; expires=" + new Date(9999, 0, 1).toUTCString(); // never expires with a large date
```

To view cookies, we can only see all cookies and parse the string manually (use a packge to do this).

```javascript
document.cookie;
```

## Local Storage

[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

Stored as key value pairs where both key and value are string.

```js
localStorage.setItem(key, value);
localStorage.getItem(key);
localStorage.removeItem(key);
```

Data persist when a tab is closed or browser restarts.

## Session Storage

[MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/sessions)

Works exactly the same as Local Storage.

```js
sessionStorage.setItem(key, value);
sessionStorage.getItem(key);
sessionStorage.removeItem(key);
```

Data lost after tab is closed or browser closed.

## Reference

### Video

[JavaScript Cookies vs Local Storage vs Session](https://youtu.be/GihQAC1I39Q)

### Documentation

[Cookies MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)

[Local Storage MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

[Session Storage MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/sessions)
