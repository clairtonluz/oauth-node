OAuth node
==========

## Authorization code

When using authorization code you need redirect your user to oauth's authorization page with some params. In this page the user will authorizate your application to access user's data. See bellow a example url.


```http
https://auth.clairtonluz.com.br/auth
  ?response_type=code
  &client_id=my_client_id
  &redirect_uri=https://myapp.com/autorization
  &state=1234zyx
  &code_challenge=AMvvsDbkWG96ZYUKLvRPqWP45W2rWFmC8wT_acRccqs
  &code_challenge_method=S256
  &scope=openid profile phone email
```
* **response_type=code** (Required) – indicates that your server expects to receive an authorization code

* **client_id=my_client_id** (Required) – The client ID you received when you first created the application

* **redirect_uri=https://myapp.com/autorization** (Optional if the client has only one registered redirect uri) – Indicates the URL to return the user to after authorization is complete, such as https://myapp.com/autorization

* **state=1234zyx** – A random string generated by your application, which you’ll verify later. This is used to check if the response of authorization code was called by your application.

* **code_challenge=XXXXXXXXX** – The code challenge generated. I will explain how generage this code bellow, but if you wanna test now, you can generage this code through this site: https://tonyxu-io.github.io/pkce-generator/.

* **code_challenge_method=S256** – either plain or S256, depending on whether the challenge is the plain verifier string or the SHA256 hash of the string. If this parameter is omitted, the server will assume plain.

* **scope** – scope requested.

When you redirect user to uri created above, the user will authorize the access e the server will redirect the user to your **redirect_uri** with the **code** and **stage**, then your application will check **stage** to verify if this state is the same **state** created by application. If yes, the application will change the **code** by **access_code** using the process bellow:

#### Code Exchange

```http
POST /token HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Host: localhost
Content-Length: 327

code=OaMoM527Flxtzeqw98Qh8mZv2l9i5n33gbqTgp2z478
&grant_type=authorization_code
&redirect_uri=http://example.local:3000/autorization
&client_id=web_application
&code_verifier=OXqRZcgZ25zKtqM1AjlZoTrRavh126kFCPJakslJSogMnbhXE9Ab0DS85ViphjTvqEOP5jM4nzcsgJOsYXxaJIzwbhFEzmxYgO13vGMbXsJkvxWopzhCqNtDRMkBTMnp
&client_secret=bar
```

## Offline Access (Refresh Token)

If you wanna `refresh token` you need

### The request
1) add `offline_access` in list of scope.
2) add a new param called `prompt` with value = `consent` like this `prompt=consent`

### Server configuration
1) The client's grant type need have `authorization_code` and `refresh_token` like this: `grant_types: ['authorization_code', 'refresh_token']`

2) The client `response_types` with `code` like this: `response_types: ['code']`


With this steps and `authorization flow` steps you will receive `refresh token` with this follow steps below to use `refresh token` to request a new `access token` after your current `access token` expire, independently if the user is online yet.

## Refresh token


## Client credentials

#### Example request
```HTTP
POST /token HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Host: localhost
Content-Length: 90

grant_type=client_credentials&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&scope=openid
```

#### Example response

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNpZy1ycy0wIn0.eyJqdGkiOiJDaFl4bVhIMnBoeW5CbFB2ZG1XSzYiLCJpYXQiOjE1NzU1NzE1MzksImV4cCI6MTU3NTU3MjEzOSwic2NvcGUiOiJvcGVuaWQiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiYXVkIjoiY2xpZW50X2lkIn0.XH4M_jxWxFjWMKEOvET4E6PgxzhBAoeV-xEZc_7E9TY0l764egox1lZ1tOAhG25zCv77bM6jCiIfvhVMIgDap7ZU64kpm6tJkLrJWdXtAvZHEEToAPb72tixZTfAOtijQXhXueMzbBIJT52ytTEXV3i3dVVna7aKdIaEAA2RehTjKYfCQqrcp3PZTaStUnCyhUz6Rxj95T0lqfdwfQ-ASNP9Li-6HPOotBmwsQkMQHS4MSJUkDzPkDuM6vrQExqz1z0La4VHA1_Fw11D2TsVRewg9O3dis6El16s8oyTkNqsYIBIG0Nwu8BkfniDArQ3nNgL6UB-9bbacl9Cr5fJ3A",
  "expires_in": 600,
  "token_type": "Bearer",
  "scope": "openid"
}
```

## Device flow

#### Example request
```HTTP
POST /device/auth HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Host: localhost
Content-Length: 59

