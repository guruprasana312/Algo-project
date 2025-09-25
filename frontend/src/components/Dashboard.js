import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiShoppingCart, FiStar, FiMapPin } from 'react-icons/fi';
import { theme } from '../styles/theme';
import ProductCard from './ProductCard';
import RecommendationPanel from './RecommendationPanel';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background};
  padding: ${theme.spacing.lg};
`;

const Header = styled.div`
  background: ${theme.gradients.primary};
  color: ${theme.colors.textLight};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.lg};
`;

const WelcomeText = styled.h1`
  font-family: ${theme.typography.fontFamily.display};
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.sm};
  
  .namaste {
    font-family: ${theme.typography.fontFamily.hindi};
    color: ${theme.colors.festival.diwali};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const StatCard = styled(motion.div)`
  background: ${theme.colors.surface};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  border-left: 4px solid ${props => props.color};
  
  .stat-icon {
    font-size: 2rem;
    color: ${props => props.color};
    margin-bottom: ${theme.spacing.sm};
  }
  
  .stat-value {
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.textPrimary};
    margin-bottom: ${theme.spacing.xs};
  }
  
  .stat-label {
    color: ${theme.colors.textSecondary};
    font-size: ${theme.typography.fontSize.sm};
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const ProductSection = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
`;

const SectionTitle = styled.h2`
  font-family: ${theme.typography.fontFamily.display};
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  .icon {
    color: ${theme.colors.primary};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
`;

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 1247,
    monthlyRevenue: 2850000,
    topProducts: 156,
    customerSatisfaction: 4.8
  });

  const [recommendations, setRecommendations] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    // Fetch recommendations and trending products
    fetchRecommendations();
    fetchTrendingProducts();
  }, []);

  const fetchRecommendations = async () => {
    // Mock data for demo
    setRecommendations([
      {
        id: '1',
        name: 'Premium Basmati Rice 25kg',
        price: 2500,
        image: '/api/placeholder/300/200',
        category: 'Food Grains',
        rating: 4.5,
        supplier: 'Delhi Grains Co.'
      },
      {
        id: '2',
        name: 'Organic Turmeric Powder 1kg',
        price: 450,
        image: '/api/placeholder/300/200',
        category: 'Spices',
        rating: 4.7,
        supplier: 'Kerala Spice House'
      }
    ]);
  };

  const fetchTrendingProducts = async () => {
    // Mock data for demo
    setTrendingProducts([
      {
        id: '3',
        name: 'Cotton Fabric Rolls',
        price: 1200,
        image: '/api/placeholder/300/200',
        category: 'Textiles',
        rating: 4.3,
        supplier: 'Gujarat Textiles'
      },
      {
        id: '4',
        name: 'Ayurvedic Hair Oil 500ml',
        price: 350,
        image: '/api/placeholder/300/200',
        category: 'Personal Care',
        rating: 4.6,
        supplier: 'Himalaya Wellness'
      }
    ]);
  };

  return (
    <DashboardContainer>
      <Header>
        <WelcomeText>
          <span className="namaste">नमस्ते</span> Welcome to Qwipo Marketplace
        </WelcomeText>
        <p>Discover personalized products for your business growth</p>
      </Header>

      <StatsGrid>
        <StatCard
          color={theme.colors.primary}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FiShoppingCart className="stat-icon" />
          <div className="stat-value">{stats.totalOrders.toLocaleString('en-IN')}</div>
          <div className="stat-label">Total Orders</div>
        </StatCard>

        <StatCard
          color={theme.colors.secondary}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FiTrendingUp className="stat-icon" />
          <div className="stat-value">₹{(stats.monthlyRevenue / 100000).toFixed(1)}L</div>
          <div className="stat-label">Monthly Revenue</div>
        </StatCard>

        <StatCard
          color={theme.colors.accent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <FiMapPin className="stat-icon" />
          <div className="stat-value">{stats.topProducts}</div>
          <div className="stat-label">Top Products</div>
        </StatCard>

        <StatCard
          color={theme.colors.festival.diwali}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <FiStar className="stat-icon" />
          <div className="stat-value">{stats.customerSatisfaction}</div>
          <div className="stat-label">Customer Rating</div>
        </StatCard>
      </StatsGrid>

      <ContentGrid>
        <div>
          <ProductSection>
            <SectionTitle>
              <FiTrendingUp className="icon" />
              Trending Products
            </SectionTitle>
            <ProductGrid>
              {trendingProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
          </ProductSection>
        </div>

        <RecommendationPanel recommendations={recommendations} />
      </ContentGrid>
    </DashboardContainer>
  );
};

export default Dashboard;