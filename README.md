# NyayaMitra AI

NyayaMitra AI is an AI-assisted legal information application for Indian legal documents. It retrieves relevant sections from an indexed local knowledge base, sends the retrieved context and conversation history to Google Gemini, and displays a Markdown answer with citation data.

NyayaMitra is an information tool, not a lawyer. It does not provide guaranteed legal advice, legal representation, or guaranteed outcomes. Always verify important matters with a qualified legal professional and the current law.

## Features

- AI-assisted questions about Indian legal information.
- Google Gemini response generation through the official `google-genai` SDK.
- Retrieval-augmented generation using FAISS and sentence-transformer embeddings.
- Upload, index, list, and delete legal PDF documents.
- Retrieved legal context and backend citation data.
- SQLite conversation history.
- English (India), Telugu, Hindi, Kannada, and Tamil language selection for text responses.
- Browser speech recognition with editable transcripts, where supported.
- Browser speech synthesis with manual Read Aloud, Stop, Replay, and voice-answer playback attempts, where suitable browser voices are installed.
- Markdown answer rendering in the React chat interface.

## Technology Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React Markdown and remark-gfm
- Browser Web Speech Recognition and Speech Synthesis APIs

### Backend

- Python 3.11 is the version used for local verification.
- FastAPI and Uvicorn
- Google Gemini through `google-genai`
- `python-dotenv` for server-side environment loading
- SQLite for conversation messages
- FAISS for vector retrieval
- Sentence Transformers for embeddings and reranking
- PyMuPDF for PDF text extraction

## Project Structure

```text
NyayaMitra/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── chat/
│   │   │   └── welcome/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.ts
├── server/
│   ├── app/
│   │   ├── database/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── legal_documents/
│   ├── storage/
│   │   ├── index.faiss
│   │   ├── metadata.json
│   │   └── document_registry.json
│   ├── requirements.txt
│   └── test_*.py
└── README.md
```

The destination repository also contains its earlier root-level frontend files. The current application is under `client/` and `server/`; the older files are retained to preserve the destination history and existing project files.

Local `.env` files, virtual environments, `node_modules`, caches, and build output are excluded from Git.

## Prerequisites

- Windows PowerShell.
- Node.js and npm. Local verification used Node.js `v24.18.0` and npm `11.16.0`.
- Python 3.11.9 or a compatible Python 3.11 installation.
- A Google Gemini API key with access to the configured model.
- A modern browser such as Chrome or Edge for browser voice features.

The backend dependency file includes the packages required by the current FastAPI, Gemini, FAISS, PDF, embedding, and upload code. Some machine-learning packages download additional model files on first use.

## Clone or Open the Project

To clone the correct repository:

```powershell
git clone https://github.com/deepakMudiraj06/NyayaMitra-.git
cd NyayaMitra-
```

If the project is already present:

```powershell
cd C:\Users\deepa\Downloads\NyayaMitra
```

## Frontend Setup

Open a PowerShell terminal at the project root:

```powershell
cd client
npm ci
npm run dev
```

Vite normally serves the application at:

```text
http://localhost:5173
```

The backend URL is currently configured directly in the frontend services as:

```text
http://127.0.0.1:8000
```

## Backend Setup

Open a second PowerShell terminal:

```powershell
cd C:\Users\deepa\Downloads\NyayaMitra\server
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

The FastAPI application is available at:

```text
http://127.0.0.1:8000
```

Interactive API documentation is available at:

```text
http://127.0.0.1:8000/docs
```

Start the backend from the `server` directory because the current document and FAISS storage services use relative `legal_documents` and `storage` paths.

Press `Ctrl+C` in each terminal to stop the frontend and backend development servers.

## Gemini API Configuration

Create `server/.env` locally. Never commit this file:

```dotenv
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=your_configured_model_name
```

The backend resolves `server/.env` from the service file location and does not print the API key. `GEMINI_MODEL` is required for every `LLMService` initialization.

The root and server ignore rules exclude `.env` files. Treat API keys as secrets and do not paste them into source code, issues, logs, screenshots, or README files.

## Running the Full Application

1. Start the backend in the `server` terminal.
2. Start the frontend in the `client` terminal.
3. Open `http://localhost:5173`.
4. Open the chat screen at `http://localhost:5173/chat`.

