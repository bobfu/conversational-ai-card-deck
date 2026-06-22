import { cards, type CardItem, type CardSeries } from "@/data/cards";

export interface InspirationCard {
  card: CardItem;
  words: string[];
  prompt: string;
}

const inspirationByCardId: Record<string, Pick<InspirationCard, "words" | "prompt">> = {
  "product-library": {
    words: ["发现", "视野", "灵感"],
    prompt: "你最近想发现哪一种新的可能？"
  },
  "tool-library": {
    words: ["工具", "选择", "路径"],
    prompt: "有什么工具能让你的想法更快落地？"
  },
  "curious-handbook": {
    words: ["好奇", "入门", "提问"],
    prompt: "你愿意从哪个小问题开始探索？"
  },
  "voice-agent-notes": {
    words: ["倾听", "拆解", "声音"],
    prompt: "一个好的声音智能体，应该先学会什么？"
  },
  "physical-ai-notes": {
    words: ["现实", "触达", "身体"],
    prompt: "如果 AI 走进现实世界，它会先靠近谁？"
  },
  "agent-recipe-library": {
    words: ["配方", "复用", "动手"],
    prompt: "哪一个现成配方能帮你迈出第一步？"
  },
  "agent-skill-library": {
    words: ["协作", "指令", "加速"],
    prompt: "你希望 AI Coding Assistant 帮你省下哪段路？"
  },
  "agora-agents": {
    words: ["实时", "部署", "连接"],
    prompt: "你想把哪个对话体验真正运行起来？"
  },
  "rte-meetup": {
    words: ["相遇", "现场", "共振"],
    prompt: "你今天想遇见什么样的人？"
  },
  "real-time-ai-cafe": {
    words: ["咖啡", "共创", "松弛"],
    prompt: "如果给自己一杯咖啡时间，你想 build 什么？"
  },
  "rte-open-day": {
    words: ["打开", "展示", "看见"],
    prompt: "你希望自己的哪一面被更多人看见？"
  },
  "rte-dev-talk": {
    words: ["讨论", "热点", "表达"],
    prompt: "最近哪个技术变化让你最想聊一聊？"
  },
  "talk-with-ai": {
    words: ["游戏", "未来", "勇气"],
    prompt: "如果把未来当成一局游戏，你想先押注什么？"
  },
  "builder-ama": {
    words: ["回答", "坦诚", "靠近"],
    prompt: "你最想向创造者问出哪个问题？"
  },
  "coding-voices-podcast": {
    words: ["记录", "人声", "故事"],
    prompt: "什么样的创造者故事会给你力量？"
  },
  "rte-conference": {
    words: ["大会", "趋势", "聚合"],
    prompt: "站在更大的现场，你想带走什么信号？"
  },
  "supersonic": {
    words: ["加速", "跃迁", "超越"],
    prompt: "你最想让自己的项目在哪一点上提速？"
  },
  "realtime-ai-devkit": {
    words: ["资源", "原型", "试错"],
    prompt: "如果试错成本降低了，你会大胆尝试什么？"
  },
  "voice-agent-100": {
    words: ["赛道", "需求", "机会"],
    prompt: "哪个真实需求值得你认真追一次？"
  },
  "go-global-morning-session": {
    words: ["出海", "边界", "远方"],
    prompt: "你的产品可以为哪个远方市场创造价值？"
  },
  "supply-chain-morning-session": {
    words: ["制造", "耐心", "落地"],
    prompt: "把想法做成物品时，最需要补上的能力是什么？"
  },
  "model-morning-session": {
    words: ["模型", "敏感", "演进"],
    prompt: "哪个模型能力变化，正在改变你的判断？"
  },
  "realtime-ai-daily": {
    words: ["日常", "信号", "节奏"],
    prompt: "你想建立怎样的信息节奏？"
  },
  "builder-stories": {
    words: ["成长", "真实", "看见"],
    prompt: "哪段真实经历，可能正在鼓励下一个人？"
  },
  "voice-agent-camp": {
    words: ["营地", "打磨", "产品"],
    prompt: "你想把哪个语音体验打磨到能被人记住？"
  },
  "physical-ai-camp": {
    words: ["物理", "身体", "世界"],
    prompt: "你的 AI 想通过什么方式进入真实世界？"
  },
  "demo-review": {
    words: ["三分钟", "反馈", "未完成"],
    prompt: "你愿意把哪个未完成的作品拿出来被看见？"
  },
  "demo-day-showcase": {
    words: ["舞台", "成果", "机会"],
    prompt: "如果今天有一个舞台，你想展示什么？"
  },
  "investor-network": {
    words: ["信任", "资本", "长期"],
    prompt: "你希望和怎样的伙伴建立长期关系？"
  },
  "global-showcase": {
    words: ["曝光", "市场", "打开"],
    prompt: "你的产品需要在哪个真实场景里接受检验？"
  },
  "global-expedition": {
    words: ["远行", "生态", "观察"],
    prompt: "走进新的生态时，你最想观察什么？"
  },
  "rte-dev-party": {
    words: ["放松", "朋友", "续聊"],
    prompt: "离开正式议程后，你想和谁继续聊下去？"
  }
};

export const inspirationCards: InspirationCard[] = cards.map((card) => ({
  card,
  words: inspirationByCardId[card.id]?.words ?? ["灵感", "探索", "可能"],
  prompt: inspirationByCardId[card.id]?.prompt ?? "今天有什么可能正在等你靠近？"
}));

export function getInspirationCards(series: CardSeries | "all") {
  if (series === "all") return inspirationCards;
  return inspirationCards.filter((item) => item.card.series === series);
}
