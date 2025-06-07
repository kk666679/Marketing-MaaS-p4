from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from datetime import datetime
import asyncio
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)

app = FastAPI(title="Marketing MaaS API", version="1.0.0")

# Pydantic models for API
class TargetAudience(BaseModel):
    age_range: List[int]
    interests: List[str]
    location: Optional[str] = None

class Campaign(BaseModel):
    campaign_id: str
    name: str
    target_platforms: List[str]
    start_date: datetime
    end_date: datetime
    budget: float
    target_audience: TargetAudience
    objectives: List[str]

class CampaignUpdate(BaseModel):
    name: Optional[str] = None
    target_platforms: Optional[List[str]] = None
    budget: Optional[float] = None
    target_audience: Optional[TargetAudience] = None
    objectives: Optional[List[str]] = None

# In-memory storage (in production, use a proper database)
campaigns_db: Dict[str, Dict[str, Any]] = {}

# Global orchestrator instance
orchestrator = None

@app.on_event("startup")
async def startup_event():
    """Initialize the system on startup"""
    global orchestrator
    from src.core.orchestrator import Orchestrator
    from src.agents.trend_prediction_agent import TrendPredictionAgent
    from src.agents.content_generator_agent import ContentGeneratorAgent
    
    orchestrator = Orchestrator()
    
    # Register agents
    trend_agent = TrendPredictionAgent()
    content_agent = ContentGeneratorAgent()
    
    orchestrator.register_agent(trend_agent)
    orchestrator.register_agent(content_agent)
    
    # Start all agents
    await orchestrator.start_all_agents()
    
    print("Marketing MaaS system started successfully!")

@app.get("/")
async def root():
    return {"message": "Marketing MaaS API", "version": "1.0.0"}

@app.post("/campaigns")
async def create_campaign(campaign: Campaign):
    """Create a new marketing campaign"""
    if campaign.campaign_id in campaigns_db:
        raise HTTPException(status_code=400, detail="Campaign already exists")
    
    # Store campaign
    campaigns_db[campaign.campaign_id] = campaign.dict()
    
    # Trigger campaign orchestration
    if orchestrator:
        await orchestrator.create_campaign(campaign.dict())
    
    return {"message": f"Campaign {campaign.campaign_id} created successfully"}

@app.get("/campaigns")
async def list_campaigns():
    """List all campaigns"""
    return {"campaigns": list(campaigns_db.values())}

@app.get("/campaigns/{campaign_id}")
async def get_campaign(campaign_id: str):
    """Get campaign details"""
    if campaign_id not in campaigns_db:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    return campaigns_db[campaign_id]

@app.patch("/campaigns/{campaign_id}")
async def update_campaign(campaign_id: str, updates: CampaignUpdate):
    """Update an existing campaign"""
    if campaign_id not in campaigns_db:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    # Update campaign data
    campaign_data = campaigns_db[campaign_id]
    update_data = updates.dict(exclude_unset=True)
    
    for key, value in update_data.items():
        if key == "target_audience" and value:
            campaign_data[key] = value.dict()
        else:
            campaign_data[key] = value
    
    return {"message": f"Campaign {campaign_id} updated successfully"}

@app.delete("/campaigns/{campaign_id}")
async def delete_campaign(campaign_id: str):
    """Delete a campaign"""
    if campaign_id not in campaigns_db:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    del campaigns_db[campaign_id]
    return {"message": f"Campaign {campaign_id} deleted successfully"}

@app.get("/campaigns/{campaign_id}/metrics")
async def get_campaign_metrics(campaign_id: str):
    """Get campaign performance metrics"""
    if campaign_id not in campaigns_db:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    # Simulate metrics (in production, fetch from analytics services)
    return {
        "campaign_id": campaign_id,
        "metrics": {
            "impressions": 125000,
            "clicks": 3500,
            "conversions": 280,
            "ctr": 2.8,
            "conversion_rate": 8.0,
            "cost_per_click": 1.25,
            "roi": 3.2
        },
        "platform_breakdown": {
            "instagram": {"impressions": 50000, "engagement_rate": 4.2},
            "tiktok": {"impressions": 45000, "engagement_rate": 6.1},
            "linkedin": {"impressions": 30000, "engagement_rate": 2.8}
        }
    }

@app.get("/system/status")
async def get_system_status():
    """Get system health status"""
    if orchestrator:
        return orchestrator.get_system_status()
    else:
        return {"error": "System not initialized"}

# Example usage
print("Marketing MaaS API initialized")
print("Available endpoints:")
print("- POST /campaigns - Create campaign")
print("- GET /campaigns - List campaigns") 
print("- GET /campaigns/{id} - Get campaign details")
print("- PATCH /campaigns/{id} - Update campaign")
print("- DELETE /campaigns/{id} - Delete campaign")
print("- GET /campaigns/{id}/metrics - Get metrics")
print("- GET /system/status - System status")
