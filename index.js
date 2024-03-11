// // const express = require("express");
// // const { createServer } = require("node:http");
// // const { join } = require("node:path");
// // const { Server } = require("socket.io");

// // const app = express();
// // const server = createServer(app);
// // const io = new Server(server);

// // app.get("/", (req, res) => {
// //   res.sendFile(join(__dirname, "index.html"));
// // });

// // io.on("connection", (socket) => {
// //   console.log("a user connected");
// //   socket.on("disconnect", () => {
// //     console.log("user disconnected");
// //   });
// // });
// // io.on("connection", (socket) => {
// //   socket.on("chat message", (msg) => {
// //     // console.log("message: " + msg);
// //   });
// // });
// // // this will emit the event to all connected sockets
// // io.emit("hello", "world");
// // io.on("connection", (socket) => {
// //   socket.broadcast.emit("hi");
// // });
// // io.on("connection", (socket) => {
// //   socket.on("chat message", (msg) => {
// //     io.emit("chat message", msg);
// //   });
// // });
// // server.listen(3000, () => {
// //   console.log("server running at http://localhost:3000");
// // });

// const express = require("express");
// const { createServer } = require("http");
// const { join } = require("path");
// const { Server } = require("socket.io");
// const mongoose = require("mongoose");

// const app = express();
// const server = createServer(app);
// const io = new Server(server);

// // Connect to MongoDB
// mongoose.connect(
//   " mongodb+srv://rahulkr:rahulkr@cluster0.uu1odbb.mongodb.net/test",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

// // Define a Message model
// const Message = mongoose.model("Message", {
//   content: String,
// });

// app.get("/", (req, res) => {
//   res.sendFile(join(__dirname, "index.html"));
// });

// io.on("connection", async (socket) => {
//   console.log("a user connected");

//   // Retrieve previous messages from the database
//   try {
//     const messages = await Message.find();
//     messages.forEach((message) => {
//       socket.emit("chat message", message.content);
//     });
//   } catch (error) {
//     console.error("Error retrieving messages from the database:", error);
//   }

//   socket.on("chat message", async (msg) => {
//     // Save the message to the database
//     try {
//       const newMessage = new Message({ content: msg });
//       await newMessage.save();
//     } catch (error) {
//       console.error("Error saving message to the database:", error);
//     }

//     // Broadcast the message to all connected sockets
//     io.emit("chat message", msg);
//   });

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

// server.listen(3000, () => {
//   console.log("server running at http://localhost:3000");
// });
const express = require("express");
const { createServer } = require("http");
const { join } = require("path");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const app = express();
const server = createServer(app);
const io = new Server(server);

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://rahulkr:rahulkr@cluster0.uu1odbb.mongodb.net/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Define a Message model
const Message = mongoose.model("Message", {
  content: String,
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", async (socket) => {
  console.log("a user connected");

  // Retrieve previous messages from the database
  try {
    const messages = await Message.find();
    messages.forEach((message) => {
      socket.emit("chat message", message.content);
    });
  } catch (error) {
    console.error("Error retrieving messages from the database:", error);
  }

  socket.on("chat message", async (msg) => {
    // Save the message to the database
    try {
      const newMessage = new Message({ content: msg });
      await newMessage.save();
    } catch (error) {
      console.error("Error saving message to the database:", error);
    }

    // Broadcast the message to all connected sockets
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
