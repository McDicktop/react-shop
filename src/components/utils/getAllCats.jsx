export default function getAllCats(array) {
    return Array.from(new Set(array.map((el) => el.category)))
}