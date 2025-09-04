from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
import json
import uvicorn

app = FastAPI(title="StudySmart API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with actual frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files (JSON data)
app.mount("/data", StaticFiles(directory="/app/data"), name="data")

@app.get("/")
async def root():
    return {"message": "StudySmart API is running"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "StudySmart API is running"}

@app.get("/api/questions/{subject}")
async def get_questions(subject: str):
    """Get questions for a specific subject"""
    try:
        file_path = f"/app/data/final_{subject}.json"
        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail=f"Subject '{subject}' not found")
        
        with open(file_path, 'r') as f:
            data = json.load(f)
        
        return data
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"Subject '{subject}' not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error reading question data")

@app.get("/api/subjects")
async def get_subjects():
    """Get list of available subjects"""
    subjects = []
    data_dir = "/app/data"
    
    if os.path.exists(data_dir):
        for filename in os.listdir(data_dir):
            if filename.startswith("final_") and filename.endswith(".json"):
                subject = filename.replace("final_", "").replace(".json", "")
                subjects.append(subject)
    
    return {"subjects": subjects}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)