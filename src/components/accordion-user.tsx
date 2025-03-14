import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { GithubUserDetails, Repository } from "@/lib/types";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  ChevronDownIcon,
  GitFork,
  Globe,
  Loader2,
  MapPin,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import moment from "moment";
import { getRepository } from "@/services/github/repository";
import Github from "@/assets/icons/github";
import Twitter from "@/assets/icons/twitter";
import { cn, normalizeLink } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { githubColors } from "@/lib/github-lang-color";

type Props = {
  userData: GithubUserDetails;
};

export default function AccordionUser({ userData }: Props) {
  const [repos, setRepos] = useState<Repository[] | null | undefined>(
    undefined
  );

  useEffect(() => {
    getRepository(userData.login)
      .then((res) => {
        setRepos(res || null);
      })
      .catch(() => {
        setRepos(null);
      });
  }, [userData]);

  return (
    <div className="space-y-4 border-y border-muted">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          value={userData.login}
          key={userData.login}
          className="py-2"
        >
          <AccordionPrimitive.Header className="flex sticky top-0 bg-card">
            <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between rounded-md py-2 text-left text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] [&[data-state=open]>svg]:rotate-180">
              <span className="flex items-center gap-3">
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border overflow-hidden"
                  aria-hidden="true"
                >
                  <img src={userData.avatar_url} alt={userData.login} />
                </span>
                <span className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <p>{userData.userDetails?.name || userData.login}</p>
                    <Badge className="self-baseline mt-0.5" variant="outline">
                      {userData.userDetails.type}
                    </Badge>
                  </div>
                  <p
                    className={
                      userData.userDetails.name
                        ? "text-sm text-muted-foreground"
                        : "hidden"
                    }
                  >
                    @{userData.login}
                  </p>
                </span>
              </span>
              <ChevronDownIcon
                size={16}
                className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
                aria-hidden="true"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionContent className="pb-2 border-t border-muted pt-3">
            <div className="flex items-center justify-between mb-1">
              {userData.userDetails.bio && (
                <p className="text-sm md:text-base w-full">
                  {userData.userDetails.bio}
                </p>
              )}
              <div
                className={cn(
                  "flex justify-start items-center gap-2 min-w-[84px]",
                  userData.userDetails.bio && "justify-end"
                )}
              >
                <a aria-hidden="true" href={userData.html_url} target="_blank">
                  <Github className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" />
                </a>
                {userData.userDetails.twitter_username && (
                  <a
                    aria-hidden="true"
                    href={`https://x.com/${userData.userDetails.twitter_username}`}
                    target="_blank"
                  >
                    <Twitter className="w-4 h-4 md:w-5 md:h-5 cursor-pointer" />
                  </a>
                )}
                {userData.userDetails.blog && (
                  <a
                    aria-hidden="true"
                    href={normalizeLink(userData.userDetails.blog)}
                    target="_blank"
                  >
                    <Globe className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" />
                  </a>
                )}
              </div>
            </div>
            <div className="flex gap-2 text-muted-foreground">
              <div className="flex items-center gap-1 my-2 text-xs md:text-base">
                <MapPin size={16} />
                <p>{userData.userDetails.location || " - "}</p>
              </div>
              <div className="flex items-center gap-1 my-1 text-xs md:text-base">
                <p>Followers : </p>
                <p>{userData.userDetails.followers}</p>
              </div>
              <div className="flex items-center gap-1 my-1 text-xs md:text-base">
                <p>Following : </p>
                <p>{userData.userDetails.following}</p>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-2 sm:gap-1 2xl:grid-cols-3">
              {repos === undefined ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="animate-spin my-2" />
                  <p>Getting repositories</p>
                </div>
              ) : repos === null ? (
                <p className="text-red-500">
                  Error when getting repository, please try again
                </p>
              ) : repos.length > 0 ? (
                repos.map((repo) => (
                  <div className="flex flex-col justify-between p-1.5 px-2 border border-muted rounded-sm my-1 sm:col-span-1">
                    <div>
                      <a
                        className="text-lg font-semibold hover:underline"
                        href={repo.html_url}
                        target="_blank"
                      >
                        {repo.name}
                      </a>
                      <p className="text-xs text-muted-foreground">
                        {repo.description}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mt-2 mb-1">
                        <div className="flex items-center gap-1">
                          <Star
                            fill={
                              repo.stargazers_count ? "#fcdf03" : "transparent"
                            }
                            size={16}
                          />
                          {repo.stargazers_count || 0}
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork size={16} />
                          {repo.forks_count || 0}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-muted-foreground text-xs mb-0.5 mt-2">
                        <Badge
                          className="px-2 py-0"
                          variant="outline"
                          style={{
                            borderColor: repo.language
                              ? `${
                                  githubColors[
                                    repo.language as keyof typeof githubColors
                                  ]
                                }`
                              : "grey",
                            backgroundColor: repo.language
                              ? `${
                                  githubColors[
                                    repo.language as keyof typeof githubColors
                                  ]
                                }40`
                              : "transparent",
                          }}
                        >
                          {repo.language || " - "}
                        </Badge>
                        {repo.updated_at && (
                          <p>Updated {moment(repo.updated_at).fromNow()}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center my-3 text-muted-foreground">
                  {userData.login} doesn't have any public repositories
                </p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
