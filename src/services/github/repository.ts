import { Repository } from "@/lib/types";
import { headerOptions } from "./search"


export const getRepository = async (username: string) => {
    try {
        const responseRepo = await fetch(`https://api.github.com/users/${username}/repos`, { headers: headerOptions })
        const jsonRepo: Repository[] = await responseRepo.json();
        if (!jsonRepo) return null
        return jsonRepo
    } catch (e) {
        console.log(e)
    }
}