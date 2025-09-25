# 🛒 Qwipo - Personalized B2B Marketplace for Indian Retailers

## 🌟 Overview

Qwipo is an intelligent B2B marketplace designed specifically for Indian retailers, featuring AI-powered personalized product recommendations. The platform addresses the challenges of product discovery and purchasing optimization in the Indian retail ecosystem.

## ✨ Key Features

### 🎯 Personalized Recommendations
- **Hybrid AI Algorithm**: Combines collaborative filtering and content-based filtering
- **Real-time Learning**: Adapts to user behavior and preferences
- **Location-based Suggestions**: Considers regional preferences and supplier proximity
- **Category Intelligence**: Smart recommendations based on business type and purchase history

### 🇮🇳 Indian Market Focus
- **Multi-language Support**: Hindi and regional language support
- **GST Integration**: Built-in GST calculations and HSN code management
- **Indian Payment Gateways**: Razorpay integration for seamless payments
- **Regional Suppliers**: Location-based supplier discovery across Indian states
- **Festival-themed UI**: Vibrant colors inspired by Indian festivals

### 🚀 Modern Tech Stack
- **Frontend**: React 18 with Styled Components and Framer Motion
- **Backend**: Node.js with Express and MongoDB
- **AI/ML**: Python with FastAPI, scikit-learn, and TensorFlow
- **Caching**: Redis for high-performance recommendations
- **Architecture**: Microservices with Docker containerization

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  Node.js Backend │    │ Python AI Service│
│                 │    │                 │    │                 │
│ • Dashboard     │◄──►│ • REST APIs     │◄──►│ • ML Models     │
│ • Product Cards │    │ • Authentication│    │ • Recommendations│
│ • Recommendations│    │ • Business Logic│    │ • Analytics     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Data Layer    │
                    │                 │
                    │ • MongoDB       │
                    │ • Redis Cache   │
                    │ • File Storage  │
                    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- Docker & Docker Compose
- MongoDB
- Redis

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd "Bytexl hackthon project"
```

2. **Environment Setup**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start with Docker (Recommended)**
```bash
docker-compose up -d
```

4. **Manual Setup**

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**AI Service:**
```bash
cd ai-service
pip install -r requirements.txt
uvicorn src.main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

### 🌐 Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **AI Service**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🎨 Design System

### Color Palette
- **Primary**: Saffron Orange (#FF6B35) - Inspired by Indian flag
- **Secondary**: Deep Blue (#1565C0) - Trust and reliability
- **Accent**: Emerald Green (#00C853) - Growth and prosperity
- **Festival Colors**: Holi Pink, Diwali Gold, Navratri Purple

### Typography
- **Primary**: Inter (Modern, readable)
- **Hindi**: Noto Sans Devanagari
- **Display**: Poppins (Headings and branding)

## 🤖 AI Recommendation Engine

### Algorithms
1. **Collaborative Filtering**: User-based and item-based recommendations
2. **Content-Based Filtering**: Product feature similarity
3. **Hybrid Approach**: Combines both methods for optimal results
4. **Real-time Learning**: Continuous model updates based on user interactions

### Features
- **Cold Start Problem**: Handles new users and products
- **Scalability**: Efficient algorithms for large datasets
- **Personalization**: Individual user preference learning
- **Business Rules**: Incorporates business logic and constraints

## 📊 Key Metrics & Analytics

### Business Metrics
- **Recommendation CTR**: Click-through rate on recommended products
- **Conversion Rate**: Purchase rate from recommendations
- **User Engagement**: Time spent and interaction depth
- **Revenue Impact**: Additional revenue from recommendations

### Technical Metrics
- **Response Time**: API response times < 200ms
- **Cache Hit Rate**: Redis cache efficiency > 90%
- **Model Accuracy**: Recommendation precision and recall
- **System Uptime**: 99.9% availability target

## 🔧 API Endpoints

### Authentication
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
```

### Products
```
GET /api/products
GET /api/products/:id
POST /api/products/search
```

### Recommendations
```
GET /api/recommendations/personalized/:userId
GET /api/recommendations/trending
GET /api/recommendations/similar/:productId
```

### AI Service
```
POST /recommend
GET /health
```

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: API abuse prevention
- **Input Validation**: Comprehensive data validation
- **CORS Protection**: Cross-origin request security
- **Helmet.js**: Security headers and protection
- **Environment Variables**: Secure configuration management

## 🌍 Localization

### Supported Languages
- **English**: Primary language
- **Hindi**: देवनागरी script support
- **Regional**: Extensible for other Indian languages

### Cultural Adaptations
- **Currency**: Indian Rupee (₹) formatting
- **Date/Time**: Indian Standard Time (IST)
- **Address**: Indian address format with pincode
- **Business**: GST, PAN, and HSN code integration

## 📱 Mobile Responsiveness

- **Responsive Design**: Works on all device sizes
- **Touch Optimized**: Mobile-friendly interactions
- **Progressive Web App**: PWA capabilities for mobile installation
- **Offline Support**: Basic offline functionality

## 🚀 Deployment

### Production Deployment
```bash
# Build for production
docker-compose -f docker-compose.prod.yml up -d

# Or manual deployment
npm run build
pm2 start ecosystem.config.js
```

### Environment Variables
See `.env.example` for all required environment variables.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Indian Retail Industry**: For inspiration and requirements
- **Open Source Community**: For amazing tools and libraries
- **Bytexl Hackathon**: For the opportunity to build this solution

## 📞 Support

For support and queries:
- **Email**: support@qwipo.com
- **Documentation**: [docs.qwipo.com](https://docs.qwipo.com)
- **Issues**: GitHub Issues section

---

**Made with ❤️ for Indian Retailers**

*Empowering businesses through intelligent recommendations*