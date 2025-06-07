from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Any, Dict, Optional
import asyncio
import logging

@dataclass
class AgentMessage:
    sender: str
    recipient: str
    message_type: str
    content: Dict[str, Any]
    timestamp: float

class BaseAgent(ABC):
    def __init__(self, agent_id: str, orchestrator=None):
        self.agent_id = agent_id
        self.orchestrator = orchestrator
        self.logger = logging.getLogger(f"Agent.{agent_id}")
        self.is_running = False
        self.message_queue = asyncio.Queue()
    
    @abstractmethod
    async def start(self):
        """Start the agent"""
        pass
    
    @abstractmethod
    async def stop(self):
        """Stop the agent"""
        pass
    
    @abstractmethod
    async def receive_message(self, message: AgentMessage):
        """Handle incoming messages"""
        pass
    
    async def send_message(self, recipient: str, message_type: str, content: Dict[str, Any]):
        """Send message to another agent"""
        if self.orchestrator:
            message = AgentMessage(
                sender=self.agent_id,
                recipient=recipient,
                message_type=message_type,
                content=content,
                timestamp=asyncio.get_event_loop().time()
            )
            await self.orchestrator.route_message(message)

print("Base agent system initialized")
