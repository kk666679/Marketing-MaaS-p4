import asyncio
import random
from typing import List, Dict, Any
from src.core.base_agent import BaseAgent, AgentMessage

class ContentGeneratorAgent(BaseAgent):
    def __init__(self, agent_id: str = "content_generator", orchestrator=None):
        super().__init__(agent_id, orchestrator)
        self.models = ["gpt-4", "dalle-3"]
        self.quality_threshold = 0.9
        self.current_trends = []
    
    async def start(self):
        self.is_running = True
        self.logger.info(f"{self.agent_id} started - ready to generate content")
    
    async def stop(self):
        self.is_running = False
        self.logger.info(f"{self.agent_id} stopped")
    
    async def receive_message(self, message: AgentMessage):
        if message.message_type == "trends_update":
            self.current_trends = message.content.get("trends", [])
            self.logger.info(f"Updated with {len(self.current_trends)} trends")
        
        elif message.message_type == "generate_content":
            campaign_data = message.content
            content = await self.generate_campaign_content(campaign_data)
            await self.send_message(
                "cross_platform_sync",
                "content_ready",
                {"campaign_id": campaign_data["campaign_id"], "content": content}
            )
    
    async def generate_campaign_content(self, campaign_data: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Generate content for a campaign based on trends and platform requirements"""
        campaign_id = campaign_data["campaign_id"]
        platforms = campaign_data.get("target_platforms", [])
        objectives = campaign_data.get("objectives", [])
        
        content_pieces = []
        
        for platform in platforms:
            # Generate platform-specific content
            content = await self.create_platform_content(platform, objectives)
            content_pieces.append({
                "platform": platform,
                "content_type": content["type"],
                "text": content["text"],
                "media_urls": content.get("media_urls", []),
                "hashtags": content.get("hashtags", []),
                "quality_score": content["quality_score"]
            })
        
        self.logger.info(f"Generated {len(content_pieces)} content pieces for campaign {campaign_id}")
        return content_pieces
    
    async def create_platform_content(self, platform: str, objectives: List[str]) -> Dict[str, Any]:
        """Create content optimized for specific platform"""
        # Simulate AI content generation
        platform_templates = {
            "instagram": {
                "type": "image_post",
                "text": "🚀 Discover the future of innovation! #TechTrends #Innovation #FutureReady",
                "hashtags": ["#TechTrends", "#Innovation", "#FutureReady"],
                "media_urls": ["/placeholder.svg?height=400&width=400"]
            },
            "tiktok": {
                "type": "video",
                "text": "Mind-blowing tech trends you need to know! 🤯",
                "hashtags": ["#TechTok", "#Innovation", "#Trending"],
                "media_urls": ["/placeholder.svg?height=600&width=400"]
            },
            "linkedin": {
                "type": "article",
                "text": "The latest industry insights show remarkable growth in AI adoption...",
                "hashtags": ["#BusinessInnovation", "#AI", "#Leadership"],
                "media_urls": ["/placeholder.svg?height=300&width=500"]
            }
        }
        
        content = platform_templates.get(platform, platform_templates["instagram"])
        content["quality_score"] = random.uniform(0.85, 0.98)
        
        return content

# Test the agent
agent = ContentGeneratorAgent()
print(f"Content Generator Agent '{agent.agent_id}' created")
print(f"Using models: {agent.models}")
print(f"Quality threshold: {agent.quality_threshold}")
