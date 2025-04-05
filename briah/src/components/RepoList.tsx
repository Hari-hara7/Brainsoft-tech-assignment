import { Repo } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  repos: Repo[];
}

export const RepoList = ({ repos }: Props) => {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Repositories</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {repos.map((repo) => (
            <Card key={repo.id} className="border border-muted hover:shadow-lg">
              <CardHeader>
                <CardTitle>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {repo.name}
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {repo.description || "No description provided."}
                </p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
