// import { useState } from "react";
import { LearningContent } from "../_types/LearningContent";

const content_sample: LearningContent[] = [
  { id: 1, seq: 101, contentName: "サンプル1" },
  { id: 2, seq: 102, contentName: "サンプル2" },
  { id: 3, seq: 103, contentName: "サンプル3" },
  { id: 4, seq: 104, contentName: "サンプル4" },
  { id: 5, seq: 105, contentName: "サンプル5" },
];

export function useLearningContent() {
  //   const [learningContents, setLearningContents] = useState<LearningContent[]>(
  //     []
  //   );
  //   setLearningContents(content_sample);
  const learningContents = content_sample;

  return { learningContents };
}