import { getRangeDateForFilter } from "./date";
import { views } from "./table";

const isProduction = process.env.NODE_ENV === 'production';

const domain = 'Expense-Tracker';
const local = 'localhost:3000';
const home = isProduction ? domain : local;

const url = {
    homeWithoutApp: home,
    home: `//${home}`,
    api: `${isProduction ? 'https://app' : 'http://app.'} ${home}`,
    serverApi: `${isProduction ? 'http://' : 'http://'}${home}`,
    app: {
        sigin:`//app.${home}/signin`,
        signup: `//app.${home}/signup`,
        overview: `//app.${home}`,
    },
    github: 'https://github.com/swlodawski/expense-tracker'
};

export const getApiUrl = (filterkey: string, apiPath: string, categories: string[] = [], isNotRange= false ) => {
    if(isNotRange) {
        return `/api/${apiPath}`;
    }

    if(filterkey === views.all.key) {
        return `/api/${apiPath}?categories=${categories?.join(',')}`;
    }

    const [start, end] = getRangeDateForFilter(filterkey);
    return `/api/${apiPath}?from=${start}&to=${end}&categories=${categories?.join(',')}`;
};

export default url;