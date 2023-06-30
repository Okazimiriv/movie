import { useRef } from "react";
import { Outlet, useLocation  } from "react-router-dom";
import { Container } from "../App.styled";

import MovieCard from "components/MovieCard/MovieCard";
import { InformationBlock, LinkItem, LinkWrap, LinkBox } from "components/AdditionalInfo/AdditionalInfo.styled";
import { GoBackButton } from "components/GoBackBtn/GoBackBtn.styled";
import { Loader } from "components/Loader/Loader.styled";
import { ThreeDots } from 'react-loader-spinner';
import { ErrorMessage } from '../ErorrMessage';
// import { useFetchMovieDetails } from "components/hooks/useFetchMovieDetails";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getMovieById } from 'service/apiService';

const MoviesDatails = () => {
  const location = useLocation();  
  const backLinkLocation = useRef(location.state?.from ?? '/movies');
  // const { movie, isLoading, error } = useFetchMovieDetails();
  
  // console.log('movie', movie);
 
  //
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  // console.log(params);
 const {title, overview, vote_average, poster_path, genres = []} = movie;
  useEffect(() => {  
    setIsLoading(true);

    getMovieById(id)
      .then(resp => {
        // console.log('resp', resp);
        setMovie(resp);
      }).catch(error =>
        setError('Oops! Something went wrong! Try reloading the page!'))
      .finally(() => setIsLoading(false));
    }, [id]);  
  
   
  return (
    <Container>
       <GoBackButton to={backLinkLocation.current}>Go back</GoBackButton> 
       {isLoading && (
       <Loader>
      <ThreeDots color="lightslategrey" />
      </Loader>
      )}      
      <MovieCard
          title={title}
          vote_average={vote_average}
          overview={overview}
          genres={genres}
          poster_path={poster_path}
        />      
      <InformationBlock>
        <p>Additional information</p>
        <LinkBox>
          <LinkItem>
            <LinkWrap to="cast" state={{ from: location.state?.from ?? '/movies' }}>Cast</LinkWrap>
          </LinkItem>
          <LinkItem>
            <LinkWrap to="reviews" state={{ from: location.state?.from ?? '/movies' }}>Reviews</LinkWrap>
          </LinkItem>
        </LinkBox>
      </InformationBlock>
        {/* <Suspense fallback={<div>Loading page...</div>}> */}
        <Outlet />
      {/* </Suspense> */}
      {/* </div> */}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default MoviesDatails;