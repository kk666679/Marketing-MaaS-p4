# 🚀 Marketing MaaS Platform

A comprehensive **Marketing-as-a-Service** platform powered by AI agents, featuring advanced campaign management, real-time analytics, and enterprise-grade RBAC system.

![Marketing MaaS](https://img.shields.io/badge/Marketing-MaaS-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Clerk](https://img.shields.io/badge/Clerk-Auth-purple?style=for-the-badge)
![Neon](https://img.shields.io/badge/Neon-Database-green?style=for-the-badge)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Setup](#-environment-setup)
- [Database Setup](#-database-setup)
- [Authentication](#-authentication)
- [API Documentation](#-api-documentation)
- [RBAC System](#-rbac-system)
- [AI Agents](#-ai-agents)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🎯 **Core Marketing Features**
- **AI-Powered Campaign Generation** - Automated content creation and optimization
- **Multi-Platform Management** - Facebook, Instagram, Twitter, LinkedIn, TikTok
- **Real-time Analytics** - Advanced performance tracking and insights
- **Trend Prediction** - AI-driven market trend analysis
- **Content Optimization** - Automated A/B testing and performance optimization
- **ROI Calculator** - Real-time return on investment tracking

### 🛡️ **Enterprise Security**
- **Role-Based Access Control (RBAC)** - Granular permission management
- **Multi-tenant Architecture** - Organization-based isolation
- **Audit Logging** - Complete activity tracking
- **Clerk Authentication** - Enterprise-grade user management
- **Webhook Integration** - Real-time user synchronization

### 🎨 **Advanced UI/UX**
- **Framer Motion Animations** - Smooth, professional animations
- **Responsive Design** - Mobile-first approach
- **Dark/Light Mode** - Theme switching capability
- **Interactive Components** - Engaging user interfaces
- **Real-time Updates** - Live data synchronization

### 💰 **Business Features**
- **Stripe Integration** - Secure payment processing
- **Subscription Management** - Flexible pricing tiers
- **Usage Analytics** - Detailed billing and usage tracking
- **Multi-currency Support** - Global payment processing

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **shadcn/ui** - Modern UI components
- **Lucide React** - Icon library

### **Backend**
- **Next.js API Routes** - Serverless functions
- **Python FastAPI** - AI agent orchestration
- **Neon PostgreSQL** - Serverless database
- **Clerk** - Authentication and user management
- **Stripe** - Payment processing

### **AI & Analytics**
- **Custom AI Agents** - Trend prediction and content generation
- **Real-time Analytics** - Performance tracking
- **Sentiment Analysis** - Content optimization
- **Predictive Modeling** - Campaign optimization

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **Python** 3.9+
- **PostgreSQL** (or Neon account)
- **Clerk** account
- **Stripe** account (for payments)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/marketing-maas.git
   cd marketing-maas
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Install Python dependencies**
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

4. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Start the AI agents server**
   \`\`\`bash
   cd src && python -m uvicorn api.main:app --reload --port 8000
   \`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 Environment Setup

Create a `.env.local` file with the following variables:

\`\`\`env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/marketing_maas"
POSTGRES_URL="your-neon-connection-string"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"
CLERK_WEBHOOK_SECRET="whsec_..."

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Application
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
JWT_SECRET="your-jwt-secret"

# AI Agents
OPENAI_API_KEY="sk-..."
PYTHON_API_URL="http://localhost:8000"
\`\`\`

## 🗄️ Database Setup

1. **Create the database**
   \`\`\`bash
   # Using the provided SQL scripts
   psql -d your_database < scripts/001-create-database.sql
   psql -d your_database < scripts/002-update-users-table.sql
   psql -d your_database < scripts/003-rbac-system.sql
   \`\`\`

2. **Or use Neon (Recommended)**
   - Create a Neon project
   - Copy the connection string to `DATABASE_URL`
   - Run the SQL scripts in the Neon console

## 🔐 Authentication

The platform uses **Clerk** for authentication with the following features:

- **Social Logins** - Google, GitHub, etc.
- **Email/Password** - Traditional authentication
- **Multi-factor Authentication** - Enhanced security
- **User Management** - Profile and organization management
- **Webhook Integration** - Automatic user synchronization

### Protected Routes
- `/dashboard` - User dashboard
- `/admin` - Admin panel (requires admin role)
- `/pricing` - Subscription management
- `/api/*` - API endpoints

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth` - User authentication
- `GET /api/auth/user` - Get current user

### Campaign Management
- `GET /api/campaigns` - List campaigns
- `POST /api/campaigns` - Create campaign
- `PUT /api/campaigns/[id]` - Update campaign
- `DELETE /api/campaigns/[id]` - Delete campaign

### Admin Endpoints
- `GET /api/admin/organizations` - List organizations
- `POST /api/admin/organizations` - Create organization
- `POST /api/admin/users/invite` - Invite users
- `GET /api/admin/audit-logs/export` - Export audit logs

### Payment Endpoints
- `POST /api/checkout` - Create checkout session
- `POST /api/webhooks/stripe` - Stripe webhooks

## 🛡️ RBAC System

The platform includes a comprehensive Role-Based Access Control system:

### Default Roles
- **Owner** - Full system access
- **Admin** - Administrative privileges
- **Manager** - Team management
- **Editor** - Content management
- **Viewer** - Read-only access

### Permissions
- `campaigns.*` - Campaign management
- `analytics.*` - Analytics access
- `users.*` - User management
- `organization.*` - Organization settings
- `billing.*` - Billing management
- `admin.*` - Administrative functions

### Admin Dashboard (`/admin`)
- **Organization Management** - Multi-tenant support
- **User Management** - Invite and manage users
- **Role Management** - Custom role creation
- **Permission Matrix** - Visual permission management
- **Audit Logs** - Complete activity tracking

## 🤖 AI Agents

The platform includes specialized AI agents:

### **Trend Prediction Agent**
- Market trend analysis
- Competitor monitoring
- Performance forecasting
- Content optimization suggestions

### **Content Generator Agent**
- Automated content creation
- Multi-platform optimization
- A/B testing recommendations
- Sentiment analysis

### **Analytics Agent**
- Real-time performance tracking
- ROI calculations
- Conversion optimization
- Predictive analytics

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push to main**

\`\`\`bash
npm run build
vercel --prod
\`\`\`

### Docker

\`\`\`bash
# Build the image
docker build -t marketing-maas .

# Run the container
docker run -p 3000:3000 marketing-maas
\`\`\`

### Manual Deployment

\`\`\`bash
# Build the application
npm run build

# Start the production server
npm start
\`\`\`

## 📊 Monitoring

- **Analytics** - Built-in performance tracking
- **Error Tracking** - Comprehensive error logging
- **Audit Logs** - Complete user activity tracking
- **Performance Metrics** - Real-time system monitoring

## 🧪 Testing

\`\`\`bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e
\`\`\`

## 📈 Performance

- **Lighthouse Score** - 95+ performance rating
- **Core Web Vitals** - Optimized for speed
- **SEO Optimized** - Search engine friendly
- **Accessibility** - WCAG 2.1 compliant

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Awan Keusahawanan** - Company behind the platform
- **Next.js Team** - Amazing React framework
- **Clerk** - Authentication solution
- **Neon** - Serverless PostgreSQL
- **Stripe** - Payment processing
- **shadcn/ui** - Beautiful UI components

## 📞 Support

For support, email support@awankeusahawanan.com or join our Slack channel.

## 🔗 Links

- **Live Demo** - [https://marketing-maas.vercel.app](https://marketing-maas.vercel.app)
- **Documentation** - [https://docs.marketing-maas.com](https://docs.marketing-maas.com)
- **API Reference** - [https://api.marketing-maas.com](https://api.marketing-maas.com)

---

**Built with ❤️ by Awan Keusahawanan © 2025**
