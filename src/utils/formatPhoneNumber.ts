export const formatPhoneNumber = (phone: string): string => {
    return phone
        .replace(/\D/, "")
        .replace(/^(\d)(\d+)(\d\d\d)(\d\d)(\d\d)$/, '+$1 ($2) $3 $4 $5');
}
