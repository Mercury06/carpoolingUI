import { Constants } from "./constants";
import { useEffect, useState } from "react";

export async function useSseInitializer() {
  let eventSource;
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    if ("EventSource" in window) {
      eventSource = new EventSource(`${Constants.DEV_URL}/api/stream`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      eventSource.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setEventData(message);
      };

      eventSource.addEventListener("join", (event) => {
        console.log("join", event);
      });

      eventSource.onopen = (event) => {
        // const message = JSON.parse(mes.data);
        console.log("eventSource ", eventSource);
        console.log("eventSource opened...", event);
      };

      eventSource.onerror = (event) => {
        // const message = JSON.parse(mes.data);
        console.log("error occured...", event);
        eventSource.close(JSON.stringify({ user: "user1" }));
      };
    }

    return () => {
      // eventSource.removeEventListener("message", handleReceiveMessage);
      eventSource.close();
    };
  }, []);

  return eventData;
}

// function extractDatafromPromise(message) {
//   return new Promise(async function (resolve, reject) {
//     const extractedData =
//     resolve(signed);
//   });
// }
//   eventSource = new EventSource(`${Constants.DEV_URL}/stream?username=${name}`);
// eventSource = new EventSource(`${Constants.DEV_URL}/stream?username=user5`);
//   console.log("eventSource:", eventSource);

// export async function useSseInitializer() {
//   const [eventData, setEventData] = useState(null);
//   let eventSource;
//   function extractDataFromPromise(event) {
//     let message = JSON.parse(event.data);
//     return message;
//   }

//   useEffect(() => {
//     if ("EventSource" in window) {
//       eventSource = new EventSource(`${Constants.DEV_URL}/api/stream`);

//       eventSource.onmessage = (event) => {
//         async function streamHandler(event) {
//           // console.log("event", event.data);
//           // const message = JSON.parse(event.data);
//           const dataMes = await extractDataFromPromise(event);
//           // console.log("source message:", dataMes);
//           setEventData(dataMes);
//         }
//         streamHandler(event);
//       };
