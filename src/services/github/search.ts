import { GitHubUser, GitHubUserSearchResponse } from "@/lib/types";

export const headerOptions = {
    Authorization: `token ${import.meta.env.VITE_GH_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
}

export type SearchUser = Awaited<ReturnType<typeof searchUser>>

export const searchUser = async (query: string, limit = 5) => {
    try {
        const responseSearch = await fetch(`https://api.github.com/search/users?q=${query}&per_page=${limit}`, {
            headers: headerOptions
        });
        const jsonSearch: GitHubUserSearchResponse | undefined = await responseSearch.json()
        if (!jsonSearch) return

        const result = await Promise.all(jsonSearch.items.map(async (user) => {
            const responseUser = await fetch(user.url, {
                headers: headerOptions
            })
            const jsonUser: GitHubUser = await responseUser.json()

            return { ...user, userDetails: jsonUser }
        }))
        return result

    } catch (e) {
        console.log(e)
    }
}