export type CardSeries = "build" | "grow";

export interface CardItem {
  id: string;
  series: CardSeries;
  title: string;
  subtitle: string;
  intro: string;
  url: string;
  icon: string;
}

export type CardLocale = "zh" | "en";

export const cards: CardItem[] = [
  {
    id: "product-library",
    series: "build",
    title: "对话式 AI 创新产品库",
    subtitle: "发现全球最值得关注的 Conversational AI 产品",
    intro: "收录 Voice Agent、Physical AI、AI Hardware 等创新产品与案例，帮助开发者了解下一代人机交互正在如何落地，激发产品灵感。",
    url: "https://realtime.feishu.cn/docx/FFcedfbkNoNA3OxeD2IcdRWbnLf",
    icon: "product-library"
  },
  {
    id: "tool-library",
    series: "build",
    title: "对话式 AI 技术工具库",
    subtitle: "构建 Voice Agent 的前沿模型与工具推荐",
    intro: "汇集 TTS、STT、端到端语音、Agent Framework、API 与开发工具等 SOTA 技术方案，帮助你为自己的产品选择合适技术栈。",
    url: "https://realtime.feishu.cn/docx/FFcedfbkNoNA3OxeD2IcdRWbnLf",
    icon: "tool-library"
  },
  {
    id: "curious-handbook",
    series: "build",
    title: "对话式 AI 好奇者手册",
    subtitle: "开始构建对话式 AI 的第一本指南",
    intro: "面向刚入门的开发者，从基础概念、典型场景到第一个 Voice Agent Demo，帮助你快速建立对话式 AI 的产品和技术认知。",
    url: "https://www.rtecommunity.dev/conversational-ai-for-the-curious/",
    icon: "curious-handbook"
  },
  {
    id: "voice-agent-notes",
    series: "build",
    title: "Voice Agent 学习笔记",
    subtitle: "拆解前沿模型与产品背后的创造者思考",
    intro: "持续整理 Voice Agent 领域的新模型、新产品、论文与访谈，理解一线创造者如何思考场景、打磨体验，并构建下一代语音智能体。",
    url: "https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzg3NjgwMjUzOQ==&action=getalbum&album_id=3750223865243058180",
    icon: "voice-agent-notes"
  },
  {
    id: "physical-ai-notes",
    series: "build",
    title: "Physical AI 学习笔记",
    subtitle: "当对话式 AI 进入现实世界",
    intro: "聚焦 AI 硬件、机器人、可穿戴、端侧智能与多模态交互，观察团队如何把语音、视觉、传感器和硬件结合成可用的 Physical AI 产品。",
    url: "https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzg3NjgwMjUzOQ==&action=getalbum&album_id=4481188326909313031",
    icon: "physical-ai-notes"
  },
  {
    id: "agent-recipe-library",
    series: "build",
    title: "Agent Recipe Library",
    subtitle: "可直接复用的 Voice Agent 代码配方",
    intro: "提供视觉、RAG、记忆、工具调用、MCP、多模型切换、打断处理等典型 Recipes，帮助你从示例代码快速改出自己的实时对话 Agent。",
    url: "https://github.com/AgoraIO-Conversational-AI/",
    icon: "agent-recipe-library"
  },
  {
    id: "agent-skill-library",
    series: "build",
    title: "Agora Skills",
    subtitle: "用 AI Coding Assistant 快速搭建实时对话应用",
    intro: "Agora 官方知识包，帮助 AI Coding Assistant 选对产品、接入凭证并跑通第一个 Demo，适合快速搭建 Voice Agent、AI Companion、AI Tutor、AI 客服与 Physical AI 应用。",
    url: "https://github.com/AgoraIO-Conversational-AI/",
    icon: "agent-skill-library"
  },
  {
    id: "agora-agents",
    series: "build",
    title: "Agora Agents",
    subtitle: "快速构建实时对话 Agent 的开发平台",
    intro: "基于 Agora 实时互动基础设施，提供构建、部署和管理 Voice Agent 与多模态 Agent 的完整开发体验。",
    url: "https://github.com/AgoraIO-Conversational-AI/",
    icon: "agora-agents"
  },
  {
    id: "rte-meetup",
    series: "build",
    title: "RTE Meetup",
    subtitle: "最关心实时 AI 的一群人都来了",
    intro: "RTE 社区旗舰线下活动，通过主题分享、圆桌讨论与 Lightning Demo，连接开发者、创业者与研究者，共同探索实时互动与对话式 AI 的未来。",
    url: "https://www.rtecommunity.dev/events",
    icon: "rte-meetup"
  },
  {
    id: "real-time-ai-cafe",
    series: "build",
    title: "Real-Time AI Cafe",
    subtitle: "咖啡一杯，Token 无限",
    intro: "一个让开发者聚在一起实时 coding、实时 debug、实时互动的咖啡馆快闪计划。带上项目、硬件或好奇心，和别人一起 build 出新的可能性。",
    url: "http://weixin.qq.com/r/mp/PRyTi8nEmJTnrY3o90kv",
    icon: "real-time-ai-cafe"
  },
  {
    id: "rte-open-day",
    series: "build",
    title: "RTE Open Day",
    subtitle: "和创造者面对面交流",
    intro: "以展会形态聚集社区项目与创新团队，通过展位、Demo 与现场交流，让更多 Builder 和背后的创造者被看见。",
    url: "http://weixin.qq.com/r/mp/PRyTi8nEmJTnrY3o90kv",
    icon: "rte-open-day"
  },
  {
    id: "rte-dev-talk",
    series: "build",
    title: "RTE Dev Talk",
    subtitle: "第一时间讨论技术热点",
    intro: "面向开发者的线上直播栏目，邀请一线 Builder 与技术专家分享最新趋势、产品实践和真实构建经验。",
    url: "http://weixin.qq.com/r/mp/PRyTi8nEmJTnrY3o90kv",
    icon: "rte-dev-talk"
  },
  {
    id: "talk-with-ai",
    series: "build",
    title: "Talk With AI 主题桌游",
    subtitle: "玩一局 Voice Agent 创业模拟",
    intro: "通过随机场景、技术竞拍和产品路演，把 Voice Agent 的真实开发历程变成可参与的桌游体验，适合开发者和 Founder 在游戏里讨论人与 AI 的未来。",
    url: "http://weixin.qq.com/r/mp/PRyTi8nEmJTnrY3o90kv",
    icon: "talk-with-ai"
  },
  {
    id: "builder-ama",
    series: "build",
    title: "微信群 AMA",
    subtitle: "和项目核心成员直接对话",
    intro: "邀请产品负责人、Founder 与开发者进入社区进行问答交流，像一场 mini 发布会一样了解项目背后的真实故事。",
    url: "http://weixin.qq.com/r/mp/PRyTi8nEmJTnrY3o90kv",
    icon: "builder-ama"
  },
  {
    id: "coding-voices-podcast",
    series: "build",
    title: "《编码人声》播客",
    subtitle: "听见 Builder 的真实思考",
    intro: "记录开发者、研究者与创业者关于 Voice AI、Physical AI 与未来交互的第一手经验和长期思考。",
    url: "https://example.com/coding-voices-podcast",
    icon: "coding-voices-podcast"
  },
  {
    id: "rte-conference",
    series: "build",
    title: "RTE 年度大会",
    subtitle: "一年一度的实时 AI 盛会",
    intro: "汇聚开发者、创业者、投资人和生态伙伴，共同讨论实时互动、Voice Agent、Physical AI 与对话式 AI 的未来。",
    url: "https://www.rteconf.com/",
    icon: "rte-conference"
  },
  {
    id: "supersonic",
    series: "grow",
    title: "Supersonic 超音速计划",
    subtitle: "面向高潜 Builder 的年度成长计划",
    intro: "聚焦 Voice Agent、Physical AI 与实时 AI 创业者，通过资源、伙伴、市场连接与展示机会，帮助项目从 Demo 走向产品与市场。",
    url: "https://physical-ai-camp.vercel.app/",
    icon: "supersonic"
  },
  {
    id: "realtime-ai-devkit",
    series: "grow",
    title: "Real-Time AI DevKit",
    subtitle: "支撑项目起步的开发资源包",
    intro: "整合模型额度、实时互动能力、开发板试用、数字人和 API 等资源，帮助团队降低试错成本，更快完成原型验证。",
    url: "https://physical-ai-camp.vercel.app/",
    icon: "realtime-ai-devkit"
  },
  {
    id: "voice-agent-100",
    series: "grow",
    title: "Voice Agent 100 创新榜",
    subtitle: "看见 Voice Agent 的 15+ 垂直落地赛道",
    intro: "一个展示 Voice Agent 多元落地场景的榜单，梳理 15+ 垂直赛道与 100+ 智能体案例，帮助开发者和 Founder 发现真实需求、头部项目与商业化机会。",
    url: "https://www.rtecommunity.dev/voice-agent-100",
    icon: "voice-agent-100"
  },
  {
    id: "go-global-morning-session",
    series: "grow",
    title: "出海早自习",
    subtitle: "和正在全球化的人一起学习",
    intro: "聚焦海外市场、增长、本地化与渠道合作，分享真实的出海经验、市场观察和踩坑记录。",
    url: "https://physical-ai-camp.vercel.app/",
    icon: "go-global-morning-session"
  },
  {
    id: "supply-chain-morning-session",
    series: "grow",
    title: "供应链早自习",
    subtitle: "理解 AI 硬件创业的另一半",
    intro: "围绕打样、制造、成本控制与供应链协同，帮助 AI 硬件与 Physical AI 团队少走弯路。",
    url: "https://physical-ai-camp.vercel.app/",
    icon: "supply-chain-morning-session"
  },
  {
    id: "model-morning-session",
    series: "grow",
    title: "大模型早自习",
    subtitle: "跟踪模型能力与 Agent 演进",
    intro: "围绕模型能力、推理、多模态、Agent Framework 与应用落地展开闭门讨论，帮助 Builder 保持技术敏感度。",
    url: "https://physical-ai-camp.vercel.app/",
    icon: "model-morning-session"
  },
  {
    id: "realtime-ai-daily",
    series: "grow",
    title: "RTE 开发者日报",
    subtitle: "每天了解实时 AI 行业变化",
    intro: "聚焦 Voice AI、Physical AI、Agent 与实时互动领域的重要动态，帮助 Builder 快速掌握趋势、机会与新产品。",
    url: "https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzg3NjgwMjUzOQ==&action=getalbum&album_id=3009551878315311111",
    icon: "realtime-ai-daily"
  },
  {
    id: "builder-stories",
    series: "grow",
    title: "Builder Stories",
    subtitle: "记录 Builder 的成长故事",
    intro: "分享开发者与创业者从灵感到产品、从项目到公司的真实经历，让更多早期创造者被看见。",
    url: "http://weixin.qq.com/r/mp/PRyTi8nEmJTnrY3o90kv",
    icon: "builder-stories"
  },
  {
    id: "voice-agent-camp",
    series: "grow",
    title: "Voice Agent Camp",
    subtitle: "打造下一代语音智能体产品",
    intro: "超音速计划旗舰项目，围绕 Voice Agent 的产品、技术与商业化展开深度共创，连接开发者、创业者与生态伙伴。",
    url: "https://mp.weixin.qq.com/s/ZI4AyE4n9hV4yA8nt2Rafw",
    icon: "voice-agent-camp"
  },
  {
    id: "physical-ai-camp",
    series: "grow",
    title: "Physical AI Camp",
    subtitle: "探索 AI 如何进入物理世界",
    intro: "超音速计划旗舰项目，聚焦 AI 硬件、机器人、多模态交互与实时智能，连接开发者、创业者、投资人与生态伙伴。",
    url: "https://physical-ai-camp.vercel.app/",
    icon: "physical-ai-camp"
  },
  {
    id: "demo-review",
    series: "grow",
    title: "Lightning Demo",
    subtitle: "3 分钟，让未完成的作品被看见",
    intro: "不论是原型、半成品还是刚冒出来的想法，都可以在 3 分钟里被看见；在大咖分享之外，我们始终给正在 build 的人留出获得反馈和寻找伙伴的舞台。",
    url: "http://weixin.qq.com/r/mp/PRyTi8nEmJTnrY3o90kv",
    icon: "demo-review"
  },
  {
    id: "demo-day-showcase",
    series: "grow",
    title: "年度 Demo Day",
    subtitle: "集中展示这一年最有意思的对话式 AI 产品",
    intro: "一年一度邀请社区生态伙伴与投资人到场，集中展示 Voice AI 和对话式 AI 项目成果，帮助团队获得反馈、曝光、合作机会和下一阶段资源。",
    url: "https://www.rteconf.com/",
    icon: "demo-day-showcase"
  },
  {
    id: "investor-network",
    series: "grow",
    title: "投资人连接",
    subtitle: "和真正懂 AI 的投资人交流",
    intro: "连接关注 Agent、AI 硬件与实时互动赛道的早期投资人，在平等的产品和业务交流中建立长期关系。",
    url: "https://physical-ai-camp.vercel.app/",
    icon: "investor-network"
  },
  {
    id: "global-showcase",
    series: "grow",
    title: "全球展会通道",
    subtitle: "把产品带到更大的行业现场",
    intro: "连接 WAIC、BEYOND Expo、IVS 等全球展会与初创展示机会，帮助 Builder 在真实行业场景中获得市场反馈、合作线索与国际曝光。",
    url: "https://physical-ai-camp.vercel.app/",
    icon: "global-showcase"
  },
  {
    id: "global-expedition",
    series: "grow",
    title: "海外生态考察",
    subtitle: "走进全球创新现场",
    intro: "深入硅谷、日本等 AI 创新生态，理解全球市场、产品趋势与本地合作机会，捕捉一手行业信号。",
    url: "https://physical-ai-camp.vercel.app/",
    icon: "global-expedition"
  },
  {
    id: "rte-dev-party",
    series: "grow",
    title: "RTE Dev Party",
    subtitle: "换个轻松的场子，继续认识彼此",
    intro: "展会和活动之后的轻量夜间交流场景，把高密度的信息吸入换成更自然的对话，让 Founder、Developer 与生态伙伴在轻松氛围里一对一聊项目、聊合作、交朋友。",
    url: "http://weixin.qq.com/r/mp/PRyTi8nEmJTnrY3o90kv",
    icon: "rte-dev-party"
  }
];

