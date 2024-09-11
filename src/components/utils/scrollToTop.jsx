export default function scrollToTop() {
    document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
}
