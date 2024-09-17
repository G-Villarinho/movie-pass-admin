import { IndicativeRating } from './indicativeRating';

export type Movie = {
    id: string;
    title: string;
    duration: string;
    indicativeRating: IndicativeRating;
    movieImages: MovieImage[];
};

export type MovieImage = {
    id: string;
    imageUrl: string;
};
