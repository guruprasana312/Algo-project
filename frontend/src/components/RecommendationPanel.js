import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZap, FiRefreshCw, FiTrendingUp, FiUser } from 'react-icons/fi';
import { theme } from '../styles/theme';

const Panel = styled(motion.div)`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
  height: fit-content;
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg};
`;

const Title = styled.h2`
  font-family: ${theme.typography.fontFamily.display};
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.textPrimary};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  .icon {
    color: ${theme.colors.accent};
  }
`;

const RefreshButton = styled(motion.button)`
  background: ${theme.colors.accent};
  color: ${theme.colors.textLight};
  border: none;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: ${theme.typography.fontSize.sm};
`;

const FilterTabs = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.lg};
  background: ${theme.colors.surfaceDark};
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.md};
`;

const FilterTab = styled(motion.button)`
  flex: 1;
  background: ${props => props.active ? theme.colors.primary : 'transparent'};
  color: ${props => props.active ? theme.colors.textLight : theme.colors.textSecondary};
  border: none;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  transition: all 0.3s ease;
`;

const RecommendationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const RecommendationItem = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.surfaceDark};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${theme.colors.primary}15;
    transform: translateX(4px);
  }
`;

const ItemImage = styled.div`
  width: 60px;
  height: 60px;
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.sm};
  overflow: hidden;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemName = styled.h4`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing.xs};
  line-height: 1.3;
`;

const ItemPrice = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const ItemMeta = styled.div`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const AIBadge = styled.div`
  background: ${theme.gradients.secondary};
  color: ${theme.colors.textLight};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  width: fit-content;
`;

const RecommendationPanel = ({ recommendations }) => {
  const [activeFilter, setActiveFilter] = useState('personalized');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filters = [
    { id: 'personalized', label: 'For You', icon: FiUser },
    { id: 'trending', label: 'Trending', icon: FiTrendingUp }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <Panel
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PanelHeader>
        <Title>
          <FiZap className="icon" />
          Smart Recommendations
        </Title>
        <RefreshButton
          onClick={handleRefresh}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: isRefreshing ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <FiRefreshCw />
        </RefreshButton>
      </PanelHeader>

      <AIBadge>
        <FiZap />
        AI-Powered Suggestions
      </AIBadge>

      <FilterTabs>
        {filters.map(filter => (
          <FilterTab
            key={filter.id}
            active={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <filter.icon />
            {filter.label}
          </FilterTab>
        ))}
      </FilterTabs>

      <RecommendationList>
        <AnimatePresence mode="wait">
          {recommendations.map((item, index) => (
            <RecommendationItem
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <ItemImage>
                <img 
                  src={item.image || '/api/placeholder/60/60'} 
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yNSAyMEgzNVYzNUgyNVYyMFoiIGZpbGw9IiNFMEUwRTAiLz4KPC9zdmc+Cg==';
                  }}
                />
              </ItemImage>
              <ItemContent>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{formatPrice(item.price)}</ItemPrice>
                <ItemMeta>
                  <span>⭐ {item.rating}</span>
                  <span>•</span>
                  <span>{item.supplier}</span>
                </ItemMeta>
              </ItemContent>
            </RecommendationItem>
          ))}
        </AnimatePresence>
      </RecommendationList>
    </Panel>
  );
};

export default RecommendationPanel;