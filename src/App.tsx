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
import { PrimaryButton } from "./_components/PrimaryButton";
import { useState } from "react";
import { RecordModal } from "./app/carendar/RecordModal";

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
        <RecordModal
          isNew={isNew}
          isOpen={isOpen}
          onClose={onClose}
        ></RecordModal>
      </ChakraProvider>
    </>
  );
};