client_id=mobile_application
&scope=openid%20profile%20phone
```

#### Example response

```json
{
  "device_code": "OSlHhM2ptpZa-tfZGo94FmIhClTDVQFIplsu2NXupYK",
  "user_code": "MMQH-NCTW",
  "verification_uri": "http://localhost/device",
  "verification_uri_complete": "http://localhost/device?user_code=MMQH-NCTW",
  "expires_in": 600
}
```

Now you need request the user to open the browser and access `verification_uri` and input the `user_code` or access `verification_uri_complete` and confirm the user code.

While that you will repeat the follow request with interval of 5 seconds until your user confirm this code or reject.


#### Example of request token
```HTTP
POST /token HTTP/1.1
Content-Type: application/x-www-form-urlencoded

device_code=OSlHhM2ptpZa-tfZGo94FmIhClTDVQFIplsu2NXupYK
&grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Adevice_code
&client_id=mobile_application
```
#### Example of response token

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNpZy1ycy0wIn0.eyJqdGkiOiJtclphc1hOckZvcE04cDRJMmFZd1QiLCJzdWIiOiJjbGFpcnRvbi5jLmxAZ21haWwuY29tIiwiaWF0IjoxNTc1NTczNDAwLCJleHAiOjE1NzU1NzcwMDAsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgcGhvbmUiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiYXVkIjoibW9iaWxlX2FwcGxpY2F0aW9uIn0.Ncf0u7SSLmS4dg9SqM9Np0AgheH7amIC5mzoGu5nHYE1YD03dVJrPvDKezASdyD4pH8dUxxaUmbr1rc5m4rIbxFdlufGtKhPI_H5AzzOiWKNluvNEHXSGjszuoaioAgaLjfhBvH2G8W7TL007haACGyHfEyvkXCq0Q8Qmloh0BlS3UWw5kQ3nE3yz2KPqPd5JcE4rXznThwAQUIw_U2FkLgAlwLZFnVFxjudF8WxWwuzygLnqXrrdaKsn7LTZGpJ7I8aLjID_fl0KlFMjlgWWXKpAlJ8MNGcfJmqLKzV8USfaTyKNtSwLaEHY0TGwpko98GqLufrPbTwbcwj87QTrQ",
  "expires_in": 3600,
  "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNpZy1ycy0wIn0.eyJzdWIiOiJjbGFpcnRvbi5jLmxAZ21haWwuY29tIiwiYXRfaGFzaCI6ImdRX3pNbkxhaTBxNlFGNlhacEJ2UmciLCJhdWQiOiJtb2JpbGVfYXBwbGljYXRpb24iLCJleHAiOjE1NzU1NzcwMDAsImlhdCI6MTU3NTU3MzQwMCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCJ9.oPD2UP9PKhV8K8zbHyMILWHQG86cC82EhtqR1cLKFCVFaZFEg6wIT2mOmHnpLDEgr8EkUittec6HC5oUkjD3FjNLH7hyTCc79dmyHTUUSJIhckByb32RRoFtMBxfFxdHHTWlcYQxTgwxhelI5NSbdBdgy4Y50GFVrLndH3K4eJaS6GGSsxWhPjCJInXw0erOVruqlFnH8ZJzObf2_8SzN7cpoVfeiOr706dyOgiH48psaDcqXOWijpR_BY8t7OmZDih4Bsjms4S-ClSwttooFCxu3HFMQmC2KGl0v4nIA8tAhYOBV4VuL0U0WuEMaEBElGxQvz2zlj8XvvyMmz8UwQ",
  "scope": "openid profile phone",
  "token_type": "Bearer"
}
```

If the user no accept or reject the code yet, you will receive the response like that:

#### Example of response token while no have authorization by user

```json
{
  "error": "authorization_pending",
  "error_description": "authorization request is still pending as the end-user hasn't yet completed the user interaction steps"
}
```


#### Example of response token when the user abort request

```json
{
  "error": "access_denied",
  "error_description": "End-User aborted interaction"
}
```
