export type ID<T> = string & { __type: T };
export type LanguageKey<T> = string & { __type: T };
export type ExternalLink = string & { __type: "ExternalLink" };
export type LocalLink = string & { __type: "LocalLink" };
export type RGBColor = string & { __type: "RGBCOLOR" };

export type ISO8601Date = ID<"ISO8601Date">;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Reference<T> = { __type: "reference" };

export interface LocalizedString {
    en?: string;
    de?: string;
}

export interface LocalizedText {
    en?: string;
    de?: string;
}

type ResolveReference<T> = T extends Reference<infer U> ? U : T;

export type Resolved<T> = {
    [K in keyof T]: ResolveReference<T[K]>
};