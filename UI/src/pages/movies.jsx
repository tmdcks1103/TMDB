//리팩토링

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// CategoryCard 컴포넌트 분리
const CategoryCard = ({ imageSrc, title, onClick }) => (
  <StyledCategoryCard onClick={onClick}>
    <CategoryImage src={imageSrc} alt={title} />
    <CategoryTitle>{title}</CategoryTitle>
  </StyledCategoryCard>
);

function MoviesPage() {
  const navigate = useNavigate();

  // 카테고리 데이터를 배열로 관리
  const categories = [
    { id: 1, title: '현재 상영중인', imageSrc: '/images/현재상영.jpg', route: '/movies/now-playing' },
    { id: 2, title: '인기있는', imageSrc: '/images/기타.jpg', route: '/movies/popular' },
    { id: 3, title: '높은 평가를 받은', imageSrc: '/images/높은평점.jpg', route: '/movies/top-rated' },
    { id: 4, title: '개봉 예정인', imageSrc: '/images/상영예정.jpg', route: '/movies/up-coming' },
  ];

  return (
    <MoviesContainer>
      <Title>카테고리 페이지</Title>
      <CategoriesContainer>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            imageSrc={category.imageSrc}
            title={category.title}
            onClick={() => navigate(category.route)}
          />
        ))}
      </CategoriesContainer>
    </MoviesContainer>
  );
}

export default MoviesPage;

// 스타일 컴포넌트
const MoviesContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  margin-left: 15%;
`;

const Title = styled.h2`
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const StyledCategoryCard = styled.div`
  background-color: #3e3e3e;
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  color: white;
  width: 250px;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const CategoryTitle = styled.div`
  padding: 10px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.7);
  border-top: 1px solid #f06292;
`;