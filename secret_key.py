import os
import base64

def generate_secret_key(length=32):
    # Generate random bytes and encode them to URL-safe base64
    random_bytes = os.urandom(length)
    secret_key = base64.urlsafe_b64encode(random_bytes).decode('utf-8').rstrip('=')
    return secret_key

# Generate and print the secret key
print(generate_secret_key())