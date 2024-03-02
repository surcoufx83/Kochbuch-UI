import { UserAccount } from "./user";

export interface IngredientUnit {
    id: number;
    name: string;
}

export interface Recipe {
    aigenerated: boolean;
    categories: RecipeCategoryAssignment[];
    created: string;
    description: string;
    editor?: RecipeEditorSettings;
    eaterCount: number;
    id: number;
    lastEdit: RecipeEditorDbSettings;
    name: string;
    owner: UserAccount | null;
    pictures: RecipePicture[];
    placeholder: boolean;
    preparation: RecipePreparation;
    socials: RecipeSocialStatistics;
    source: RecipeSource;
}

export interface RecipeCategoryList {
    cat: RecipeCategoryListCat;
    item: RecipeCategoryListItem;
}

export interface RecipeCategoryListCat {
    id: number;
    icon: string;
    l10nname: string;
}

export interface RecipeCategoryListItem {
    id: number;
    icon: string;
    l10nname: string;
}

export interface RecipeCategory {
    id: number;
    icon: string;
    modified: string;
    techname: string;
    l10nname: string;
    items: { [key: string]: RecipeCategoryItem };
}

export interface RecipeCategoryAssignment {
    catid: number;
    itemid: number;
    votes: number;
}

export interface RecipeCategoryItem {
    id: number;
    icon: string;
    modified: string;
    techname: string;
    l10nname: string;
}

export interface RecipeEditorDbSettings {
    user: UserAccount | null;
    when: string | null;
}

export interface RecipeEditorSettings {
    lastedit: string;
    haschanges: boolean;
}

export interface RecipeIngredient {
    id: number;
    description: string;
    quantity: number | null;
    unit: IngredientUnit;
}

export interface RecipeListing {
    count: number;
    limit: number;
    list: Recipe[];
    mostViews?: Recipe | null;
    topVoted?: Recipe[];
    ts: string;
}

export interface RecipeMyVotes {
    cooked: RecipeMyVotesCooked[];
    rating: RecipeMyVoting;
    voting: RecipeMyVoting;
}

export interface RecipeMyVotesCooked {
    cooked: boolean;
    when: string;
}

export interface RecipeMyVoting {
    value: number;
    voted: boolean;
    when: string;
}

export interface RecipePicture {
    description: string;
    h: number;
    id: number;
    index: number;
    link: string;
    name: string;
    thumbnail: string;
    uploaded: string | null;
    uploader: UserAccount | null;
    w: number;
}

export interface RecipePreparation {
    ingredients: RecipeIngredient[];
    ingredientsGrouping: 'None' | 'Steps';
    steps: RecipeStep[];
    timeConsumed: RecipePreparationConsumption;
}

export interface RecipePreparationConsumption {
    cooking: number;
    preparing: number;
    rest: number;
    total: number;
    unit: string;
}

export type RecipePublication = {
    isPublished: {
        external: boolean;
        internal: boolean;
    };
    when: string | null;
}

export interface RecipeShareLink {
    url: string;
    views: number;
}

export interface RecipeSharing {
    links: RecipeShareLink[];
    publication: RecipePublication;
}

export interface RecipeSocialStatistics {
    cooked: number;
    myvotes: RecipeMyVotes | null;
    rating: RecipeSocialRating;
    sharing: RecipeSharing;
    views: number;
    voting: RecipeSocialVoting;
}

export interface RecipeSocialRating {
    ratings: number;
    sum: number;
    avg: number | null;
}

export interface RecipeSocialVoting {
    votes: number;
    sum: number;
    avg: number | null;
}

export interface RecipeSource {
    description: string;
    url: string;
}

export interface RecipeStep {
    index: number;
    ingredients: RecipeIngredient[];
    name: string;
    userContent: string;
    timeConsumed: RecipeStepTimeConsumption;
}

export interface RecipeStepTimeConsumption {
    cooking: number | null;
    preparing: number | null;
    rest: number | null;
    total: number | null;
    unit: string;
}

export interface UserRecipeListing {
    count: number;
    limit: number;
    list: Recipe[];
    mostViews?: Recipe | null;
    topVoted?: Recipe[];
    ts: string;
    user: UserAccount;
}

/* export const EmptyRecipe: Recipe = {
    categories: [],
    created: '',
    description: '',
    eaterCount: 4,
    editor: {
        lastedit: '',
        haschanges: false,
    },
    id: 0,
    name: '',
    owner: {
        id: 0,
        meta: {
            email: null,
            fn: '',
            ln: '',
            un: '',
            initials: '',
        },
        name: '',
        statistics: {
            recipes: {
                created: 0,
            },
        },
    },
    pictures: [],
    preparation: {
        ingredients: [],
        ingredientsGrouping: 'None',
        steps: [],
        timeConsumed: {
            cooking: 0,
            preparing: 0,
            rest: 0,
            total: 0,
            unit: 'minutes',
        },
    },
    socials: {
        cooked: 0,
        myvotes: null,
        rating: {
            ratings: 0,
            sum: 0,
            avg: null,
        },
        sharing: {
            links: [],
            publication: {
                isPublished: false,
                when: null,
            },
        },
        views: 0,
        voting: {
            votes: 0,
            sum: 0,
            avg: null,
        },
    },
    source: {
        description: '',
        url: '',
    },
}; */

export const EmptyIngredientUnit: IngredientUnit = {
    id: 0,
    name: '',
};

export const EmptyIngredient: RecipeIngredient = {
    id: 0,
    description: '',
    quantity: null,
    unit: { ...EmptyIngredientUnit },
};

export const EmptyStepTimeConsumption: RecipeStepTimeConsumption = {
    cooking: null,
    preparing: null,
    rest: null,
    total: null,
    unit: '',
}

export const EmptyStep: RecipeStep = {
    index: 0,
    ingredients: [],
    name: '',
    userContent: '',
    timeConsumed: { ...EmptyStepTimeConsumption },
}