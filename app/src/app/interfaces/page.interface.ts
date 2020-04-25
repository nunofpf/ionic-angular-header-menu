interface IPage {
    title: string;
    url: string;
}

export class Page {
    title: string;
    url: string;

    constructor(obj: IPage) {
        this.title = obj.title;
        this.url = obj.url;
    }
}

export const pages = {
    LOGIN: new Page({
        title: 'Login',
        url: '/login'
    }),
    HOME: new Page({
        title: 'Home',
        url: '/home'
    }),
    CONTACT: new Page({
        title: 'Contact',
        url: '/contact'
    })
};

export function pagesArray(): Array<Page> {
    const pageArray = new Array<Page>();
    for (const key in pages) {
        if (pages[key]) {
            pageArray.push(pages[key]);
        }
    }
    return pageArray;
}
