import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Cors from "cors";
import Patient from "./routes/patient";
import Appointment from "./routes/appointment";

const app = express();
app.use(Cors());
app.use(bodyParser.json());

app.use("/patient", Patient);
app.use("/appointment", Appointment);


(() => {
  try {
    const mongooseConnect = mongoose.connect(
      "mongodb+srv://danish:F9rlGjTB9mwh58N2@cluster0.gie8w0r.mongodb.net/?retryWrites=true&w=majority",
      () => {
        const server = app.listen(3000, () => {
          const host: any = server.address();
          console.log("Listening at Port:", host.port);
        });
      }
    );
  } catch (error) {
    console.log("Connection Error", error);
  }
})();
