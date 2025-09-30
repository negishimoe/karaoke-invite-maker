const groups = [
  {
    id: "work",
    keywords: ["仕事", "残業", "会議", "資料", "上司", "打ち合わせ"],
    templates: [
      "働きすぎ注意報発令！労働歌でセルフ労いしにカラオケ行かない？",
      "会議で使った声帯、バラードでやさしくほぐそ。今夜カラオケどう？",
      "資料づくりの指先、タンバリン持たせてあげたいからカラオケ集合！"
    ]
  },
  {
    id: "study",
    keywords: ["勉強", "宿題", "課題", "レポート", "テスト", "受験"],
    templates: [
      "暗記カードよりカラオケの歌詞カード！ごほうびに歌いに行こ！",
      "課題やったらご褒美にハイテンションカラオケ、どうせなら今すぐ行こ。",
      "覚えた公式、歌で韻踏んで強化しよ。カラオケで復習会開催！"
    ]
  },
  {
    id: "chill",
    keywords: ["寝", "ゴロゴロ", "だらだら", "リラックス", "まったり", "昼寝"],
    templates: [
      "ゴロゴロタイムをゴロゴロマラカスに進化させよ？カラオケ行くぞー！",
      "まったり中の君へ。のんびりソファの代わりにふかふかソファー付きのカラオケへ。",
      "眠気覚ましにデュエットでハモろ！カラオケなら目もぱっちり。"
    ]
  },
  {
    id: "netflix",
    keywords: ["ネトフリ", "Netflix", "ドラマ", "映画", "アニメ"],
    templates: [
      "主題歌、本人より歌える説。検証しにカラオケ寄ろ！",
      "エンディング曲で締めたいなら、カラオケでエンディング迎えようよ。",
      "推しキャラのキャラソン完璧にするチャンス到来。カラオケへ転移です！"
    ]
  },
  {
    id: "food",
    keywords: ["ご飯", "ランチ", "ディナー", "食べ", "カフェ", "おやつ"],
    templates: [
      "腹ごしらえ後のデザートは歌声で。カラオケに寄り道しちゃお。",
      "食後の運動は喉の筋トレ！カラオケで腹筋も笑いも鍛えるぞー。",
      "カフェタイム延長戦、カラオケのドリンクバーで決まりじゃない？"
    ]
  },
  {
    id: "shopping",
    keywords: ["買い物", "ショッピング", "ウィンドウ", "セール"],
    templates: [
      "ショッピングの戦利品、ステージ衣装にして歌いに行こ。",
      "袋いっぱい？次は歌ネタを袋いっぱいにしにカラオケへ！",
      "セール巡りの体力まだあるなら、カラオケで声量セールしよう。"
    ]
  },
  {
    id: "gym",
    keywords: ["筋トレ", "ジム", "ランニング", "ヨガ", "運動"],
    templates: [
      "筋肉ほぐす仕上げは発声ストレッチ！カラオケでクールダウンしよ。",
      "ランニングしたなら歌で心拍数キープ。カラオケにバトンタッチ！",
      "運動後のプロテイン代わりに、ドリンクバーでハイテンションカラオケどう？"
    ]
  },
  {
    id: "commute",
    keywords: ["電車", "通勤", "通学", "バス", "帰り道"],
    templates: [
      "帰り道に寄り道で遠回り。ゴールはカラオケ、歌ってリセット。",
      "電車でイヤホンライブするくらいなら、本物のマイクで歌お。",
      "通勤帰りの足をカラオケボックスへ誘導しといた！来るよね？"
    ]
  }
];

const genericTemplates = [
  "今日の出来事、全部バラードにして聞かせて？カラオケ行こ。",
  "その話、BGM付きで聞きたいからカラオケ集合〜！",
  "誘われ待ちの君を迎えに来たよ。今からカラオケ行ってしまおう。",
  "今のテンション、サビで爆上げしよ。カラオケで続きをどうぞ。",
  "語るより歌おうよってことで、カラオケに駆け込む準備はいい？"
];

const APP_URL = "https://negishimoe.github.io/karaoke-invite-maker/";

function pickTemplate(input) {
  if (!input) {
    return "まずは一言教えて！その瞬間を歌に変えて誘うから。";
  }

  const normalized = input.replace(/\s+/g, "").toLowerCase();
  const match = groups.find(group =>
    group.keywords.some(keyword => normalized.includes(keyword.toLowerCase()))
  );

  const bucket = match ? match.templates : genericTemplates;
  return bucket[Math.floor(Math.random() * bucket.length)];
}

function generateMessage() {
  const input = document.getElementById("dailyInput").value.trim();
  const message = pickTemplate(input);
  const output = document.getElementById("outputText");
  const copyButton = document.getElementById("copyButton");
  const shareButton = document.getElementById("shareButton");

  if (message) {
    output.textContent = message;
    output.classList.remove("placeholder");
    copyButton.hidden = false;
    shareButton.hidden = false;
  }
}

async function copyToClipboard() {
  const text = document.getElementById("outputText").textContent;
  if (!text || text.includes("まだ誘い待ち")) return;

  try {
    await navigator.clipboard.writeText(text);
    const copyButton = document.getElementById("copyButton");
    const originalLabel = copyButton.textContent;
    copyButton.textContent = "コピーしました！";
    copyButton.disabled = true;
    setTimeout(() => {
      copyButton.textContent = originalLabel;
      copyButton.disabled = false;
    }, 1600);
  } catch (error) {
    alert("コピーできませんでした。手動で選択してください！");
  }
}

function shareOnX() {
  const text = document.getElementById("outputText").textContent;
  if (!text || text.includes("まだ誘い待ち")) return;

  const payload = `${text}\n${APP_URL}\n#強引カラオケお誘いメーカー`;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(payload)}`;
  window.open(url, "_blank", "noopener");
}

function setup() {
  const generateButton = document.getElementById("generateButton");
  const copyButton = document.getElementById("copyButton");
  const shareButton = document.getElementById("shareButton");

  generateButton.addEventListener("click", generateMessage);
  document.getElementById("dailyInput").addEventListener("keydown", event => {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      generateMessage();
    }
  });

  copyButton.addEventListener("click", copyToClipboard);
  shareButton.addEventListener("click", shareOnX);
}

document.addEventListener("DOMContentLoaded", setup);
