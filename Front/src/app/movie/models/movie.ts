// TODO: update model - to be completed with appropriate props
import {Author} from "../../author/models/author";
import {Category} from "../../category/models/category";
import {Actor} from "../../actor/models/actor";

export interface Movie {
    id: number;
    title: string;
    description: string;
    contentUrl: string | null;
    cover: string;
    moviesPhotos: string[]
    score: string;
    country: string;
    dateRelease: Date;
    /*author: Author;
    actor: Actor[];
    category: Category[]*/
}