const englishCopy: Record<
  string,
  Pick<CardItem, "title" | "subtitle" | "intro">
> = {
  "product-library": {
    title: "Conversational AI Product Library",
    subtitle: "Top Conversational AI Products",
    intro: "A curated collection of Voice Agent, Physical AI, AI Hardware, and emerging product cases to help developers understand how next-generation human-computer interaction is becoming real."
  },
  "tool-library": {
    title: "Conversational AI Tool Library",
    subtitle: "Voice Agent Models & Tools",
    intro: "A curated library of SOTA TTS, STT, realtime voice models, agent frameworks, APIs, and developer tools to help you choose the right stack for your product."
  },
  "curious-handbook": {
    title: "Conversational AI Starter Guide",
    subtitle: "Start Building Conversational AI",
    intro: "A beginner-friendly guide covering core concepts, common use cases, and your first Voice Agent demo, helping you build a practical understanding of conversational AI."
  },
  "voice-agent-notes": {
    title: "Voice Agent Notes",
    subtitle: "How Voice AI Builders Think",
    intro: "Ongoing notes on new models, products, papers, and interviews in Voice AI, unpacking how leading builders think about scenarios, user experience, and next-generation voice agents."
  },
  "physical-ai-notes": {
    title: "Physical AI Notes",
    subtitle: "AI Meets the Physical World",
    intro: "Notes on AI hardware, robotics, wearables, edge intelligence, and multimodal interaction, following how teams combine voice, vision, sensors, and hardware into usable Physical AI products."
  },
  "agent-recipe-library": {
    title: "Agent Recipe Library",
    subtitle: "Reusable Voice Agent Recipes",
    intro: "Ready-to-use recipes for vision, RAG, memory, tool calling, MCP, model switching, interruptions, and more, helping you turn example code into your own realtime conversational agent."
  },
  "agent-skill-library": {
    title: "Agora Skills",
    subtitle: "Build Faster with AI Assistants",
    intro: "An official Agora knowledge pack that helps AI coding assistants choose the right product, wire up credentials, and run the first demo for voice agents, companions, tutors, support bots, and Physical AI apps."
  },
  "agora-agents": {
    title: "Agora Agents",
    subtitle: "Real-Time Agent Platform",
    intro: "Built on Agora's real-time engagement infrastructure, Agora Agents provides a complete experience for building, deploying, and managing Voice Agents and multimodal Agents."
  },
  "rte-meetup": {
    title: "RTE Meetup",
    subtitle: "Real-Time AI Builders Gather",
    intro: "RTE Community's flagship offline event connects developers, founders, and researchers through talks, panels, and Lightning Demos to explore real-time engagement and Conversational AI."
  },
  "real-time-ai-cafe": {
    title: "Real-Time AI Cafe",
    subtitle: "Coffee, Tokens, Real-Time Build",
    intro: "A pop-up cafe where developers gather to code, debug, and build in real time. Bring your project, hardware, or curiosity, and discover what becomes possible when builders work side by side."
  },
  "rte-open-day": {
    title: "RTE Open Day",
    subtitle: "Meet the Builders",
    intro: "An exhibition-style community event that brings together projects and innovation teams through booths, demos, and live conversations, helping more builders be seen."
  },
  "rte-dev-talk": {
    title: "RTE Dev Talk",
    subtitle: "Talk Tech as It Happens",
    intro: "An online livestream program for developers, inviting frontline builders and technical experts to share trends, product practice, and real-world building experience."
  },
  "talk-with-ai": {
    title: "Talk With AI Board Game",
    subtitle: "Voice Agent Startup Simulator",
    intro: "A board game that turns voice agent building into a playable experience through random scenarios, tech auctions, and product pitches, helping developers and founders discuss the future of human-AI interaction through play."
  },
  "builder-ama": {
    title: "WeChat Group AMA",
    subtitle: "Talk with Project Builders",
    intro: "Product leads, founders, and developers join the community for live Q&A, offering a mini launch-event experience that reveals the real stories behind projects."
  },
  "coding-voices-podcast": {
    title: "Coding Voices Podcast",
    subtitle: "Hear How Builders Think",
    intro: "A podcast documenting first-hand experience and long-term thinking from developers, researchers, and founders working on Voice AI, Physical AI, and future interaction."
  },
  "rte-conference": {
    title: "RTE Annual Conference",
    subtitle: "Real-Time AI Annual Summit",
    intro: "A conference bringing together developers, founders, investors, and ecosystem partners to discuss real-time engagement, Voice Agents, Physical AI, and the future of Conversational AI."
  },
  "supersonic": {
    title: "Supersonic Program",
    subtitle: "For High-Potential Builders",
    intro: "Designed for Voice Agent, Physical AI, and real-time AI founders, this program connects projects with resources, partners, market access, and showcase opportunities."
  },
  "realtime-ai-devkit": {
    title: "Real-Time AI DevKit",
    subtitle: "Resources to Start Building",
    intro: "A bundle of model credits, real-time engagement capabilities, development board trials, digital human resources, and APIs to lower experimentation costs and accelerate prototyping."
  },
  "voice-agent-100": {
    title: "Voice Agent 100",
    subtitle: "15+ Voice Agent Verticals",
    intro: "A curated list of 100+ voice agent use cases across 15+ verticals, helping developers and founders discover real needs, leading projects, and emerging business opportunities."
  },
  "go-global-morning-session": {
    title: "Go Global Morning Session",
    subtitle: "Learn Global Expansion",
    intro: "A focused session on overseas markets, growth, localization, and channel partnerships, sharing real go-global experience, market observations, and lessons learned."
  },
  "supply-chain-morning-session": {
    title: "Supply Chain Morning Session",
    subtitle: "AI Hardware Supply Chains",
    intro: "A session on prototyping, manufacturing, cost control, and supply-chain collaboration, helping AI hardware and Physical AI teams avoid common detours."
  },
  "model-morning-session": {
    title: "Model Morning Session",
    subtitle: "Track Models and Agents",
    intro: "A closed-door discussion around model capability, reasoning, multimodality, Agent frameworks, and application practice, helping builders stay technically alert."
  },
  "realtime-ai-daily": {
    title: "RTE Developer Daily",
    subtitle: "Daily Real-Time AI Signals",
    intro: "A daily digest covering important developments in Voice AI, Physical AI, Agents, and real-time engagement so builders can quickly track trends, opportunities, and new products."
  },
  "builder-stories": {
    title: "Builder Stories",
    subtitle: "Stories from Real Builders",
    intro: "Stories about developers and founders moving from ideas to products and from projects to companies, helping more early-stage creators become visible."
  },
  "voice-agent-camp": {
    title: "Voice Agent Camp",
    subtitle: "Build Next-Gen Voice Agents",
    intro: "A flagship Supersonic program focused on Voice Agent product, technology, and commercialization, connecting developers, founders, and ecosystem partners for deep co-creation."
  },
  "physical-ai-camp": {
    title: "Physical AI Camp",
    subtitle: "Bring AI into the Real World",
    intro: "A flagship Supersonic program focused on AI hardware, robotics, multimodal interaction, and real-time intelligence, connecting builders with founders, investors, and partners."
  },
  "demo-review": {
    title: "Lightning Demo",
    subtitle: "Show Your Work in 3 Minutes",
    intro: "Whether it is a prototype, a half-built product, or a fresh idea, you get 3 minutes to be seen. Beyond keynote talks, we always keep the stage open for builders to get feedback and find collaborators."
  },
  "demo-day-showcase": {
    title: "Annual Demo Day",
    subtitle: "Best Conversational AI Projects",
    intro: "An annual showcase for the most interesting Voice AI and conversational AI projects from the community, bringing together ecosystem partners and investors for feedback, exposure, partnerships, and next-step resources."
  },
  "investor-network": {
    title: "Investor Network",
    subtitle: "Meet AI-Focused Investors",
    intro: "A connection point with early-stage investors focused on Agents, AI hardware, and real-time engagement, creating long-term relationships through product and business conversations."
  },
  "global-showcase": {
    title: "Global Showcase Track",
    subtitle: "Take Your Product Global",
    intro: "We connect builders with major events and startup showcases such as WAIC, BEYOND Expo, and IVS, helping projects gain market feedback, partnership leads, and international exposure."
  },
  "global-expedition": {
    title: "Global Ecosystem Expedition",
    subtitle: "Explore Global AI Scenes",
    intro: "An in-depth visit to AI innovation ecosystems such as Silicon Valley and Japan, helping builders understand global markets, product trends, and local partnership opportunities."
  },
  "rte-dev-party": {
    title: "RTE Dev Party",
    subtitle: "Unwind and Meet Builders",
    intro: "A relaxed evening gathering after intense events and conferences, turning information overload into natural conversations where founders, developers, and ecosystem partners can talk projects, partnerships, and new ideas."
  }
};

export const englishCards: CardItem[] = cards.map((card) => ({
  ...card,
  ...englishCopy[card.id]
}));

export const cardsByLocale: Record<CardLocale, CardItem[]> = {
  zh: cards,
  en: englishCards
};
