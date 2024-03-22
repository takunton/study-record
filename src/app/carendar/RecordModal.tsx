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

type Props = {
  isNew: boolean;
  isOpen: boolean;
  onClose: () => void;
};

export const RecordModal = (props: Props) => {
  const { isNew, isOpen, onClose } = props;

  const { learningContents } = useLearningContent();

  console.debug(learningContents);

  // 保存ボタン押下
  const onClickSave = () => {
    alert("保存しました");
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
              <Input type="date" />
            </FormControl>
            <FormControl>
              <FormLabel>内容</FormLabel>
              <Select placeholder="選択してください">
                {learningContents.map((learningContent) => (
                  <option value={learningContent.id}>
                    {learningContent.contentName}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>時間</FormLabel>
              <Input type="time" />
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
