const { default: axios } = require("axios");

const notify = async (notification_body, res) => {
  try {
    await axios.post("https://fcm.googleapis.com/fcm/send", notification_body, {
      Authorization:
        "key=" +
        "AAAAjgoxjpA:APA91bEj2qv_nFxCsPAowGH7xMPpef8XsGJDIu9LiY6jJrfgVrJm7_LuKKeNoW2xgTxOCAuzsiaCjjJSC3ek9ubNqStYKkTCtQN77tle3ROLlGhec21EBcQ5RgeY-v7bfFm5S_SH-KXp",
      "Content-Type": "application/json",
    });
    return res.status(200).send(data);
  } catch (error) {
    console.log(err);
    res.status(400).send({ message: "Something went wrong!" });
  }
};
module.exports = notify;
