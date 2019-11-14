OAuth node
==========

#### Authorization code
```http
http://localhost:3000/auth?
  client_id=your_client_id
  &redirect_uri=http://example.com/autorization
  &response_type=code
  &scope=openid profile
  &nonce=123
  &state=321
```
