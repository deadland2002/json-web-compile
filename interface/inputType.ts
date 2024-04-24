interface InputType {
    title: string;
    page: {
        header: {
            logo: string;
        };
        tabs: {
            path: string;
            link: string;
        }[];
        sidebar: {
            title: string;
            link: string;
        }[];
        body: BodyKeys[]
    };
}

interface BodyKeys {
    type: 'heading1' | 'heading2' | 'heading3' | 'heading4' | 'link' | 'code' | 'para';
    content: string;
    special?:string
    children ?: BodyKeys[];
}

export {InputType}
