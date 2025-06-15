export type ID<T> = string & { __type: T };
export type LanguageKey<T> = string & { __type: T };
export type ExternalLink = string & { __type: "ExternalLink" };
export type LocalLink = string & { __type: "LocalLink" };
export type RGBColor = string & { __type: "RGBCOLOR" };

export type ISO8601Date = ID<"ISO8601Date">;