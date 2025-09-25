import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrendingUp, FiShoppingCart, FiStar, FiZap, FiRefreshCw, FiHeart, FiEye } from 'react-icons/fi';

const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #FFF8F0 0%, #FFF5E6 100%);
    color: #1A1A1A;
    overflow-x: hidden;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #FFF8F0 0%, #FFF5E6 100%);
`;

const Header = styled(motion.div)`
  background: linear-gradient(135deg, #FF6B35 0%, #E55A2B 100%);
  color: white;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: rotate 20s linear infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
  
  .hindi { font-family: 'Noto Sans Devanagari', sans-serif; color: #FFC107; }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  position: relative;
  z-index: 1;
`;

const Dashboard = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border-left: 5px solid ${props => props.color};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background: ${props => props.color}15;
    border-radius: 50%;
    transform: translate(30px, -30px);
  }
  
  .icon {
    font-size: 2.5rem;
    color: ${props => props.color};
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
  }
  
  .value {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1A1A1A;
    margin-bottom: 0.5rem;
    position: relative;
    z-index: 1;
  }
  
  .label {
    color: #666;
    font-weight: 500;
    position: relative;
    z-index: 1;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ProductSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
`;

const SectionTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .icon { color: #FF6B35; }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ProductCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
  }
`;

const ProductImage = styled.div`
  height: 200px;
  background: linear-gradient(45deg, #FF6B35, #1565C0);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  
  .badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: #00C853;
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  
  .actions {
    position: absolute;
    top: 1rem;
    left: 1rem;
    display: flex;
    gap: 0.5rem;
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  &:hover .actions { opacity: 1; }
  
  .action-btn {
    background: rgba(255,255,255,0.9);
    border: none;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #FF6B35;
    transition: all 0.3s;
    
    &:hover {
      background: white;
      transform: scale(1.1);
    }
  }
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductName = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #FF6B35;
  margin-bottom: 0.5rem;
`;

const ProductMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const AddToCartBtn = styled(motion.button)`
  width: 100%;
  background: linear-gradient(135deg, #FF6B35 0%, #E55A2B 100%);
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const RecommendationPanel = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  height: fit-content;
`;

const RecommendationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const AIBadge = styled.div`
  background: linear-gradient(135deg, #1565C0 0%, #0D47A1 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 1rem;
`;

const RecommendationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RecommendationItem = styled(motion.div)`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #F8F9FA;
  border-radius: 10px;
  cursor: pointer;
  
  &:hover {
    background: #FF6B3510;
    transform: translateX(5px);
  }
`;

const ItemImage = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #FF6B35, #1565C0);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 0.3rem;
`;

const ItemPrice = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #FF6B35;
  margin-bottom: 0.3rem;
`;

const ItemRating = styled.div`
  font-size: 0.8rem;
  color: #FFC107;
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

const App = () => {
  const [stats] = useState({
    orders: 1247,
    revenue: 28.5,
    products: 156,
    rating: 4.8
  });

  const [products] = useState([
    { id: 1, name: 'Premium Basmati Rice 25kg', price: 2500, rating: 4.5, supplier: 'Delhi Grains', category: 'Food' },
    { id: 2, name: 'Organic Turmeric Powder 1kg', price: 450, rating: 4.7, supplier: 'Kerala Spices', category: 'Spices' },
    { id: 3, name: 'Cotton Fabric Rolls', price: 1200, rating: 4.3, supplier: 'Gujarat Textiles', category: 'Textile' },
    { id: 4, name: 'Ayurvedic Hair Oil 500ml', price: 350, rating: 4.6, supplier: 'Himalaya', category: 'Care' }
  ]);

  const [recommendations] = useState([
    { id: 5, name: 'Masala Tea Powder', price: 280, rating: 4.4 },
    { id: 6, name: 'Coconut Oil 1L', price: 320, rating: 4.5 },
    { id: 7, name: 'Incense Sticks Pack', price: 150, rating: 4.3 }
  ]);

  return (
    <Container>
      <GlobalStyle />
      
      <Header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>
          <span className="hindi">नमस्ते</span> Welcome to Qwipo
        </Title>
        <Subtitle>AI-Powered B2B Marketplace for Indian Retailers</Subtitle>
      </Header>

      <Dashboard>
        <StatsGrid>
          {[
            { icon: FiShoppingCart, value: stats.orders.toLocaleString('en-IN'), label: 'Total Orders', color: '#FF6B35' },
            { icon: FiTrendingUp, value: `₹${stats.revenue}L`, label: 'Monthly Revenue', color: '#1565C0' },
            { icon: FiStar, value: stats.products, label: 'Top Products', color: '#00C853' },
            { icon: FiHeart, value: stats.rating, label: 'Customer Rating', color: '#FFC107' }
          ].map((stat, index) => (
            <StatCard
              key={index}
              color={stat.color}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <stat.icon className="icon" />
              <div className="value">{stat.value}</div>
              <div className="label">{stat.label}</div>
            </StatCard>
          ))}
        </StatsGrid>

        <MainContent>
          <ProductSection>
            <SectionTitle>
              <FiTrendingUp className="icon" />
              Trending Products
            </SectionTitle>
            <ProductGrid>
              <AnimatePresence>
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <ProductImage>
                      {product.category.charAt(0)}
                      <div className="badge">Hot</div>
                      <div className="actions">
                        <button className="action-btn"><FiHeart /></button>
                        <button className="action-btn"><FiEye /></button>
                      </div>
                    </ProductImage>
                    <ProductInfo>
                      <ProductName>{product.name}</ProductName>
                      <ProductPrice>₹{product.price.toLocaleString('en-IN')}</ProductPrice>
                      <ProductMeta>
                        <span>⭐ {product.rating}</span>
                        <span>{product.supplier}</span>
                      </ProductMeta>
                      <AddToCartBtn
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiShoppingCart />
                        Add to Cart
                      </AddToCartBtn>
                    </ProductInfo>
                  </ProductCard>
                ))}
              </AnimatePresence>
            </ProductGrid>
          </ProductSection>

          <RecommendationPanel>
            <RecommendationHeader>
              <SectionTitle>
                <FiZap className="icon" />
                Smart Picks
              </SectionTitle>
              <motion.button
                style={{ background: '#00C853', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer' }}
                whileHover={{ scale: 1.1, rotate: 180 }}
              >
                <FiRefreshCw />
              </motion.button>
            </RecommendationHeader>
            
            <AIBadge>
              <FiZap />
              AI Recommendations
            </AIBadge>

            <RecommendationList>
              {recommendations.map((item, index) => (
                <RecommendationItem
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <ItemImage>{item.name.charAt(0)}</ItemImage>
                  <ItemInfo>
                    <ItemName>{item.name}</ItemName>
                    <ItemPrice>₹{item.price}</ItemPrice>
                    <ItemRating>
                      <FiStar fill="currentColor" />
                      {item.rating}
                    </ItemRating>
                  </ItemInfo>
                </RecommendationItem>
              ))}
            </RecommendationList>
          </RecommendationPanel>
        </MainContent>
      </Dashboard>
    </Container>
  );
};

export default App;