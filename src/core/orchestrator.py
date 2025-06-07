import asyncio
import logging
from typing import Dict, List, Any
from src.core.base_agent import BaseAgent, AgentMessage

class Orchestrator:
    def __init__(self):
        self.agents: Dict[str, BaseAgent] = {}
        self.logger = logging.getLogger("Orchestrator")
        self.message_queue = asyncio.Queue()
        self.is_running = False
    
    def register_agent(self, agent: BaseAgent):
        """Register an agent with the orchestrator"""
        agent.orchestrator = self
        self.agents[agent.agent_id] = agent
        self.logger.info(f"Registered agent: {agent.agent_id}")
    
    async def start_all_agents(self):
        """Start all registered agents"""
        self.is_running = True
        self.logger.info("Starting orchestrator and all agents")
        
        # Start message processing task
        asyncio.create_task(self.process_messages())
        
        # Start all agents
        for agent in self.agents.values():
            await agent.start()
        
        self.logger.info(f"Started {len(self.agents)} agents")
    
    async def stop_all_agents(self):
        """Stop all agents"""
        self.is_running = False
        self.logger.info("Stopping all agents")
        
        for agent in self.agents.values():
            await agent.stop()
    
    async def route_message(self, message: AgentMessage):
        """Route message to the appropriate agent"""
        await self.message_queue.put(message)
    
    async def process_messages(self):
        """Process messages from the queue"""
        while self.is_running:
            try:
                message = await asyncio.wait_for(self.message_queue.get(), timeout=1.0)
                recipient_agent = self.agents.get(message.recipient)
                
                if recipient_agent:
                    await recipient_agent.receive_message(message)
                else:
                    self.logger.warning(f"Unknown recipient: {message.recipient}")
                    
            except asyncio.TimeoutError:
                continue
            except Exception as e:
                self.logger.error(f"Error processing message: {e}")
    
    async def create_campaign(self, campaign_data: Dict[str, Any]):
        """Orchestrate campaign creation across agents"""
        campaign_id = campaign_data["campaign_id"]
        self.logger.info(f"Creating campaign: {campaign_id}")
        
        # Step 1: Get trend analysis
        await self.route_message(AgentMessage(
            sender="orchestrator",
            recipient="trend_prediction",
            message_type="get_trends",
            content={},
            timestamp=asyncio.get_event_loop().time()
        ))
        
        # Step 2: Generate content (will be triggered by trend update)
        await asyncio.sleep(1)  # Allow trend processing
        
        await self.route_message(AgentMessage(
            sender="orchestrator",
            recipient="content_generator",
            message_type="generate_content",
            content=campaign_data,
            timestamp=asyncio.get_event_loop().time()
        ))
        
        self.logger.info(f"Campaign {campaign_id} orchestration initiated")
    
    def get_system_status(self) -> Dict[str, Any]:
        """Get current system status"""
        return {
            "orchestrator_running": self.is_running,
            "active_agents": len(self.agents),
            "agent_status": {
                agent_id: agent.is_running 
                for agent_id, agent in self.agents.items()
            },
            "message_queue_size": self.message_queue.qsize()
        }

# Test the orchestrator
orchestrator = Orchestrator()
print("Orchestrator created")
print("System status:", orchestrator.get_system_status())
