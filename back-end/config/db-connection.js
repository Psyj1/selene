import mongoose from "mongoose";

const dbUser = "lucasparada_db_user";
const dbPassword = "selene123";
const dbName = "db-selene";

const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUser}:${encodeURIComponent(dbPassword)}@db-selene.c3mwmyr.mongodb.net/api-selene?retryWrites=true&w=majority&appName=db-selene`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("✅ Conectado ao MongoDB com sucesso!");
  } catch (err) {
    console.error("❌ Error to connect with MongoDB:", err.message);
  }
};

connect();

export default connect;