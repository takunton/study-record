import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg, EventContentArg } from "@fullcalendar/core";
import listPlugin from "@fullcalendar/list";

import {
  Button,
  ChakraProvider,
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
  Wrap,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import theme from "./theme/thme";
import { PrimaryButton } from "./components/atoms/button/PrimaryButton";
import { useState } from "react";

export const App = () => {
  // モーダルのモード
  const [isNew, setIsNew] = useState(false);

  // モーダルの状態
  const { isOpen, onOpen, onClose } = useDisclosure();

  // イベントのフォーマット
  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <>
        <b>{eventInfo?.timeText}</b>
        <i>{eventInfo?.event.title}</i>
      </>
    );
  };

  // 日付クリック
  const handleDateClick = (arg: DateClickArg) => {
    setIsNew(true);
    onOpen();
  };

  // イベントクリック
  const eventClick = (arg: EventClickArg) => {
    setIsNew(false);
    onOpen();
  };

  return (
    <>
      <ChakraProvider theme={theme}>
        <FullCalendar
          locale="ja"
          plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth listWeek", // 追加
          }}
          dateClick={handleDateClick}
          eventContent={renderEventContent}
          initialView="dayGridMonth"
          eventClick={eventClick}
          events={[
            {
              title: "All-day event",
              start: "2024-03-21",
            },
            {
              title: "Timed event",
              start: "20240321" + "T12:00:00",
            },
          ]}
        />
        <PrimaryButton onClick={() => {}}>テスト</PrimaryButton>
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
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>時間</FormLabel>
                  <Input type="time" />
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button
                color="blue"
                onClick={onClose}
                _hover={{ cursor: "pointer" }}
              >
                閉じる
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    </>
  );
};
