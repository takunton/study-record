import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
} from "@chakra-ui/react";
import { PrimaryButton } from "../../_components/PrimaryButton";
import { useLearningContent } from "../../_hooks/useLearningContent";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { LearningContent } from "../../_types/LearningContent";

type Props = {
  isNew: boolean;
  isOpen: boolean;
  onClose: () => void;
};

export const RecordModal = (props: Props) => {
  const { isNew, isOpen, onClose } = props;

  // 内容リスト
  const { learningContents } = useLearningContent();

  // 日付
  const [date, setDate] = useState<string>();

  // 内容
  const [learningContent, setLearningContent] = useState<string>();

  // 時間
  const [timeNumber, setTimeNumber] = useState<number>();

  console.debug(learningContents);

  // 日付テキスト変更
  function onChangeDate(e: ChangeEvent<HTMLInputElement>) {
    setDate(e.target.value);
    console.debug(e.target.value);
  }

  // 内容テキスト変更
  function onChangeLearningContents(e: ChangeEvent<HTMLSelectElement>) {
    setLearningContent(e.target.value);
    console.debug(e.target.value);
  }

  // 時間テキスト変更
  function onChangeTime(e: ChangeEvent<HTMLInputElement>) {
    setTimeNumber(e.target.valueAsNumber);
    console.debug(e.target.value);
  }

  // 保存ボタン押下
  const onClickSave = () => {
    alert(
      `"保存しました[日付=${date}, 内容=${learningContent}, 時間=${timeNumber}]`
    );
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInTop"
    >
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader>{isNew ? "記録（追加）" : "記録（編集）"}</ModalHeader>
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>日付</FormLabel>
              <Input type="date" onChange={onChangeDate} />
            </FormControl>
            <FormControl>
              <FormLabel>内容</FormLabel>
              <Select
                onChange={onChangeLearningContents}
                placeholder="選択してください"
              >
                {learningContents.map((learningContent) => (
                  <option value={learningContent.id}>
                    {learningContent.contentName}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>時間</FormLabel>
              <Input type="number" onChange={onChangeTime} />
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <PrimaryButton onClick={onClickSave}>保存</PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
