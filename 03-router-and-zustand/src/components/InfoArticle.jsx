export const InfoArticle = ( {icon, title, description }) => {
    return (
        <article>
            {icon}
            <h3>{title}</h3>
            <p>{description}</p>
        </article>
    )
}