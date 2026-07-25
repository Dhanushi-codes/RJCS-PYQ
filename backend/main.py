from fastapi import FastAPI

app = FastAPI(
    title="RJCS-PYQ",
    description="An intelligent topic-based Previous Year Question retrieval and analysis system for Computer Science students.",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "Welcome to RJCS-PYQ",
        "status": "Backend is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }