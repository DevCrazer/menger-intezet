export interface Post {
  id:                            number;
  date:                          Date;
  date_gmt:                      Date;
  guid:                          GUID;
  modified:                      Date;
  modified_gmt:                  Date;
  slug:                          string;
  status:                        string;
  type:                          string;
  link:                          string;
  title:                         GUID;
  content:                       Content;
  excerpt:                       Content;
  author:                        number;
  featured_media:                number;
  comment_status:                string;
  ping_status:                   string;
  sticky:                        boolean;
  template:                      string;
  format:                        string;
  meta:                          Meta;
  categories:                    number[];
  tags:                          number[];
  "jetpack-related-posts":       JetpackRelatedPost[];
  jetpack_featured_media_url:    string;
  jetpack_publicize_connections: any[];
  jetpack_shortlink:             string;
  jetpack_sharing_enabled:       boolean;
  jetpack_likes_enabled:         boolean;
  _links:                        Links;
}

export interface FilteredPost {
  id:                            number;
  slug:                          string;
  title:                         GUID;
  content:                       Content;
  excerpt:                       Content;
  jetpack_featured_media_url:    string;

}

export interface Links {
  self:                  About[];
  collection:            About[];
  about:                 About[];
  author:                Author[];
  replies:               Author[];
  "version-history":     VersionHistory[];
  "predecessor-version": PredecessorVersion[];
  "wp:featuredmedia":    Author[];
  "wp:attachment":       About[];
  "wp:term":             WpTerm[];
  curies:                Cury[];
}

export interface About {
  href: string;
}

export interface Author {
  embeddable: boolean;
  href:       string;
}

export interface Cury {
  name:      string;
  href:      string;
  templated: boolean;
}

export interface PredecessorVersion {
  id:   number;
  href: string;
}

export interface VersionHistory {
  count: number;
  href:  string;
}

export interface WpTerm {
  taxonomy:   string;
  embeddable: boolean;
  href:       string;
}

export interface Content {
  rendered:  string;
  protected: boolean;
}

export interface GUID {
  rendered: string;
}

export interface JetpackRelatedPost {
  id:       number;
  url:      string;
  url_meta: URLMeta;
  title:    string;
  date:     string;
  format:   boolean;
  excerpt:  string;
  rel:      string;
  context:  string;
  img:      Img;
  classes:  any[];
}

export interface Img {
  alt_text: string;
  src:      string;
  width:    number;
  height:   number;
}

export interface URLMeta {
  origin:   number;
  position: number;
}

export interface Meta {
  advanced_seo_description:          string;
  _coblocks_attr:                    string;
  _coblocks_dimensions:              string;
  _coblocks_responsive_height:       string;
  _coblocks_accordion_ie_support:    string;
  jetpack_anchor_podcast:            string;
  jetpack_anchor_episode:            string;
  jetpack_anchor_spotify_show:       string;
  jetpack_publicize_message:         string;
  jetpack_is_tweetstorm:             boolean;
  jetpack_publicize_feature_enabled: boolean;
}

export interface Error {
  code: string,
  message: string,
  data: {
    status: number
  }
}