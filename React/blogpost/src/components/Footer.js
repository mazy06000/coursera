const Footer = () => {
    const today = new Date();
    return (
        <footer className="Footer">
            <p>&copy; {today.getFullYear()} React JS Blog</p>
        </footer>
    )
}

export default Footer