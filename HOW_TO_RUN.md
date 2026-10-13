# How To Run NyayaMitra AI

Run the frontend and backend in separate Windows PowerShell terminals.

## Prerequisites

- Node.js and npm
- Python 3.11
- A Gemini API key

## 1. Configure Gemini

Create `server/.env`:

```dotenv
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=your_configured_model_name
```

Never commit this file or share the API key.

## 2. Start the Backend

From PowerShell:

```powershell
cd C:\Users\deepa\Downloads\NyayaMitra\server
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Backend URLs:

- API: `http://127.0.0.1:8000`
- Swagger docs: `http://127.0.0.1:8000/docs`

Keep this terminal running.

## 3. Start the Frontend

Open a second PowerShell terminal:

```powershell
cd C:\Users\deepa\Downloads\NyayaMitra\client
npm ci
npm run dev
```

Open the application at `http://localhost:5173` and the chat page at `http://localhost:5173/chat`.

## 4. Use the Application

1. Select a response language: English, Telugu, Hindi, Kannada, or Tamil.
2. Ask a legal question in the chat.
3. Upload a legal PDF when you want to add it to the local knowledge base.
4. Use the microphone if browser speech recognition is supported and permission is granted.
5. Review and edit the recognized transcript before sending it.
6. Use Read Aloud, Stop, or Replay for browser speech synthesis.

Speech recognition and voice availability depend on the browser, microphone permissions, operating system, and installed language voices.

## 5. Run Checks

Frontend checks:

```powershell
cd C:\Users\deepa\Downloads\NyayaMitra\client
npm run lint
npm run build
```

Backend checks, with the virtual environment active:

```powershell
cd C:\Users\deepa\Downloads\NyayaMitra\server
python -m py_compile app\main.py app\models\chat_models.py app\routes\chat_routes.py app\routes\document_routes.py app\services\chat_service.py app\services\prompt_service.py app\services\llm_service.py
python test_storage.py
python test_retrieval.py
```

Stop either development server with `Ctrl+C`.

NyayaMitra provides legal information, not guaranteed legal advice or legal representation. Verify important matters with a qualified legal professional and the current law.
