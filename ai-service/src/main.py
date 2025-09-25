from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import TruncatedSVD
import redis
import json
from typing import List, Optional
import os

app = FastAPI(title="Qwipo AI Recommendations", version="1.0.0")

# Redis for caching
redis_client = redis.Redis(host=os.getenv('REDIS_HOST', 'localhost'), port=6379, decode_responses=True)

class RecommendationRequest(BaseModel):
    userId: str
    category: Optional[str] = None
    limit: int = 10

class RecommendationResponse(BaseModel):
    recommendations: List[str]
    algorithm: str
    confidence: float

class RecommendationEngine:
    def __init__(self):
        self.user_item_matrix = None
        self.content_features = None
        self.svd_model = None
        self.tfidf_vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
        
    def collaborative_filtering(self, user_id: str, limit: int = 10):
        """Collaborative filtering using SVD"""
        try:
            # Simulate user-item matrix (in production, load from database)
            cache_key = f"cf_recommendations:{user_id}"
            cached = redis_client.get(cache_key)
            
            if cached:
                return json.loads(cached)
            
            # Mock recommendations for demo
            recommendations = [
                "64f1a2b3c4d5e6f7g8h9i0j1",
                "64f1a2b3c4d5e6f7g8h9i0j2",
                "64f1a2b3c4d5e6f7g8h9i0j3"
            ]
            
            result = {
                "recommendations": recommendations[:limit],
                "algorithm": "collaborative_filtering",
                "confidence": 0.85
            }
            
            # Cache for 1 hour
            redis_client.setex(cache_key, 3600, json.dumps(result))
            return result
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"CF error: {str(e)}")
    
    def content_based_filtering(self, user_id: str, category: str = None, limit: int = 10):
        """Content-based filtering using product features"""
        try:
            cache_key = f"cb_recommendations:{user_id}:{category}"
            cached = redis_client.get(cache_key)
            
            if cached:
                return json.loads(cached)
            
            # Mock content-based recommendations
            recommendations = [
                "64f1a2b3c4d5e6f7g8h9i0j4",
                "64f1a2b3c4d5e6f7g8h9i0j5",
                "64f1a2b3c4d5e6f7g8h9i0j6"
            ]
            
            result = {
                "recommendations": recommendations[:limit],
                "algorithm": "content_based_filtering",
                "confidence": 0.78
            }
            
            redis_client.setex(cache_key, 3600, json.dumps(result))
            return result
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"CBF error: {str(e)}")
    
    def hybrid_recommendations(self, user_id: str, category: str = None, limit: int = 10):
        """Hybrid approach combining CF and CBF"""
        try:
            cf_results = self.collaborative_filtering(user_id, limit//2)
            cb_results = self.content_based_filtering(user_id, category, limit//2)
            
            # Combine and deduplicate
            combined = list(set(cf_results["recommendations"] + cb_results["recommendations"]))
            
            return {
                "recommendations": combined[:limit],
                "algorithm": "hybrid",
                "confidence": (cf_results["confidence"] + cb_results["confidence"]) / 2
            }
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Hybrid error: {str(e)}")

# Initialize recommendation engine
rec_engine = RecommendationEngine()

@app.post("/recommend", response_model=RecommendationResponse)
async def get_recommendations(request: RecommendationRequest):
    """Get personalized product recommendations"""
    try:
        result = rec_engine.hybrid_recommendations(
            request.userId, 
            request.category, 
            request.limit
        )
        return RecommendationResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Qwipo AI Recommendations"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)