import styles from "./JobsNavigation.module.css"

export const JobsNavigation = ({ currentPage = 1, totalPages = 10, onPageChange }) => {

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

    const isFirstPageStyles = {
        opacity: (currentPage === 1) ? 0.5 : 1,
        cursor: (currentPage === 1) ? 'not-allowed' : 'pointer'
    }

    const isLastPageStyles = {
        opacity: (currentPage === totalPages) ? 0.5 : 1,
        cursor: (currentPage === totalPages) ? 'not-allowed' : 'pointer'
    }

    const handlePrevPage = e => {
        e.preventDefault()
        if (currentPage !== 1) {
            onPageChange(currentPage - 1)
        }
    }

    const handleNextPage = e => {
        e.preventDefault()
        if (currentPage !== totalPages) {
            onPageChange(currentPage + 1)
        }
    }

    const handlePageChange = (e, page) => {
        e.preventDefault()
        if (currentPage !== page) {
            onPageChange(page)
        }
    }

    return (
        <nav className={styles.pagination} >
            <a className="prev-page" onClick={handlePrevPage} style={isFirstPageStyles}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 6l-6 6l6 6" />
                </svg>
            </a>

            {
                pages.map(page => (
                    <a key={page} className={currentPage === page ? styles.isActive : ""} onClick={event => handlePageChange(event, page)}>{page}</a>
                ))
            }

            <a className="next-page" onClick={handleNextPage} style={isLastPageStyles}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 6l6 6l-6 6" />
                </svg>
            </a>
        </nav>
    )
}