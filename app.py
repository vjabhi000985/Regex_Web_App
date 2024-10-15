from flask import Flask, render_template, request, jsonify
import re

app = Flask(__name__)
app.secret_key = 'xOzF7iHyXjhySAQAYSlrafPvH32b5NwfZyZcZ8P4Ld8'

@app.route('/')
def index():
    return render_template('base.html')

@app.route('/test_regex', methods=['POST'])
def test_regex():
    regex_exp = request.form['regexPattern']
    test_string = request.form['testString']

    try:
        lines = test_string.splitlines()
        matched_results = []

        # Using re.finditer to get match objects
        matches = list(re.finditer(regex_exp, test_string))
        highlighted_string = test_string  # Start with the original string

        for match in matches:
            # Highlight matched words
            matched_word = match.group(0)  # The matched string
            highlighted_string = highlighted_string.replace(matched_word, f'<span style="color: green; font-weight: bold;">{matched_word}</span>', 1)
        
        return jsonify({'highlighted_string': highlighted_string, 'error': None})
    except re.error as e:
        return jsonify({'highlighted_string': None, 'error': str(e)})

@app.route('/validate_email', methods=['POST'])
def validate_email():
    email_id = request.form['email']
    email_regex = r"^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

    is_valid = bool(re.match(email_regex, email_id))
    return jsonify({'valid': is_valid})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)