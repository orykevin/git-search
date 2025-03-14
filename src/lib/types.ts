export interface GitHubUserSearchResponse {
    total_count: number;
    incomplete_results: boolean;
    items: GitHubUserSearch[];
}

export interface GitHubUserSearch {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string | null;
    url: string;
    html_url: string;
    followers_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    received_events_url: string;
    type: string;
    score: number;
    following_url: string;
    gists_url: string;
    starred_url: string;
    events_url: string;
    public_repos?: number;
    public_gists?: number;
    followers?: number;
    following?: number;
    created_at?: string;
    updated_at?: string;
    name?: string | null;
    bio?: string | null;
    email?: string | null;
    location?: string | null;
    site_admin: boolean;
    hireable?: boolean | null;
    text_matches?: SearchResultTextMatch[];
    blog?: string | null;
    company?: string | null;
    suspended_at?: string | null;
    user_view_type?: string;
}

export interface SearchResultTextMatch {
    object_url: string;
    object_type: string | null;
    property: string;
    fragment: string;
    matches: Match[];
}

export interface Match {
    text: string;
    indices: number[];
}

type UserViewType = 'basic' | 'advanced' | 'other';

interface Plan {
    collaborators: number;
    name: string;
    space: number;
    private_repos: number;
}

interface User {
    login: string;
    id: number;
    user_view_type: UserViewType;
    node_id: string;
    avatar_url: string;
    gravatar_id: string | null;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string | null;
    company: string | null;
    blog: string | null;
    location: string | null;
    email: string | null;
    notification_email: string | null;
    hireable: boolean | null;
    bio: string | null;
    twitter_username: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
    plan: Plan;
    private_gists?: number;
    total_private_repos?: number;
    owned_private_repos?: number;
    disk_usage?: number;
    collaborators?: number;
    two_factor_authentication?: boolean;
    business_plus?: boolean;
    ldap_dn?: string;
}

interface PrivateUser extends User {
    private_gists: number;
    total_private_repos: number;
    owned_private_repos: number;
    disk_usage: number;
    collaborators: number;
    two_factor_authentication: boolean;
}

interface PublicUser extends User {
    private_gists?: number;
    total_private_repos?: number;
    owned_private_repos?: number;
    disk_usage?: number;
    collaborators?: number;
}

export type GitHubUser = PrivateUser | PublicUser;

export type GithubUserDetails = GitHubUserSearch & {
    userDetails: GitHubUser
}

export interface SimpleUser {
    name: string | null;
    email: string | null;
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string | null;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    starred_at?: string;
    user_view_type?: string;
}

export interface CodeOfConduct {
    key: string;
    name: string;
    url: string;
    body?: string;
    html_url: string | null;
}

export interface License {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
}

export interface SecurityAnalysisStatus {
    status: 'enabled' | 'disabled';
}

export interface SecurityAndAnalysis {
    advanced_security?: SecurityAnalysisStatus;
    dependabot_security_updates?: SecurityAnalysisStatus;
    secret_scanning?: SecurityAnalysisStatus;
    secret_scanning_push_protection?: SecurityAnalysisStatus;
    secret_scanning_non_provider_patterns?: SecurityAnalysisStatus;
    secret_scanning_ai_detection?: SecurityAnalysisStatus;
}

export interface RepositoryPermissions {
    admin: boolean;
    maintain?: boolean;
    push: boolean;
    triage?: boolean;
    pull: boolean;
}

export interface Repository {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    owner: SimpleUser;
    private: boolean;
    html_url: string;
    description: string | null;
    fork: boolean;
    url: string;
    archive_url: string;
    assignees_url: string;
    blobs_url: string;
    branches_url: string;
    collaborators_url: string;
    comments_url: string;
    commits_url: string;
    compare_url: string;
    contents_url: string;
    contributors_url: string;
    deployments_url: string;
    downloads_url: string;
    events_url: string;
    forks_url: string;
    git_commits_url: string;
    git_refs_url: string;
    git_tags_url: string;
    git_url?: string;
    issue_comment_url: string;
    issue_events_url: string;
    issues_url: string;
    keys_url: string;
    labels_url: string;
    languages_url: string;
    merges_url: string;
    milestones_url: string;
    notifications_url: string;
    pulls_url: string;
    releases_url: string;
    ssh_url?: string;
    stargazers_url: string;
    statuses_url: string;
    subscribers_url: string;
    subscription_url: string;
    tags_url: string;
    teams_url: string;
    trees_url: string;
    clone_url?: string;
    mirror_url?: string | null;
    hooks_url: string;
    svn_url?: string;
    homepage?: string | null;
    language?: string | null;
    forks_count?: number;
    stargazers_count?: number;
    watchers_count?: number;
    size?: number;
    default_branch?: string;
    open_issues_count?: number;
    is_template?: boolean;
    topics?: string[];
    has_issues?: boolean;
    has_projects?: boolean;
    has_wiki?: boolean;
    has_pages?: boolean;
    has_downloads?: boolean;
    has_discussions?: boolean;
    archived?: boolean;
    disabled?: boolean;
    visibility?: string;
    pushed_at?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    permissions?: RepositoryPermissions;
    role_name?: string;
    temp_clone_token?: string;
    delete_branch_on_merge?: boolean;
    subscribers_count?: number;
    network_count?: number;
    code_of_conduct?: CodeOfConduct;
    license?: License | null;
    forks?: number;
    open_issues?: number;
    watchers?: number;
    allow_forking?: boolean;
    web_commit_signoff_required?: boolean;
    security_and_analysis?: SecurityAndAnalysis | null;
}