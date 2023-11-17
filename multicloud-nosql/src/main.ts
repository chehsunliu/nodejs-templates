import { install } from "source-map-support";
import { createApp } from "@demo/app";

install();

const port = 3000;

createApp().listen(port, () => {
  console.log(`App is running on port ${port}`);
});
