import type {Logo} from "@/components/logos/GenericLogo.tsx";
import BashLogo from "@/components/logos/skills/BashLogo.tsx";
import JavaLogo from "@/components/logos/skills/JavaLogo.tsx";
import GitLogo from "@/components/logos/skills/GitLogo.tsx";
import GithubActionsLogo from "@/components/logos/skills/GithubActionsLogo.tsx";
import GithubLogo from "@/components/logos/skills/GithubLogo.tsx";
import GradleLogo from "@/components/logos/skills/GradleLogo.tsx";
import MavenLogo from "@/components/logos/skills/MavenLogo.tsx";
import ReactLogo from "@/components/logos/skills/ReactLogo.tsx";
import ReduxLogo from "@/components/logos/skills/ReduxLogo.tsx";
import TailwindCssLogo from "@/components/logos/skills/TailwindCssLogo.tsx";
import SpringBootLogo from "@/components/logos/skills/SpringBootLogo.tsx";
import TypescriptLogo from "@/components/logos/skills/TypescriptLogo.tsx";
import JavascriptLogo from "@/components/logos/skills/JavascriptLogo.tsx";
import KubernetesLogo from "@/components/logos/skills/KubernetesLogo.tsx";
import LinkedInLogo from "@/components/logos/skills/LinkedInLogo.tsx";
import type {ID} from "@/types/Shared.ts";
import DockerLogo from "@/components/logos/skills/DockerLogo.tsx";
import BABTechnologieLogo from "@/components/logos/work/BABTechnologieLogo.tsx";
import EmailIcon from "@/components/logos/generic/EmailLogo.tsx";
import TUDortmundLogo from "@/components/logos/work/TUDortmundLogo.tsx";

export class LogoProvider {
    private static instance: LogoProvider;

    static getInstance(): LogoProvider {
        if (!LogoProvider.instance) {
            LogoProvider.instance = new LogoProvider();
        }
        return LogoProvider.instance;
    }

    private readonly map;
    private register(id: string, logo: Logo) {
        if (this.map.has(id)) {
            throw new Error(`Logo with id ${id} is already registered.`);
        }
        this.map.set(id, logo);
    }

    private constructor() {
        this.map = new Map<string, Logo>();

        this.register("bash", BashLogo);
        this.register("java", JavaLogo);
        this.register("typescript", TypescriptLogo);
        this.register("javascript", JavascriptLogo);

        this.register("gradle", GradleLogo);
        this.register("maven", MavenLogo);

        this.register("react", ReactLogo);
        this.register("redux", ReduxLogo);
        this.register("tailwindcss", TailwindCssLogo);
        this.register("spring-boot", SpringBootLogo);

        this.register("git", GitLogo);

        this.register("docker", DockerLogo)
        this.register("github-actions", GithubActionsLogo)
        this.register("kubernetes", KubernetesLogo);

        this.register("github", GithubLogo)
        this.register("linked-in", LinkedInLogo);

        this.register("email", EmailIcon)

        this.register("tu-dortmund", TUDortmundLogo);
        this.register("bab-technologie", BABTechnologieLogo)
    }

    public getLogo: (id: ID<unknown> | null | undefined) => Logo | undefined = (id) => {
        return this.map.get(id ?? "");
    }
}