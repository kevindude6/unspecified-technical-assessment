**All APIs should return either of the two following formats**
```json
{
  "success": true,
  "data": object,
  "message": string
}
```
or
```json
{
  "success": false,
  "error": string
}
```
**All APIs that consume json must be validated using arktype