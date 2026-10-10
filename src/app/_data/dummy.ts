// 画面のたたき台用のダミーデータ。保存や判定には使わない。

export type Day = {
  id: string;
  num: string;
  label: string;
  dow: string;
  holiday?: boolean;
};

export type Person = {
  name: string;
  dept: string;
  role: "新入社員" | "迎える側";
};

export const round = {
  no: 12,
  period: "10月26日(月)〜11月6日(金)",
  periodShort: "10月26日〜11月6日",
  deadline: "10月22日(木)",
};

// 開催期間の平日。祝日はカレンダーに出すが選べない。
export const days: Day[] = [
  { id: "1026", num: "26", label: "10月26日", dow: "月" },
  { id: "1027", num: "27", label: "10月27日", dow: "火" },
  { id: "1028", num: "28", label: "10月28日", dow: "水" },
  { id: "1029", num: "29", label: "10月29日", dow: "木" },
  { id: "1030", num: "30", label: "10月30日", dow: "金" },
  { id: "1102", num: "2", label: "11月2日", dow: "月" },
  { id: "1103", num: "3", label: "11月3日", dow: "火", holiday: true },
  { id: "1104", num: "4", label: "11月4日", dow: "水" },
  { id: "1105", num: "5", label: "11月5日", dow: "木" },
  { id: "1106", num: "6", label: "11月6日", dow: "金" },
];

export const answeredDayIds = ["1027", "1029", "1105"];
export const lunchDayId = "1029";

export const departments = [
  "営業部",
  "開発部",
  "人事部",
  "マーケティング部",
  "経理部",
  "カスタマーサクセス部",
];

export const me: Person = { name: "佐藤 さくら", dept: "開発部", role: "新入社員" };

export const lunch = {
  day: "10月29日(木)",
  time: "12:00〜13:00",
  format: "対面",
  members: [
    me,
    { name: "田中 健", dept: "営業部", role: "新入社員" },
    { name: "小林 大輔", dept: "カスタマーサクセス部", role: "迎える側" },
    { name: "山口 由美", dept: "マーケティング部", role: "迎える側" },
  ] satisfies Person[],
};

export const adminStats = {
  joined: 27,
  newcomers: 15,
  hosts: 12,
  office: 18,
  online: 9,
  skipped: 5,
  unanswered: 9,
};

export const groups = [
  { no: "G1", day: "10月29日(木)", format: "対面", members: "佐藤 さくら、田中 健、小林 大輔、山口 由美" },
  { no: "G2", day: "10月27日(火)", format: "対面", members: "森 恵、岡田 涼、西村 葵" },
  { no: "G3", day: "10月28日(水)", format: "オンライン", members: "藤井 遼、松本 奈央、坂口 剛、原 千夏" },
  { no: "G4", day: "11月4日(水)", format: "対面", members: "清水 拓、安藤 結、野口 仁" },
];
