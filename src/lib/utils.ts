import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import type {LocalLink} from "@/types/Shared.ts";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function nil(c: unknown): boolean {
    return c === null || c === undefined
}

export function fetchRessource<T>(url: LocalLink) {
    return fetch("." + url).then((resp) => resp.json()) as Promise<T>
}

export function groupBy<T, K>(array: T[], keyGetter: (item: T) => K): Map<K, T[]> {
    return array.reduce((map, item) => {
        const key = keyGetter(item);
        let collection = map.get(key);
        if (!collection) {
            collection = [];
            map.set(key, collection);
        }
        collection.push(item);
        return map;
    }, new Map<K, T[]>());
}