The frontend sends chat requests to `http://127.0.0.1:8000/chat`. The backend exposes document endpoints under `/documents` and conversation endpoints under `/chat`.

## Using the Application

1. Open the chat page.
2. Select English (India), Telugu, Hindi, Kannada, or Tamil from the language selector.
3. Type a legal question and submit it, or use the microphone where browser recognition is available.
4. Review and edit a recognized transcript before submitting it.
5. Read the Markdown answer and any available legal reference information.
6. Use the speaker control for manual Read Aloud, Stop, and Replay.
7. Upload a PDF from the upload controls when you want it included in the local legal knowledge base.

Browser speech support depends on the browser, operating system, microphone permissions, network behavior, and installed language voices. A missing Telugu, Hindi, Kannada, or Tamil voice does not prevent the written answer from appearing.

## API Endpoints

- `POST /chat`
- `POST /chat/reset`
- `GET /chat/conversations`
- `DELETE /chat/{conversation_id}`
- `POST /documents/upload`
- `GET /documents`
- `DELETE /documents/{filename}`

## Running Tests and Checks

From `client`:

```powershell
npm run lint
npm run build
```

From `server`, with the virtual environment active:

```powershell
python -m py_compile app\main.py app\models\chat_models.py app\routes\chat_routes.py app\routes\document_routes.py app\services\chat_service.py app\services\prompt_service.py app\services\llm_service.py
python test_storage.py
python test_retrieval.py
```

The repository contains standalone exploratory scripts such as `test_indexing.py` and `test_llm.py`. Inspect each script before running it. Some require local model files, modify or rebuild local indexes, prompt for input, or make a live Gemini request. The project does not currently define a pytest test suite.

## Troubleshooting

### Gemini configuration errors

Confirm that `server/.env` exists and contains both `GEMINI_API_KEY` and `GEMINI_MODEL`. Restart Uvicorn after changing the file. The key must not be included in error reports.

### Frontend cannot reach the backend

Confirm that Uvicorn is running on `127.0.0.1:8000` and that the frontend is running on port `5173`. Check the browser Network panel for the failing request and the FastAPI terminal for sanitized errors.

### Missing npm modules

Run the install from the `client` directory:

```powershell
npm ci
```

Do not mix package managers or delete the lockfile.

### Microphone permission denied

Allow microphone access for the local site in the browser settings. If speech recognition is unsupported, continue using ordinary text input.

### No voice for a selected language

Install or enable a suitable operating-system speech voice, then reload the browser. Browser speech synthesis reports different locale values, and some systems do not provide voices for every Indian language. The application keeps the written answer available when no suitable voice exists.

### Python or model dependency problems

Activate the server virtual environment and reinstall from `requirements.txt`. The embedding and reranking services may download model files on first use and therefore require network access.

### Build or type-check errors

Run `npm run lint` and `npm run build` separately. Read the first reported source file and line rather than suppressing the error globally. Keep generated folders and local environments out of Git.

## Security and Limitations

- Keep `server/.env` private and never commit API keys.
- The application provides legal information, not guaranteed legal advice.
- Retrieved citations depend on the uploaded and indexed documents.
- Browser voice recognition and synthesis are optional browser enhancements.
- Installed speech voices and locale support vary by operating system and browser.
- The current frontend and backend are configured for local development and should receive additional security review before public deployment.

## License and Contributions

No license file or explicit open-source license was found in the repository. Do not assume that the project is licensed for redistribution.

For changes, inspect the current worktree, run the relevant checks, avoid committing secrets or generated local data, and describe any browser- or credential-dependent verification limits.
