import reduxCookiesMiddleware, {getStateFromCookies} from 'redux-cookies-middleware';

const paths = {'bookmark.bookmarks': {name: 'bookmarks'}};
const emptyState = {bookmark: {bookmarks: []}};
export const initialState = getStateFromCookies(emptyState, paths);
export const createCookieMiddleware = () => reduxCookiesMiddleware(paths);
