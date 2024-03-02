import { RecipeListing } from "./recipe";

export interface UserAccount {
    betaTester?: boolean;
    cloudAccount?: boolean;
    consent?: Consent;
    listItemsPerPage?: number;
    loggedIn?: boolean;
    id: number;
    isAdmin?: boolean;
    meta: Meta;
    name: string;
    recipes?: RecipeListing;
    recipeSettings?: RecipesSettings;
    statistics: Statistics;
}

export interface Consent {
    sys2me: SystemConsent;
    user2me: UserConsent;
}

export interface LongDurationRecipesSettings {
    showWarning: boolean;
    longDurationMinutes: number;
}

export interface Meta {
    email: string | null;
    fn: string;
    ln: string;
    un: string;
    initials: string;
}

export interface PictureStatistics {
    uploaded: number;
}

export interface RecipesSettings {
    longDurationRecipes: LongDurationRecipesSettings;
}

export interface RecipeStatistics {
    cooked?: number;
    created: number;
    createdext: number;
    distinctviews?: number;
    viewed?: number;
    voted?: number;
}

export interface Statistics {
    pictures?: PictureStatistics;
    recipes: RecipeStatistics;
}

export interface SystemConsent {
    email: boolean;
    message: boolean;
}

export interface UserConsent {
    email: boolean;
    exposeMail: boolean;
    message: boolean;
}

export const NotLoggedInUser: UserAccount = {
    id: 0,
    listItemsPerPage: 15,
    meta: {
        email: null,
        fn: '',
        ln: '',
        un: '',
        initials: ''
    },
    name: 'dummy',
    recipeSettings: {
        longDurationRecipes: {
            showWarning: true,
            longDurationMinutes: 180,
        }
    },
    statistics: {
        recipes: {
            created: 0,
            createdext: 0,
        }
    }
}
