$headers = @{
    "Content-Type" = "application/json"
}

$body = @{
    "username" = "abuahmed1"
    "email" = "abuahmed0821@gmail.com"
    "password1" = "complexpassword123"
    "password2" = "complexpassword123"
} | ConvertTo-Json

Invoke-WebRequest -Uri 'http://localhost:8000/api/register/' -Method POST -Headers $headers -Body $body

$headers = @{
    "Content-Type" = "application/json"
}

$body = @{
    "username" = "abuahmed1"
    "email" = "abuahmed0821@gmail.com"
    "password" = "complexpassword123"
} | ConvertTo-Json

Invoke-WebRequest -Uri 'http://localhost:8000/api/login/' -Method POST -Headers $headers -Body $body