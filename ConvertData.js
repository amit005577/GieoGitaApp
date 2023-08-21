let translation = {
    "success": true,
    "data": [
        {
            "id": 7,
            "code": "in",
            "key": "test-1",
            "value": "परीक्षा"
        },
        {
            "id": 12,
            "code": "in",
            "key": "app_submit",
            "value": "जमा करना"
        },
        {
            "id": 25,
            "code": "in",
            "key": "app-bhagavad-heading",
            "value": "जमा करना"
        },
        {
            "id": 26,
            "code": "in",
            "key": "Log in",
            "value": "Log in"
        },
        {
            "id": 27,
            "code": "in",
            "key": "email",
            "value": "email"
        },
        {
            "id": 28,
            "code": "in",
            "key": "Password",
            "value": "Password"
        },
        {
            "id": 29,
            "code": "in",
            "key": "Remember Me",
            "value": "Remember Me"
        },
        {
            "id": 30,
            "code": "in",
            "key": "SIGN IN",
            "value": "SIGN IN"
        },
        {
            "id": 31,
            "code": "in",
            "key": "gieo-gita-app",
            "value": "जीआईईओ गीता ऐप"
        },
        {
            "id": 33,
            "code": "in",
            "key": "dipan",
            "value": "दीपन"
        }
    ],
    "message": "Show all values.",
    "status": 200
}

var arr = translation.data
var result = {};
for (var i=0, len=arr.length; i < len; i++) {
    result[arr[i].key] = arr[i].value;
}

console.log(result);