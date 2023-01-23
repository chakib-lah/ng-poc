// TODO: update model - to be completed with appropriate props
import {Author} from "../../shared/models/author";
import {Category} from "../../shared/models/category";
import {Actor} from "../../shared/models/actor";

export interface Movie {
    id: number;
    title: string;
    description: string;
    contentUrl: string | null;
    cover: string;
    moviesPhotos: string[]
    score: string | null;
    country: string;
    dateRelease: Date;
    author?: Author;
    actors?: Actor[];
    actorsName?: string[];
    categories?: Category[];
    categoryType?: string[];
}
