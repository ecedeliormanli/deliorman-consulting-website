import {localize, setLocale} from "@vee-validate/i18n";
import {all} from '@vee-validate/rules';
import {configure, defineRule} from 'vee-validate';

Object.entries(all).forEach(([name, rule]) => {
    defineRule(name, rule);
});

defineRule('phone', (value) => {
    if (!value) return true;
    const phoneRegex = /^\([1-9]\d{2}\)\s\d{3}\s\d{4}$/;
    return phoneRegex.test(value) || configure(phoneRegex);
});
defineRule('invalidPhoneStart', (value) => {
    if (value.startsWith('(0')) {
        return configure('invalidPhoneStart');
    }
    return true;
});
defineRule('invalidPhoneFormat', (value) => {
    const phoneRegex = /^\([1-9]\d{2}\)\s\d{3}\s\d{4}$/;
    if (!phoneRegex.test(value)) {
        return configure('invalidPhoneFormat')
    }
    return true;
});
defineRule('postalCode', (value) => {
    const postalCodeRegex = /^[0-9]{5}$/;
    return postalCodeRegex.test(value) || configure(postalCodeRegex);
});
defineRule('specialCharacter', (value) => {
    const specialCharacterRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>+\-]).+$/;
    return specialCharacterRegex.test(value) || configure(specialCharacterRegex);
});
defineRule('fax', (value) => {
    const faxRegex = /^\(\d{3}\)\s\d{3}\s\d{4}$/;
    return faxRegex.test(value) || configure(faxRegex);
});
defineRule('username', (value) => {
    if (!value || value.trim() === '') {
        return true;
    }
    const usernameRegex = /^(?=.*[a-zA-ZçÇğĞüÜşŞöÖıİ])[a-zA-Z0-9çÇğĞüÜşŞöÖıİ.-]+$/;
    return usernameRegex.test(value) || configure(usernameRegex);
});
defineRule('customEmail', (value) => {
    if (!value || !value.includes('@')) {
        return true;
    }
    const [localPart] = value.split('@');
    if (localPart.length > 64) {
        return configure(localPart);
    }

    return true;
});
defineRule('ip', (value) => {
    if (!value || value.trim() === '') {
        return true;
    }
    const ipRegex = /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}/;
    return ipRegex.test(value) || configure(ipRegex);

})
defineRule('exactLength', (value, length) => {
    const val = value || '';
    const len = parseInt(length, 10);
    if (val === '') return true;//bossa gecsin
    if (val.length === len) {
        return true;
    }
    return configure(value);
});
defineRule('exactLengthForPhone', (value, length) => {
    const digitsOnly = (value || '').replace(/\D/g, ''); // Sadece rakamlar
    const requiredLength = parseInt(length, 10);

    if (digitsOnly.length === requiredLength) {
        return true;
    }

    return configure(value);
});
defineRule('startsWithValidChar', (value) => {
    if (!value) return true;
    const valid = /^[a-zA-Z0-9çÇğĞüÜşŞöÖıİ]/.test(value);
    return valid || configure(valid);
});

defineRule('noSpaces', (value) => {
    if (!value) return true;
    const valid = !/\s/.test(value);
    return valid || configure(valid);
});

