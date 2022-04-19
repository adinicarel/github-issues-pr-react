export interface Issue {
    id: number,
    number: number,
    title: string,
    user: {
        login: string,
    },
    created_at: string,
    comments: number,
    labels: [
        {
            name: string,
            id: number
        }
    ] | [],
    pull_request?: {} | undefined,
    body: string,
    url: '',
}


export interface IssuesProps {
    issues: Issue[] | null;
}


export interface IssueItemProps {
    issue: Issue | null;
}