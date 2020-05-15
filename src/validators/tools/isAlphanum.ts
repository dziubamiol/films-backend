import validator from 'validator';
import { AlphanumericLocale } from 'validator/lib/isAlphanumeric';

export const supportedLocales: Array<AlphanumericLocale> = [
    'uk-UA',
    'en-US',
    'ru-RU',
];

type method = (str: string, locale?: AlphanumericLocale) => boolean;

const localeWrapper = (method: method, value: string, locales: Array<AlphanumericLocale> = supportedLocales) => {
    for (const locale of locales) {
        console.log(method, value, locale);
        if (method(value, locale)) {
            console.log(locale);
            return true;
        }
    }

    return false;
}


export const isAlphanumeric = (value: string, allowed?: string,  locales: Array<AlphanumericLocale> = supportedLocales) => {
    if (allowed) {
        const words = value.split(allowed);

        for (const word of words) {
            if (!localeWrapper(validator.isAlphanumeric, word, locales)) return false;
        }
        return true;
    }

    return localeWrapper(validator.isAlphanumeric, value, locales);
}

export const isAlpha = (value: string, allowed?: string, locales: Array<AlphanumericLocale> = supportedLocales) => {
    if (allowed) {
        const words = value.split(allowed);

        for (const word of words) {
            if (!localeWrapper(validator.isAlpha, word, locales)) return false;
        }
        return true;
    }

    return localeWrapper(validator.isAlpha, value, locales);
}
