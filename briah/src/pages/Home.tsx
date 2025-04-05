import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { RepoList } from "../components/RepoList";
import { CommitChart } from "../components/CommitChart";
import { Repo, CommitData } from "../types";

export const Home = () => {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [commitData, setCommitData] = useState<CommitData[]>([]);
  const [error, setError] = useState("");

  const fetchRepos = async () => {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!res.ok) throw new Error("Failed to fetch repositories");
    return res.json();
  };

  const fetchCommits = async () => {
    const res = await fetch(`https://api.github.com/users/${username}/events`);
    if (!res.ok) throw new Error("Failed to fetch events");
    const events = await res.json();

    const commitsMap: { [date: string]: number } = {};

    events.forEach((event: any) => {
      if (event.type === "PushEvent") {
        const date = new Date(event.created_at).toISOString().split("T")[0];
        commitsMap[date] = (commitsMap[date] || 0) + event.payload.commits.length;
      }
    });

    return Object.entries(commitsMap).map(([date, count]) => ({
      date,
      count,
    }));
  };

  const handleAnalyze = async () => {
    setError("");
    setRepos([]);
    setCommitData([]);
    try {
      const repoList = await fetchRepos();
      const commits = await fetchCommits();
      setRepos(repoList);
      setCommitData(commits);
    } catch (err) {
      setError("User not found or API rate limit exceeded");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-3xl text-center">GitHub Profile Analyzer</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAnalyze();
          }}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="username">GitHub Username</Label>
            <div className="flex gap-2 mt-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="eg: torvalds"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  Enter a valid GitHub username to analyze
                </TooltipContent>
              </Tooltip>
              <Button type="submit">Analyze</Button>
            </div>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}
        </form>

        <Separator className="my-6" />

        {repos.length > 0 && <RepoList repos={repos} />}
        {commitData.length > 0 && <CommitChart data={commitData} />}
      </CardContent>
    </Card>
  );
};
