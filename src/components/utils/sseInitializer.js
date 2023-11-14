import { Constants } from "./constants";

export async function sseInitializer(eventSource) {
  eventSource = new EventSource(`${Constants.DEV_URL}/stream`);
  //   console.log("eventSource:", eventSource);
  eventSource.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log("source message:", message);
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