defineRule('startsWithoutSpace', (value) => {
    if (!value) return true;
    const valid = !/^\s/.test(value);
    return valid || configure(valid);
});
defineRule('endsWithoutSpace', (value) => {
    if (!value) return true;
    const valid = !/\s$/.test(value);
    return valid || configure(valid);
});
defineRule('turkishIban', (value) => {
    // Boşlukları ve 'TR' ifadesini kaldırır
    const ibanNumeric = value.replace(/\s+/g, '').toUpperCase();

    if (!ibanNumeric.startsWith('TR')) {
        return configure('invalidIbanStart');
    }

    if (ibanNumeric.length !== 26) {
        return configure('value');
    }

    // IBAN'ın geri kalanı sadece rakamlardan oluşmalı
    const ibanDigits = ibanNumeric.slice(2);
    if (!/^\d{24}$/.test(ibanDigits)) {
        return configure('invalidIbanCharacters');
    }

    return true;
});
defineRule('startBeforeEnd', (value, [endDate]) => {
    if (!value || !endDate) return true;
    return new Date(value) <= new Date(endDate) || configure('startBeforeEnd');
});
defineRule('minMax', (value, [max]) => {
    if (value === null || value === undefined || value === '' || !max) return true;
    return value <= max || configure('minMax');
});
defineRule('cannotBeEqual', (value, [a, b]) => {
    if (value === null || value === undefined || value === '' || !a || !b) return true;
    return a !== b || configure('cannotBeEqual');
});
defineRule('workHoursLimit', (value, [start, end]) => {
    if (value === null || value === undefined || value === '' || !start || !end) return true;
    return (end - start) <= (9 * 60) || configure('workHoursLimit');
});
defineRule('onlyLetters', (value) => {
    if (!value || value.trim() === '') {
        return true;
    }
    const letterRegex = /^[a-zA-ZçÇşŞğĞüÜöÖıİ ]+$/;
    return letterRegex.test(value) || configure(letterRegex);
});
defineRule('onlyNumbers', (value) => {
    if (!value || value.trim() === '') {
        return true;
    }
    const numericRegex = /^[0-9]+$/;
    return numericRegex.test(value) || configure(numericRegex);
});
defineRule("decimal", (value, length) => {
    if (!value || value.trim() === '' || !value.includes('.')) {
        return true;
    }

    const decimalPart = value.split(".")[1];
    if (decimalPart && decimalPart.length <= length[0]) {
        return true;
    }
    return configure(decimalPart);
});
defineRule('minimumAge', (value) => {
    if (!value) return true;
    const enteredDate = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - enteredDate.getFullYear();
    const isBeforeBirthday =
        today.getMonth() < enteredDate.getMonth() ||
        (today.getMonth() === enteredDate.getMonth() && today.getDate() < enteredDate.getDate());

    const actualAge = isBeforeBirthday ? age - 1 : age;

    return actualAge >= 18 || configure('minimumAge');
});
defineRule('validTime', (value) => {
    if (value > 1439 || value < 0) {
        return configure('value');
    }
    return true;
});

defineRule('booleanRequired', value => {
    if ((value === false || value === true)) return true;
    else return configure('booleanRequired');
});


defineRule('ipList', value => {
    if (!value) return true;
    const lines = value.split('\n').map(l => l.trim()).filter(Boolean);

    const ipv4Regex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
    for (const ip of lines) {
        if (!ipv4Regex.test(ip)) {
            return configure('ipList');
        }
    }

    return true;
});

