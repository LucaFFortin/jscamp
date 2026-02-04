import { JobCard } from "./JobCard"

export const JobListings = ({ jobList }) => {
    return (
        <div className="job-listings-container">
            {
                jobList.map(job => {
                    return (
                        <JobCard key={job.id} job={job} />
                    )
                })
            }
        </div>
    )
}