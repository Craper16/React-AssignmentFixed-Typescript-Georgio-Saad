import {
  Box,
  Input,
  Text,
  Spinner,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { CloseIcon, RepeatIcon } from '@chakra-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import Article from '../../components/Articles/Article';
import { useFetchArticlesQuery } from '../../redux/api/articlesApi';
import {
  setArticles,
  clearFilteredArticles,
  filterArticles,
  defaultArticles,
} from '../../redux/articles/articlesSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  const { data, isError, error, isFetching, isSuccess } =
    useFetchArticlesQuery(page);

  const { articlesData, filteredData, isEnd } = useAppSelector(
    (state) => state.articles
  );

  useEffect(() => {
    if (data?.response?.docs) {
      dispatch(setArticles({ data: data?.response?.docs }));
    }
  }, [dispatch, data]);

  const handleLoadMore = useCallback(() => {
    if (!isEnd && !isFetching && !search) {
      return setPage(page + 1);
    } else {
      return;
    }
  }, [isEnd, isFetching, page, search]);

  const handleRefresh = () => {
    if (page !== 0 && !search) {
      dispatch(defaultArticles());
      setPage(0);
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    dispatch(filterArticles(text));
  };

  const handleClearSearch = () => {
    dispatch(clearFilteredArticles());
    setSearch('');
  };

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      handleLoadMore();
    }
  };

  return (
    <>
      <Text
        textAlign="center"
        marginTop={50}
        padding="15"
        margin="auto"
        width={400}
        color="#8A2BE2"
        fontSize="xx-large"
      >
        Search articles here
      </Text>
      <InputGroup
        size="lg"
        textAlign="center"
      >
        <Input
          justifyItems="center"
          alignItems="center"
          margin="auto"
          width={500}
          placeholder="Search articles"
          size="lg"
          blur="xl"
          color="#8A2BE2"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {search ? (
          <InputRightElement
            children={
              <CloseIcon
                marginRight="1420"
                onClick={handleClearSearch}
                color="#8A2BE2"
              />
            }
          />
        ) : null}
      </InputGroup>
      {!isSuccess && !isFetching && (
        <Text
          color={'tomato'}
          marginLeft="44%"
          width={400}
          padding="6"
        >
          No articles were fetched
        </Text>
      )}
      {isError && (
        <Text
          color={'tomato'}
          marginLeft="44%"
          width={400}
          padding="6"
        >
          {(error as any).error || (error as any).data?.message}
        </Text>
      )}
      <RepeatIcon
        color="#8A2BE2"
        marginLeft="49%"
        onClick={handleRefresh}
      />
      <Box>
        {search && filteredData.length === 0 ? (
          <Text
            textAlign="center"
            fontWeight="bold"
            color={'#8A2BE2'}
            padding="12"
          >
            Could not find articles!
          </Text>
        ) : null}
        {search
          ? filteredData.map((filteredArticle, i) => {
              return (
                <Article
                  key={i}
                  title={filteredArticle.headline.main}
                  abstract={filteredArticle.abstract}
                  content={filteredArticle.lead_paragraph}
                  images={filteredArticle.multimedia}
                  date={filteredArticle.pub_date}
                  author={filteredArticle.byline.original}
                />
              );
            })
          : articlesData.map((article, i) => {
              return (
                <Article
                  key={i}
                  title={article.headline.main}
                  abstract={article.abstract}
                  content={article.lead_paragraph}
                  images={article.multimedia}
                  date={article.pub_date}
                  author={article.byline.original}
                />
              );
            })}
        {isFetching && (
          <Spinner
            justifyContent="center"
            alignItems="center"
            marginTop={50}
            marginLeft={'48%'}
            size="xl"
            color="#8A2BE2"
          />
        )}
        {isEnd && !search && (
          <Text
            textAlign="center"
            fontWeight="bold"
            color={'#8A2BE2'}
          >
            You have reached the end of the articles list
          </Text>
        )}
      </Box>
    </>
  );
};

export default Dashboard;