configure({
    generateMessage: localize({
        en: {
            messages: {
                required: 'This field is required.',
                min: context => `This field must be ${context.rule.params.shift()} characters or more.`,
                max: context => `This field must be less than ${context.rule.params.shift()} characters.`,
                max_value: context => `This field must be lower or equal than ${context.rule.params.shift()}.`,
                min_value: context => `This field must be higher than ${context.rule.params.shift()}.`,
                decimal: context => `This field must be numeric and may contain ${context.rule.params.shift()} decimal points.`,
                phone: 'Please enter valid GSM phone number without leading zeros.',
                invalidPhoneFormat: 'Please enter valid GSM phone number.',
                invalidPhoneStart: 'Please enter valid GSM phone number without leading zeros.',
                email: 'Please enter a valid e-mail address.',
                specialCharacter: 'The password must contain at least one special character and one number.',
                postalCode: 'Please enter a valid postal code.',
                confirmed: context => `Passwords do not match.`,
                fax: 'Please enter a valid fax number.',
                username: 'Username may contain at least one letter. And may contain numbers, dashes (-), and dots (.).',
                customEmail: 'before @ part cannot exceed 64 characters.',
                exactLength: context => `This field must be exactly ${context.rule.params.shift()} characters long.`,
                exactLengthForPhone: context => `This field must be exactly ${context.rule.params.shift()} characters long.`,
                startsWithValidChar: "This field cannot start with a special character!",
                endsWithoutSpace: "This field cannot end with a space!",
                startsWithoutSpace: "This field cannot start with a space!",
                noSpaces: "This field cannot includes space!",
                invalidIbanStart: 'IBAN must start with "TR".',
                invalidIbanLength: 'IBAN must be exactly 26 characters long.',
                invalidIbanCharacters: 'IBAN must contain only numeric characters after "TR".',
                turkishIban: 'This field must be exactly 26 characters long.',
                startBeforeEnd: 'The date set as the start cannot be later than the date set as the end.',
                onlyLetters: 'This field only accepts letters.',
                onlyNumbers: 'This field only accepts numbers(0-9).',
                minMax: 'The minimum value cannot be greater than the maximum value.',
                minimumAge: `Employee cannot be under 18 years old.`,
                workHoursLimit: `Excuse leave duration day exceeds working hours(9 hours).`,
                cannotBeEqual: `This fields cannot be equal.`,
                validTime: `Please enter a valid time (00:00 - 23:59).`,
                booleanRequired: `This field is required.`,
                ipList: `iplist`,
            }
        },
        tr: {
            messages: {
                required: 'Bu alan zorunludur.',
                min: context => `Bu alan en az ${context.rule.params.shift()} karakter uzunluğunda olmalıdır.`,
                max: context => `Bu alan ${context.rule.params.shift()} karakterden kısa olmalıdır.`,
                max_value: context => `Bu alan ${context.rule.params.shift()} değerinden küçük olmalıdır.`,
                min_value: context => `Bu alan ${context.rule.params.shift()} değerinden büyük olmalıdır.`,
                decimal: context => `Bu alan sayısal olmalı ve ${context.rule.params.shift()} ondalık basamak içerebilir.`,
                phone: 'Lütfen geçerli GSM telefon numarasını başında sıfır olmadan giriniz.',
                invalidPhoneFormat: 'Telefon numarası geçerli formatta olmalıdır.',
                invalidPhoneStart: 'Telefon numarası 0 ile başlamamalıdır.',
                email: 'Lütfen geçerli bir e-posta adresi giriniz.',
                specialCharacter: 'Parola en az bir özel karakter ve bir rakam içermelidir.',
                postalCode: 'Lütfen geçerli bir posta kodu giriniz.',
                confirmed: 'Parolalar eşleşmiyor.',
                fax: 'Lütfen geçerli bir faks numarası giriniz.',
                username: 'Kullanıcı adı en az bir harf içermelidir. Rakam, tire (-) ve nokta (.) içerebilir.',
                customEmail: '@ öncesindeki kısım en fazla 64 karakter olabilir.',
                exactLength: context => `Bu alan tam olarak ${context.rule.params.shift()} karakter uzunluğunda olmalıdır.`,
                exactLengthForPhone: context => `Bu alan tam olarak ${context.rule.params.shift()} karakter uzunluğunda olmalıdır.`,
                startsWithValidChar: "Bu alan özel karakter ile başlayamaz!",
                endsWithoutSpace: "Bu alan boşluk ile bitemez!",
                startsWithoutSpace: "Bu alan boşluk ile başlayamaz!",
                noSpaces: "Bu alan boşluk içeremez!",
                invalidIbanStart: 'IBAN "TR" ile başlamalıdır.',
                invalidIbanLength: 'IBAN tam olarak 26 karakter uzunluğunda olmalıdır.',
                invalidIbanCharacters: 'IBAN "TR" sonrası sadece rakam içermelidir.',
                turkishIban: 'Bu alan tam olarak 26 karakter uzunluğunda olmalıdır.',
                startBeforeEnd: 'Başlangıç olarak belirlenen tarih, bitiş olarak belirlenen tarihden ileri olamaz.',
                onlyLetters: 'Bu alan yalnızca harf kabul eder.',
                onlyNumbers: 'Bu alan yalnızca sayı kabul eder(0-9).',
                minMax: 'Minimum değer maksimum değerden büyük olamaz.',
                minimumAge: `Personel 18 yaşından küçük olamaz.`,
                workHoursLimit: `Mazeret izninin süresi çalışma saatini aşıyor(9 saat).`,
                cannotBeEqual: `Bu alanlar eşit olamaz.`,
                validTime: `Geçerli bir saat giriniz (00:00 - 23:59).`,
                booleanRequired: `Bu alan zorunludur.`,
                ipList: `ipList`,
            }
        }
    })
});

setLocale('tr');