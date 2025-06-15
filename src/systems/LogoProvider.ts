import type {Logo} from "@/components/logos/GenericLogo.tsx";
import BashLogo from "@/components/logos/BashLogo.tsx";
import JavaLogo from "@/components/logos/JavaLogo.tsx";
import GitLogo from "@/components/logos/GitLogo.tsx";
import GithubActionsLogo from "@/components/logos/GithubActionsLogo.tsx";
import GithubLogo from "@/components/logos/GithubLogo.tsx";
import GradleLogo from "@/components/logos/GradleLogo.tsx";
import MavenLogo from "@/components/logos/MavenLogo.tsx";
import ReactLogo from "@/components/logos/ReactLogo.tsx";
import ReduxLogo from "@/components/logos/ReduxLogo.tsx";
import TailwindCssLogo from "@/components/logos/TailwindCssLogo.tsx";
import SpringBootLogo from "@/components/logos/SpringBootLogo.tsx";
import TypescriptLogo from "@/components/logos/TypescriptLogo.tsx";
import JavascriptLogo from "@/components/logos/JavascriptLogo.tsx";
import KubernetesLogo from "@/components/logos/KubernetesLogo.tsx";
import LinkedInLogo from "@/components/logos/LinkedInLogo.tsx";
import type {ID} from "@/types/Shared.ts";
import DockerLogo from "@/components/logos/DockerLogo.tsx";

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
    }

    public getLogo: (id: ID<unknown>) => Logo | undefined = (id) => {
        return this.map.get(id);
    }
}