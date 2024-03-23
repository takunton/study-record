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
import { Record } from "./_types/Record";

export const App = () => {
  // 記録リスト
  const { records } = useRecord();

  // 選択された記録
  const [selectedRecord, setSelectedRecord] = useState<Record>();

  // モーダルのモード
  const [isNew, setIsNew] = useState(false);

  // モーダルの状態
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 記録リストをeventオブジェクトに変換
  const events: EventSourceInput = records.map((record) => ({
    id: record.id,
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
    setSelectedRecord(undefined);
    onOpen();
  };

  // イベントクリック
  const eventClick = (arg: EventClickArg) => {
    setIsNew(false);
    const targetRecord = records.find((record) => record.id === arg.event.id);
    setSelectedRecord(targetRecord);
    console.debug(arg.event.id);
    console.debug(targetRecord);
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
          selectedRecord={selectedRecord}
          onClose={onClose}
        ></RecordModal>
      </ChakraProvider>
    </>
  );
};
