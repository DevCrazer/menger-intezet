export interface Tag {
    id:          number;
    count:       number;
    description: string;
    link:        string;
    name:        string;
    slug:        string;
    taxonomy:    Taxonomy;
    meta:        any[];
    _links:      Links;
}

export interface Links {
    self:           About[];
    collection:     About[];
    about:          About[];
    "wp:post_type": About[];
    curies:         Cury[];
}

export interface About {
    href: string;
}

export interface Cury {
    name:      Name;
    href:      Href;
    templated: boolean;
}

export enum Href {
    HTTPSAPIWOrgRel = "https://api.w.org/{rel}",
}

export enum Name {
    Wp = "wp",
}

export enum Taxonomy {
    PostTag = "post_tag",
}
