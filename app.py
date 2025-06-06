from flask import Flask, render_template, request
import os
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('hamjeong.html')

# Slack 버튼이 POST 요청 보내는 대응용 엔드포인트
@app.route('/respond', methods=['POST'])
def respond():
    try:
        payload = request.form.get('payload')  # Slack은 payload라는 key로 JSON 넘김
        if payload:
            data = json.loads(payload)
            user = data.get('user', {}).get('username', 'unknown')
            action_id = data.get('actions', [{}])[0].get('action_id', 'no_action_id')
            print(f"🔔 {user}가 '{action_id}' 버튼을 눌렀습니다.")

            # 액션 ID가 특정 값일 때만 낚시 페이지 띄우기
            if action_id == "alert_response":
                os.system("xdg-open http://localhost:5050")
        else:
            print("❗ payload 없음. Slack에서 온 요청이 아닌 듯.")

    except Exception as e:
        print(f"❌ 예외 발생: {e}")

    return 'OK', 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
