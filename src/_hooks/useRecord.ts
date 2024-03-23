import { Record } from "../_types/Record";

const record_sample: Record[] = [
  {
    id: "1",
    date: "2024-03-01",
    LearningContent: { id: "1", seq: 101, contentName: "サンプル1" },
    time: 10,
  },
  {
    id: "2",
    date: "2024-03-02",
    LearningContent: { id: "1", seq: 101, contentName: "サンプル2" },
    time: 20,
  },
  {
    id: "3",
    date: "2024-03-03",
    LearningContent: { id: "1", seq: 101, contentName: "サンプル3" },
    time: 30,
  },
  {
    id: "4",
    date: "2024-03-04",
    LearningContent: { id: "1", seq: 101, contentName: "サンプル4" },
    time: 40,
  },
  {
    id: "5",
    date: "2024-03-05",
    LearningContent: { id: "1", seq: 101, contentName: "サンプル5" },
    time: 50,
  },
];

export function useRecord() {
  const records = record_sample;

  return { records };
}
