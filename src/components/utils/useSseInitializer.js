import { Constants } from "./constants";
import { useEffect, useState, useRef } from "react";

export async function useSseInitializer(isAuth, currentUser) {
  const eventSource = useRef(null);
  const userId = currentUser.id;
  let reconnectTimer;

  const [eventData, setEventData] = useState(null);
  // console.log("userId in hook:", userId);
  console.log("eventData in hook:", eventData);

  useEffect(() => {
    let createSseConnection = () => {
      if ("EventSource" in window && isAuth) {
        eventSource.current = new EventSource(
          `${Constants.DEV_URL}/api/stream/${userId}`
        );
        eventSource.current.onmessage = (event) => {
          const message = JSON.parse(event.data);
          // setEventData(message);
          console.log("eventSource onmessage...", message);
        };
        eventSource.current.addEventListener("opportune", (event) => {
          console.log("OPPORTUNE event recieved...", event);
        });
        eventSource.current.onopen = (event) => {
          // const message = JSON.parse(mes.data);
          console.log("eventSource ", eventSource.current);
          console.log("eventSource opened...", event);
        };
        eventSource.current.onerror = (event) => {
          // const message = JSON.parse(mes.data);
          console.log("error occured...", event);
          eventSource.current.close();
          reconnectTimer = setTimeout(() => {
            createSseConnection();
          }, 1000);
        };
      }
    };
    createSseConnection();

    return () => {
      // eventSource.removeEventListener("message", handleReceiveMessage);
      clearTimeout(reconnectTimer);
      eventSource.current?.close();
    };
  }, [isAuth, userId]);

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

//////////////////************************* */////////////

// useEffect(() => {
//   if ("EventSource" in window && isAuth) {
//     eventSource.current = new EventSource(
//       `${Constants.DEV_URL}/api/stream/${userId}`
//     );

//     eventSource.current.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       setEventData(message);
//     };

//     eventSource.current.addEventListener("join", (event) => {
//       console.log("join event recieved...", event);
//     });

//     eventSource.current.onopen = (event) => {
//       // const message = JSON.parse(mes.data);
//       console.log("eventSource ", eventSource.current);
//       console.log("eventSource opened...", event);
//     };

//     // eventSource.current.addEventListener("close", (event) => {
//     //   console.log("close", event);
//     // });

//     // eventSource.current.addEventListener("end", (event) => {
//     //   console.log("end", event);
//     // });

//     eventSource.current.onerror = (event) => {
//       // const message = JSON.parse(mes.data);
//       console.log("error occured...", event);
//       eventSource.current.close();
//     };

//     return () => {
//       // eventSource.removeEventListener("message", handleReceiveMessage);
//       eventSource.current.close();
//     };
//   }
// }, [isAuth, userId]);
