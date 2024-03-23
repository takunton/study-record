import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import {
  EventClickArg,
  EventContentArg,
  EventSourceInput,
} from "@fullcalendar/core";
import listPlugin from "@fullcalendar/list";

import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import theme from "./theme/theme";
import { useState } from "react";
import { RecordModal } from "./app/carendar/RecordModal";
import { useRecord } from "./_hooks/useRecord";

export const App = () => {
  // 記録リスト
  const { records } = useRecord();

  // モーダルのモード
  const [isNew, setIsNew] = useState(false);

  // モーダルの状態
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 記録リストをeventオブジェクトに変換
  const events: EventSourceInput = records.map((record) => ({
    title: `${record.time} ${record.LearningContent.contentName}`,
    start: record.date,
  }));

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
          events={events}
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
